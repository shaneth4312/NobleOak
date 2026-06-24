"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { btnPrimary, eyebrowLabelOnDark } from "@/lib/brand";
import type { ContactFormSection, ContactFormSubmission } from "@/lib/types";
import { sectionInsetX } from "@/lib/sectionLayout";
import { CONTACT_FORM_LIMITS } from "@/lib/validation/contactFormRules";
import {
  validateContactFormSubmission,
  type ValidationErrors,
} from "@/lib/validators/contactFormValidator";

type ContactFormBlockProps = Omit<ContactFormSection, "type">;

const initialFormData: ContactFormSubmission = {
  name: "",
  email: "",
  businessName: "",
  service: "",
  message: "",
};

function PhoneIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 text-gold" aria-hidden="true">
      <path
        d="M3.2 1.5h2.1l.9 2.1a1 1 0 0 1-.24 1.03l-1.28 1.28a8.5 8.5 0 0 0 3.98 3.98l1.28-1.28a1 1 0 0 1 1.03-.24l2.1.9v2.1a1 1 0 0 1-.92 1A11.5 11.5 0 0 1 2.2 2.42a1 1 0 0 1 1-1.02Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FormField({
  id,
  error,
  className,
  children,
}: {
  id: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="border-b border-gold/30">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const fieldClassName =
  "w-full border-0 bg-transparent py-4 text-base text-surface outline-none placeholder:font-mono placeholder:text-sm placeholder:uppercase placeholder:tracking-[0.5px] placeholder:text-surface/50";

export function ContactFormBlock({
  eyebrow,
  title,
  description,
  phone,
  submitLabel = "Make Appointment",
  serviceOptions = [],
}: ContactFormBlockProps) {
  const [formData, setFormData] = useState<ContactFormSubmission>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  function handleChange(field: keyof ContactFormSubmission, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setFormError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setFormError(null);

    const clientValidation = validateContactFormSubmission(formData);

    if (!clientValidation.success) {
      setFieldErrors(clientValidation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...clientValidation.data, pageSlug: "home" }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details) {
          setFieldErrors(result.details as ValidationErrors);
        } else {
          setFormError(result.error ?? "Something went wrong");
        }
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError("Unable to submit form");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-navy text-surface">
      <div className={`relative z-10 ${sectionInsetX} py-16 lg:pb-[120px] lg:pt-[120px]`}>

        {/* ── Success state — overlaid so block height never changes ── */}
        {submitted ? (
          <div className="flex min-h-[540px] w-full flex-col items-center justify-center gap-8 text-center lg:min-h-[640px]">
            <div className="flex size-16 items-center justify-center border border-gold/40 bg-white/5">
              <svg viewBox="0 0 24 24" fill="none" className="size-7 text-gold" aria-hidden="true">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-brand text-[2rem] font-semibold leading-[1.15] text-surface sm:text-4xl">
                Thank you for getting in touch.
              </h2>
              <p className="mx-auto max-w-md text-base leading-[1.7] text-surface/65">
                One of our advisers will be in contact shortly to arrange a confidential conversation at a time that suits you.
              </p>
            </div>
            <div className="gold-rule w-24" aria-hidden="true" />
            <p className="font-sans text-[12px] font-medium tracking-[0.5px] text-gold">
              NobleOak Partners
            </p>
          </div>
        ) : (
        <>
        <div className="flex w-full flex-col items-center gap-6 text-center">
          {eyebrow ? (
            <div className="rule-ornament w-full max-w-sm">
              <p className={eyebrowLabelOnDark}>{eyebrow}</p>
            </div>
          ) : null}

          <h2 className="w-full font-brand text-[2.25rem] font-semibold leading-[1.1] text-surface sm:text-5xl lg:text-[48px]">
            {title}
          </h2>

          {description ? (
            <p className="w-full max-w-xl text-base leading-[1.6] text-surface/70">{description}</p>
          ) : null}

          {phone ? (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3"
            >
              <span className="flex size-8 shrink-0 items-center justify-center border border-gold/40 bg-white/10">
                <PhoneIcon />
              </span>
              <span className="font-sans text-[13px] font-medium leading-none tracking-[0.5px] text-gold">
                {phone}
              </span>
            </a>
          ) : null}
        </div>

        <form
          className="mt-16 grid w-full grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:mt-20"
          noValidate
          onSubmit={handleSubmit}
        >
          <FormField id="name" error={fieldErrors.name}>
            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={CONTACT_FORM_LIMITS.name.min}
              maxLength={CONTACT_FORM_LIMITS.name.max}
              autoComplete="name"
              placeholder="Your Name"
              aria-label="Your Name"
              value={formData.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className={fieldClassName}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
          </FormField>

          <FormField id="email" error={fieldErrors.email}>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={CONTACT_FORM_LIMITS.email.max}
              autoComplete="email"
              placeholder="Your Email"
              aria-label="Your Email"
              value={formData.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className={fieldClassName}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
          </FormField>

          <FormField id="businessName" error={fieldErrors.businessName}>
            <input
              id="businessName"
              name="businessName"
              type="text"
              maxLength={CONTACT_FORM_LIMITS.businessName.max}
              autoComplete="organization"
              placeholder="Business Name (optional)"
              aria-label="Business Name"
              value={formData.businessName ?? ""}
              onChange={(event) => handleChange("businessName", event.target.value)}
              className={fieldClassName}
              aria-invalid={Boolean(fieldErrors.businessName)}
              aria-describedby={fieldErrors.businessName ? "businessName-error" : undefined}
            />
          </FormField>

          <FormField id="service" error={fieldErrors.service}>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={(event) => handleChange("service", event.target.value)}
              className={`${fieldClassName} cursor-pointer ${formData.service ? "" : "text-surface/50"}`}
              aria-label="Select Services"
              aria-invalid={Boolean(fieldErrors.service)}
              aria-describedby={fieldErrors.service ? "service-error" : undefined}
            >
              <option value="" disabled className="bg-navy text-surface/50">
                Select Services
              </option>
              {serviceOptions.map((option) => (
                <option key={option} value={option} className="bg-navy text-surface">
                  {option}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="message"
            error={fieldErrors.message}
            className="md:col-span-2"
          >
            <textarea
              id="message"
              name="message"
              required
              minLength={CONTACT_FORM_LIMITS.message.min}
              maxLength={CONTACT_FORM_LIMITS.message.max}
              rows={4}
              placeholder="Your Message"
              aria-label="Your Message"
              value={formData.message}
              onChange={(event) => handleChange("message", event.target.value)}
              className={`${fieldClassName} min-h-[120px] resize-y`}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
            />
          </FormField>

          {formError ? (
            <p className="mt-6 text-sm text-red-400 md:col-span-2">{formError}</p>
          ) : null}

          <div className="mt-6 md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${btnPrimary} w-full disabled:opacity-50 sm:w-auto`}
            >
              {isSubmitting ? "Sending..." : submitLabel}
              {!isSubmitting ? (
                <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0" aria-hidden="true">
                  <path
                    d="M5 12h13M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </button>
          </div>
        </form>
        </>
        )}
      </div>
    </section>
  );
}
