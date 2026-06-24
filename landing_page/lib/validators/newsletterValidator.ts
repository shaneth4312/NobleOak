import { EMAIL_PATTERN } from "@/lib/validation/contactFormRules";

export type NewsletterValidationErrors = {
  email?: string;
};

export function validateNewsletterSubscription(
  data: unknown,
):
  | { success: true; data: { email: string } }
  | { success: false; errors: NewsletterValidationErrors } {
  if (!data || typeof data !== "object") {
    return { success: false, errors: { email: "Invalid submission" } };
  }

  const email =
    typeof (data as Record<string, unknown>).email === "string"
      ? (data as Record<string, string>).email.trim().toLowerCase()
      : "";

  if (!email) {
    return { success: false, errors: { email: "Email is required" } };
  }

  if (email.length > 254) {
    return { success: false, errors: { email: "Email must be 254 characters or fewer" } };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { success: false, errors: { email: "Invalid email address" } };
  }

  return { success: true, data: { email } };
}
