import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class BlogPost extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  excerpt?: string;

  @Prop()
  author: string;

  @Prop()
  featured_image?: string;

  @Prop({ default: false })
  published: boolean;

  @Prop()
  tags?: string[];

  @Prop()
  meta_title?: string;

  @Prop()
  meta_description?: string;

  @Prop()
  published_at?: Date;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);