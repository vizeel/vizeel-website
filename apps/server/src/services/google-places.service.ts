import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { GooglePlacesSearchDto, GooglePlacesResultDto, PlacesResultDto, PlacesSearchResponseDto } from '../dto/places-search.dto';

@Injectable()
export class GooglePlacesService {
  private readonly logger = new Logger(GooglePlacesService.name);
  private readonly googleClient: AxiosInstance;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GOOGLE_PLACES_API');
    
    if (!this.apiKey) {
      throw new Error('GOOGLE_PLACES_API key is required');
    }

    this.googleClient = axios.create({
      baseURL: 'https://places.googleapis.com/v1',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': this.apiKey,
        // Request all available fields to get comprehensive data + nextPageToken for pagination
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.businessStatus,places.priceLevel,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.types,places.primaryType,places.primaryTypeDisplayName,places.currentOpeningHours,places.reviews,places.photos,places.editorialSummary,places.id,nextPageToken',
      },
      timeout: 30000,
    });
  }

  async searchPlaces(searchParams: GooglePlacesSearchDto): Promise<PlacesSearchResponseDto> {
    try {
      this.logger.log(`Starting Google Places search for query: ${searchParams.textQuery}${searchParams.pageToken ? ' (next page)' : ''}`);

      // Build the request body according to Google Places API (New)
      const requestBody = {
        textQuery: searchParams.textQuery,
        maxResultCount: Math.min(searchParams.maxResultCount || 20, 20), // Max 20 for Text Search
        languageCode: 'en', // Default to English
        regionCode: searchParams.regionCode || 'US', // Default to US if not specified
        locationBias: searchParams.locationBias,
        locationRestriction: searchParams.locationRestriction,
        pageToken: searchParams.pageToken, // For pagination
        // Remove all filtering to get comprehensive results:
        // - No openNow filter (get all businesses regardless of hours)
        // - No includedType restriction (get all business types)
        // - No minRating filter (get all ratings)
        // - No priceLevels filter (get all price ranges)
        // - No strictTypeFiltering (allow broader results)
      };

      // Remove undefined properties
      Object.keys(requestBody).forEach(key => {
        if (requestBody[key] === undefined) {
          delete requestBody[key];
        }
      });

      const response = await this.googleClient.post('/places:searchText', requestBody);

      if (!response.data || !response.data.places) {
        this.logger.warn('No places found in Google Places API response');
        return {
          places: [],
          totalResults: 0,
        };
      }

      const places = response.data.places as GooglePlacesResultDto[];
      const mappedPlaces = places.map(place => this.mapGooglePlaceToDto(place));

      // Debug logging to check if nextPageToken is being returned
      this.logger.log(`Google API Response: Found ${places.length} places, nextPageToken: ${response.data.nextPageToken ? 'EXISTS' : 'NULL'}`);
      if (response.data.nextPageToken) {
        this.logger.log(`NextPageToken value: ${response.data.nextPageToken.substring(0, 50)}...`);
      }

      return {
        places: mappedPlaces,
        nextPageToken: response.data.nextPageToken,
        totalResults: mappedPlaces.length,
      };

    } catch (error) {
      this.logger.error('Failed to search Google Places', error);
      
      if (error.response?.status === 400) {
        throw new BadRequestException(`Invalid request: ${error.response?.data?.error?.message || 'Bad request'}`);
      } else if (error.response?.status === 403) {
        throw new BadRequestException('Google Places API key is invalid or lacks permissions');
      } else if (error.response?.status === 429) {
        throw new BadRequestException('Google Places API quota exceeded');
      }
      
      throw new InternalServerErrorException('Failed to search Google Places');
    }
  }

  async getPlaceDetails(placeId: string): Promise<PlacesResultDto | null> {
    try {
      this.logger.log(`Fetching place details for ID: ${placeId}`);

      const response = await this.googleClient.get(`/places/${placeId}`);

      if (!response.data) {
        return null;
      }

      return this.mapGooglePlaceToDto(response.data as GooglePlacesResultDto);

    } catch (error) {
      this.logger.error(`Failed to get place details for ${placeId}`, error);
      
      if (error.response?.status === 404) {
        throw new BadRequestException('Place not found');
      }
      
      throw new InternalServerErrorException('Failed to get place details');
    }
  }

  async searchNearby(location: { latitude: number; longitude: number }, radius: number, type?: string): Promise<PlacesResultDto[]> {
    try {
      this.logger.log(`Starting nearby search at ${location.latitude}, ${location.longitude} with radius ${radius}m`);

      const requestBody = {
        locationRestriction: {
          circle: {
            center: location,
            radius: radius,
          },
        },
        maxResultCount: 20,
        ...(type && { includedTypes: [type] }),
      };

      const response = await this.googleClient.post('/places:searchNearby', requestBody);

      if (!response.data || !response.data.places) {
        return [];
      }

      const places = response.data.places as GooglePlacesResultDto[];
      return places.map(place => this.mapGooglePlaceToDto(place));

    } catch (error) {
      this.logger.error('Failed to search nearby places', error);
      throw new InternalServerErrorException('Failed to search nearby places');
    }
  }

  exportToCsv(places: PlacesResultDto[]): string {
    if (!places || places.length === 0) {
      return 'No data to export';
    }

    // Define CSV headers
    const headers = [
      'Title',
      'Address',
      'Phone',
      'Website',
      'Rating',
      'Review Count',
      'Category',
      'Latitude',
      'Longitude',
      'Opening Hours',
      'Description',
      'Price Level',
      'Place ID',
      'Google Maps URL',
      'Business Status',
    ];

    // Convert places to CSV rows
    const rows = places.map(place => [
      this.escapeCsvField(place.title || ''),
      this.escapeCsvField(place.address || ''),
      this.escapeCsvField(place.phone || ''),
      this.escapeCsvField(place.website || ''),
      place.rating?.toString() || '',
      place.reviewsCount?.toString() || '',
      this.escapeCsvField(place.categoryName || ''),
      place.location?.lat?.toString() || '',
      place.location?.lng?.toString() || '',
      this.escapeCsvField(place.openingHours?.join('; ') || ''),
      this.escapeCsvField(place.description || ''),
      this.escapeCsvField(place.priceLevel || ''),
      this.escapeCsvField(place.placeId || ''),
      this.escapeCsvField(place.url || ''),
      this.escapeCsvField(place.businessStatus || ''),
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    return csvContent;
  }

  private mapGooglePlaceToDto(googlePlace: GooglePlacesResultDto): PlacesResultDto {
    return {
      title: googlePlace.displayName?.text || 'Unknown',
      address: googlePlace.formattedAddress || '',
      phone: googlePlace.nationalPhoneNumber || googlePlace.internationalPhoneNumber,
      website: googlePlace.websiteUri,
      rating: googlePlace.rating,
      reviewsCount: googlePlace.userRatingCount,
      categoryName: googlePlace.primaryTypeDisplayName?.text || googlePlace.primaryType,
      location: googlePlace.location ? {
        lat: googlePlace.location.latitude,
        lng: googlePlace.location.longitude,
      } : undefined,
      openingHours: googlePlace.currentOpeningHours?.weekdayDescriptions,
      description: googlePlace.editorialSummary?.text,
      priceLevel: googlePlace.priceLevel,
      reviews: googlePlace.reviews?.slice(0, 5).map(review => ({
        name: review.authorAttribution.displayName,
        text: review.text.text,
        rating: review.rating,
        publishedAtDate: review.publishTime,
      })),
      images: googlePlace.photos?.slice(0, 3).map(photo => ({
        url: `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=400&key=${this.apiKey}`,
        description: `Photo by ${photo.authorAttributions[0]?.displayName || 'User'}`,
      })),
      placeId: googlePlace.id,
      url: googlePlace.googleMapsUri,
      permanentlyClosed: googlePlace.businessStatus === 'CLOSED_PERMANENTLY',
      temporarilyClosed: googlePlace.businessStatus === 'CLOSED_TEMPORARILY',
      businessStatus: googlePlace.businessStatus,
    };
  }

  private escapeCsvField(field: string): string {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  }
}