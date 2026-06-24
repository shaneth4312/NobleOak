import type { ContactFormSubmission } from "@/lib/types";
import {
  CONTACT_FORM_LIMITS,
  containsUnsafeContent,
  EMAIL_PATTERN,
  NAME_PATTERN,
} from "@/lib/validation/contactFormRules";

export type ValidationErrors = Partial<
  Record<keyof ContactFormSubmission, string>
>;

export function validateContactFormSubmission(
  data: unknown,
): { success: true; data: ContactFormSubmission } | { success: false; errors: ValidationErrors } {
  if (!data || typeof data !== "object") {
    return {
      success: false,
      errors: { name: "Invalid submission" },
    };
  }

  const body = data as Record<string, unknown>;
  const errors: ValidationErrors = {};

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const businessName =
    typeof body.businessName === "string" ? body.businessName.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const includesAppointmentFields = "service" in body;

  if (!name) {
    errors.name = "Name is required";
  } else if (name.length > CONTACT_FORM_LIMITS.name.max) {
    errors.name = `Name must be ${CONTACT_FORM_LIMITS.name.max} characters or fewer`;
  } else if (!NAME_PATTERN.test(name)) {
    errors.name = "Name contains invalid characters";
  } else if (containsUnsafeContent(name)) {
    errors.name = "Name contains invalid content";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (email.length > CONTACT_FORM_LIMITS.email.max) {
    errors.email = `Email must be ${CONTACT_FORM_LIMITS.email.max} characters or fewer`;
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Invalid email address";
  }

  if (businessName && businessName.length > CONTACT_FORM_LIMITS.businessName.max) {
    errors.businessName = `Business name must be ${CONTACT_FORM_LIMITS.businessName.max} characters or fewer`;
  } else if (businessName && containsUnsafeContent(businessName)) {
    errors.businessName = "Business name contains invalid content";
  }

  if (!message) {
    errors.message = "Message is required";
  } else if (message.length > CONTACT_FORM_LIMITS.message.max) {
    errors.message = `Message must be ${CONTACT_FORM_LIMITS.message.max} characters or fewer`;
  } else if (containsUnsafeContent(message)) {
    errors.message = "Message contains invalid content";
  }

  if (includesAppointmentFields) {
    if (!service) {
      errors.service = "Service is required";
    } else if (service.length > CONTACT_FORM_LIMITS.service.max) {
      errors.service = `Service must be ${CONTACT_FORM_LIMITS.service.max} characters or fewer`;
    } else if (containsUnsafeContent(service)) {
      errors.service = "Service contains invalid content";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      email,
      message,
      ...(businessName ? { businessName } : {}),
      ...(includesAppointmentFields ? { service } : {}),
    },
  };
}
