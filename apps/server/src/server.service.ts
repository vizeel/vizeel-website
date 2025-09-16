import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WaitlistSignup } from './schemas/waitlist-signup.schema';
import { CreateWaitlistSignupDto } from './dto/create-waitlist-signup.dto';
import { BlogPost } from './schemas/blog-post.schema';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/create-blog-post.dto';

@Injectable()
export class ServerService {
  constructor(
    @InjectModel(WaitlistSignup.name)
    private waitlistSignupModel: Model<WaitlistSignup>,
    @InjectModel(BlogPost.name)
    private blogPostModel: Model<BlogPost>,
  ) {}
  getHealth(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'Vizeel API Server is running',
    };
  }

  getHello(): string {
    return 'Hello from Vizeel API!';
  }

  async createWaitlistSignup(
    createWaitlistSignupDto: CreateWaitlistSignupDto,
  ): Promise<WaitlistSignup> {
    const createdWaitlistSignup = new this.waitlistSignupModel(
      createWaitlistSignupDto,
    );
    return createdWaitlistSignup.save();
  }

  async adminLogin(
    email: string,
    password: string,
  ): Promise<{ token: string; message: string }> {
    // Simple admin credentials check - use proper authentication in production
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      return {
        token: 'admin', // Use JWT tokens in production
        message: 'Admin login successful',
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getAllWaitlistSignups(): Promise<WaitlistSignup[]> {
    return this.waitlistSignupModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateWaitlistSignup(
    id: string,
    updateDto: Partial<WaitlistSignup>,
  ): Promise<WaitlistSignup> {
    return this.waitlistSignupModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  async deleteWaitlistSignup(id: string): Promise<void> {
    await this.waitlistSignupModel.findByIdAndDelete(id).exec();
  }

  // Blog Post CRUD operations
  async createBlogPost(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const createdBlogPost = new this.blogPostModel(createBlogPostDto);
    return createdBlogPost.save();
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return this.blogPostModel.find().sort({ createdAt: -1 }).exec();
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return this.blogPostModel
      .find({ published: true })
      .sort({ published_at: -1, createdAt: -1 })
      .exec();
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    return this.blogPostModel.findOne({ slug, published: true }).exec();
  }

  async getBlogPostById(id: string): Promise<BlogPost> {
    return this.blogPostModel.findById(id).exec();
  }

  async updateBlogPost(
    id: string,
    updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogPostModel
      .findByIdAndUpdate(id, updateBlogPostDto, { new: true })
      .exec();
  }

  async deleteBlogPost(id: string): Promise<void> {
    await this.blogPostModel.findByIdAndDelete(id).exec();
  }
}
