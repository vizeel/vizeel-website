import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ReactNode } from "react";

// Replace with your actual reCAPTCHA site key
const RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY_HERE";

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