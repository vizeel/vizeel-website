import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UnauthorizedException,
  Res,
  UploadedFile,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Response } from 'express';
import { CreateWaitlistSignupDto } from './dto/create-waitlist-signup.dto';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/create-blog-post.dto';
import { GooglePlacesSearchDto } from './dto/places-search.dto';
import { ServerService } from './server.service';
import { GooglePlacesService } from './services/google-places.service';
import { S3UploadService } from './services/s3-upload.service';

@Controller('api')
export class ServerController {
  constructor(
    private readonly serverService: ServerService,
    private readonly googlePlacesService: GooglePlacesService,
    private readonly s3UploadService: S3UploadService,
  ) {}

  @Get('health')
  getHealth(): { status: string; message: string } {
    return this.serverService.getHealth();
  }

  @Get()
  getHello(): string {
    return this.serverService.getHello();
  }

  @Post('waitlist')
  async createWaitlistSignup(
    @Body() createWaitlistSignupDto: CreateWaitlistSignupDto,
  ) {
    return this.serverService.createWaitlistSignup(createWaitlistSignupDto);
  }

  // Admin endpoints
  @Post('admin/login')
  async adminLogin(@Body() loginDto: { email: string; password: string }) {
    return this.serverService.adminLogin(loginDto.email, loginDto.password);
  }

  @Get('admin/waitlist')
  async getAllWaitlistSignups(@Headers('authorization') authorization: string) {
    this.validateAdminToken(authorization);
    return this.serverService.getAllWaitlistSignups();
  }

  @Put('admin/waitlist/:id')
  async updateWaitlistSignup(
    @Param('id') id: string,
    @Body()
    updateDto: Partial<CreateWaitlistSignupDto & { is_contacted: boolean }>,
    @Headers('authorization') authorization: string,
  ) {
    this.validateAdminToken(authorization);
    return this.serverService.updateWaitlistSignup(id, updateDto);
  }

  @Delete('admin/waitlist/:id')
  async deleteWaitlistSignup(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    this.validateAdminToken(authorization);
    return this.serverService.deleteWaitlistSignup(id);
  }

  // Public Blog endpoints
  @Get('blog')
  async getPublishedBlogPosts() {
    return this.serverService.getPublishedBlogPosts();
  }

  @Get('blog/:slug')
  async getBlogPostBySlug(@Param('slug') slug: string) {
    return this.serverService.getBlogPostBySlug(slug);
  }

  // Admin Blog endpoints
  @Get('admin/blog')
  async getAllBlogPosts(@Headers('authorization') authorization: string) {
    this.validateAdminToken(authorization);
    return this.serverService.getAllBlogPosts();
  }

  @Get('admin/blog/:id')
  async getBlogPostById(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    this.validateAdminToken(authorization);
    return this.serverService.getBlogPostById(id);
  }

  @Post('admin/blog')
  async createBlogPost(
    @Body() createBlogPostDto: CreateBlogPostDto,
    @Headers('authorization') authorization: string,
  ) {
    this.validateAdminToken(authorization);
    return this.serverService.createBlogPost(createBlogPostDto);
  }

  @Put('admin/blog/:id')
  async updateBlogPost(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
    @Headers('authorization') authorization: string,
  ) {
    this.validateAdminToken(authorization);
    return this.serverService.updateBlogPost(id, updateBlogPostDto);
  }

  @Delete('admin/blog/:id')
  async deleteBlogPost(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    this.validateAdminToken(authorization);
    return this.serverService.deleteBlogPost(id);
  }

  @Post('admin/blog/upload-image')
  @UseInterceptors(FileInterceptor('image', {
    storage: memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
  }))
  async uploadBlogImage(
    @UploadedFile() file: Express.Multer.File,
    @Headers('authorization') authorization: string,
  ) {
    this.validateAdminToken(authorization);

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const validation = this.s3UploadService.validateImageFile(file);
    if (!validation.valid) {
      throw new BadRequestException(validation.error);
    }

    try {
      const result = await this.s3UploadService.uploadImage(file, 'blog-images');
      return {
        success: true,
        data: {
          url: result.url,
          key: result.key,
          uploadedAt: new Date(),
        }
      };
    } catch (error) {
      console.error('Failed to upload image to S3', error);
      throw new BadRequestException('Failed to upload image to S3');
    }
  }

  // Google Places API endpoints
  @Post('admin/places/search')
  async searchPlaces(
    @Body() placesSearchDto: GooglePlacesSearchDto,
    @Headers('authorization') authorization: string,
  ) {
    this.validateAdminToken(authorization);
    return this.googlePlacesService.searchPlaces(placesSearchDto);
  }

  @Get('admin/places/:placeId')
  async getPlaceDetails(
    @Param('placeId') placeId: string,
    @Headers('authorization') authorization: string,
  ) {
    this.validateAdminToken(authorization);
    return this.googlePlacesService.getPlaceDetails(placeId);
  }

  @Post('admin/places/nearby')
  async searchNearby(
    @Body() nearbySearchDto: { 
      location: { latitude: number; longitude: number }; 
      radius: number; 
      type?: string; 
    },
    @Headers('authorization') authorization: string,
  ) {
    this.validateAdminToken(authorization);
    return this.googlePlacesService.searchNearby(
      nearbySearchDto.location, 
      nearbySearchDto.radius, 
      nearbySearchDto.type
    );
  }

  @Post('admin/places/load-more')
  async loadMorePlaces(
    @Body() loadMoreDto: { 
      textQuery: string; 
      regionCode?: string; 
      pageToken: string; 
    },
    @Headers('authorization') authorization: string,
  ) {
    this.validateAdminToken(authorization);
    
    // Add 2-second delay as required by Google Places API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return this.googlePlacesService.searchPlaces({
      textQuery: loadMoreDto.textQuery,
      regionCode: loadMoreDto.regionCode,
      pageToken: loadMoreDto.pageToken,
      maxResultCount: 20,
    });
  }

  @Post('admin/places/export/csv')
  async exportPlacesToCsv(
    @Body() exportDto: { places: any[] },
    @Headers('authorization') authorization: string,
    @Res() res: Response,
  ) {
    this.validateAdminToken(authorization);
    
    try {
      const csvContent = this.googlePlacesService.exportToCsv(exportDto.places);
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="places-search-${Date.now()}.csv"`);
      res.send(csvContent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to export CSV' });
    }
  }

  private validateAdminToken(authorization: string) {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header');
    }
    const token = authorization.substring(7);
    if (token !== 'admin') {
      // Simple token validation - use JWT in production
      throw new UnauthorizedException('Invalid admin token');
    }
  }
}
