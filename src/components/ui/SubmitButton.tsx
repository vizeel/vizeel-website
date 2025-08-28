import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface FormData {
  email: string;
  phone: string;
  [key: string]: any;
}

interface ValidationRules {
  email?: boolean;
  phone?: boolean;
  [key: string]: boolean | undefined;
}

interface SubmitButtonProps extends Omit<ButtonProps, 'type' | 'onClick'> {
  formData: FormData;
  validationRules?: ValidationRules;
  source: string;
  successMessage?: string;
  errorMessage?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onSuccess?: (data: FormData) => void;
  onError?: (error: any) => void;
}

// Email validation function
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return "";
};

// Phone validation function
const validatePhone = (phone: string) => {
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (!phone) {
    return "Phone number is required";
  }
  if (digitsOnly.length < 10) {
    return "Please enter a valid phone number (at least 10 digits)";
  }
  if (digitsOnly.length > 15) {
    return "Phone number is too long";
  }
  return "";
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  formData,
  validationRules = { email: true, phone: true },
  source,
  successMessage = "Thanks for your interest! We'll be in touch soon.",
  errorMessage = "Something went wrong. Please try again.",
  children,
  icon,
  onSuccess,
  onError,
  className = "",
  disabled,
  ...props
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async () => {
    // Validate fields based on validation rules
    const errors: string[] = [];
    
    if (validationRules.email && formData.email) {
      const emailError = validateEmail(formData.email);
      if (emailError) errors.push(emailError);
    }
    
    if (validationRules.phone && formData.phone) {
      const phoneError = validatePhone(formData.phone);
      if (phoneError) errors.push(phoneError);
    }

    if (errors.length > 0) {
      toast.error(errors.join(", "));
      return;
    }

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready. Please try again.");
      return;
    }

    setIsSubmitting(true);

    // Ensure Supabase is configured
    if (!supabase) {
      toast.error("Signup temporarily unavailable. Supabase is not configured.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha("waitlist_submit");
      
      // Prepare payload
      const submitData = { 
        ...formData, 
        recaptcha_token: recaptchaToken,
        source 
      };

      // Insert into Supabase
      const { error: insertError } = await supabase
        .from("waitlist_signups")
        .insert(submitData);

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        throw new Error("Could not save your signup. Please try again.");
      }

      console.log("Lead captured and saved to Supabase:", submitData);
      
      toast.success(successMessage);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(formData);
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(errorMessage);
      
      // Call error callback if provided
      if (onError) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleSubmit}
      disabled={disabled || isSubmitting}
      className={`btn-primary text-lg px-8 py-6 h-auto ${className}`}
      {...props}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
