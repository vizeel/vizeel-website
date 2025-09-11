import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WaitlistSignup } from './schemas/waitlist-signup.schema';
import { CreateWaitlistSignupDto } from './dto/create-waitlist-signup.dto';

@Injectable()
export class ServerService {
  constructor(
    @InjectModel(WaitlistSignup.name)
    private waitlistSignupModel: Model<WaitlistSignup>,
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
}
