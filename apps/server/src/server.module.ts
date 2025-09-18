import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { GooglePlacesService } from './services/google-places.service';
import { WaitlistSignup, WaitlistSignupSchema } from './schemas/waitlist-signup.schema';
import { BlogPost, BlogPostSchema } from './schemas/blog-post.schema';

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
    MongooseModule.forFeature([
      { name: WaitlistSignup.name, schema: WaitlistSignupSchema },
      { name: BlogPost.name, schema: BlogPostSchema },
    ]),
  ],
  controllers: [ServerController],
  providers: [ServerService, GooglePlacesService],
})
export class ServerModule {}
