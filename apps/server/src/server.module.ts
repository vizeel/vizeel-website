import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { WaitlistSignup, WaitlistSignupSchema } from './schemas/waitlist-signup.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/vizeel',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: WaitlistSignup.name, schema: WaitlistSignupSchema }]),
  ],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
