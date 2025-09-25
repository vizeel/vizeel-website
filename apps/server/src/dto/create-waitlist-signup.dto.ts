export class CreateWaitlistSignupDto {
  email: string;
  phone?: string;
  recaptcha_token?: string;
  source?: string;
  company?: string;
  message?: string;
  name?: string;
  package_selection?: string;
}