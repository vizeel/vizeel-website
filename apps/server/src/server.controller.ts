import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UnauthorizedException
} from '@nestjs/common';
import { CreateWaitlistSignupDto } from './dto/create-waitlist-signup.dto';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/create-blog-post.dto';
import { ServerService } from './server.service';

@Controller('api')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

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
