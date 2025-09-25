import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WaitlistSignup extends Document {
  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  recaptcha_token?: string;

  @Prop()
  source?: string;

  @Prop({ default: false })
  is_contacted: boolean;

  @Prop()
  company?: string;

  @Prop()
  message?: string;

  @Prop()
  name?: string;

  @Prop()
  package_selection?: string;
}

export const WaitlistSignupSchema = SchemaFactory.createForClass(WaitlistSignup);