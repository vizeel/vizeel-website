import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ReactNode } from "react";

// Replace with your actual reCAPTCHA site key
const RECAPTCHA_SITE_KEY = "6LdJwrMrAAAAAO5dIjBjOrqVsckNg9tL4kDmLnh3";

interface ReCaptchaProviderProps {
  children: ReactNode;
}

export const ReCaptchaProvider = ({ children }: ReCaptchaProviderProps) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      {children}
    </GoogleReCaptchaProvider>
  );
};