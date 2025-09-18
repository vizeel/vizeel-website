export class GooglePlacesSearchDto {
  textQuery: string;
  maxResultCount?: number;
  regionCode?: string;
  pageToken?: string; // For pagination
  locationBias?: {
    rectangle?: {
      low: { latitude: number; longitude: number };
      high: { latitude: number; longitude: number };
    };
    circle?: {
      center: { latitude: number; longitude: number };
      radius: number;
    };
  };
  locationRestriction?: {
    rectangle?: {
      low: { latitude: number; longitude: number };
      high: { latitude: number; longitude: number };
    };
  };
}

export class GooglePlacesResultDto {
  id: string;
  displayName?: {
    text: string;
    languageCode: string;
  };
  formattedAddress?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
  userRatingCount?: number;
  businessStatus?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
  priceLevel?: 'PRICE_LEVEL_FREE' | 'PRICE_LEVEL_INEXPENSIVE' | 'PRICE_LEVEL_MODERATE' | 'PRICE_LEVEL_EXPENSIVE' | 'PRICE_LEVEL_VERY_EXPENSIVE';
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  types?: string[];
  primaryType?: string;
  primaryTypeDisplayName?: {
    text: string;
    languageCode: string;
  };
  currentOpeningHours?: {
    openNow: boolean;
    periods: Array<{
      open: { day: number; hour: number; minute: number };
      close?: { day: number; hour: number; minute: number };
    }>;
    weekdayDescriptions: string[];
  };
  reviews?: Array<{
    name: string;
    rating: number;
    text: {
      text: string;
      languageCode: string;
    };
    originalText?: {
      text: string;
      languageCode: string;
    };
    publishTime: string;
    authorAttribution: {
      displayName: string;
      uri: string;
      photoUri: string;
    };
  }>;
  photos?: Array<{
    name: string;
    widthPx: number;
    heightPx: number;
    authorAttributions: Array<{
      displayName: string;
      uri: string;
      photoUri: string;
    }>;
  }>;
  editorialSummary?: {
    text: string;
    languageCode: string;
  };
}

// For our frontend compatibility, we'll also keep a simplified version
export class PlacesResultDto {
  title: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewsCount?: number;
  categoryName?: string;
  location?: {
    lat: number;
    lng: number;
  };
  openingHours?: string[];
  description?: string;
  priceLevel?: string;
  reviews?: {
    name: string;
    text: string;
    rating: number;
    publishedAtDate: string;
  }[];
  images?: {
    url: string;
    description?: string;
  }[];
  placeId?: string;
  url?: string;
  permanentlyClosed?: boolean;
  temporarilyClosed?: boolean;
  businessStatus?: string;
}

export class PlacesSearchResponseDto {
  places: PlacesResultDto[];
  nextPageToken?: string;
  totalResults: number;
}