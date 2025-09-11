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
