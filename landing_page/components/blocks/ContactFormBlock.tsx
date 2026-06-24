"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CONTACT_FORM_LIMITS } from "@/lib/validation/contactFormRules";
import {
  validateContactFormSubmission,
  type ValidationErrors,
} from "@/lib/validators/contactFormValidator";
import type { ContactFormSection, ContactFormSubmission } from "@/lib/types";

type ContactFormBlockProps = Omit<ContactFormSection, "type">;

const initialFormData: ContactFormSubmission = {
  name: "",
  email: "",
  businessName: "",
  service: "",
  message: "",
};

const inputClassName =
  "w-full rounded border border-navy/15 bg-white px-4 py-3 text-base text-navy outline-none transition-colors placeholder:text-charcoal/40 focus:border-forest focus:ring-1 focus:ring-forest/20";

const labelClassName = "mb-2 block text-sm font-medium text-navy";

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
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactFormBlock({
  eyebrow,
  title,
  description,
  phone,
  submitLabel = "Submit",
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
    <section id="contact" className="bg-white py-16 text-navy lg:py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        {submitted ? (
          <div className="mx-auto flex max-w-xl flex-col items-center gap-5 py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-full border border-gold/40 bg-surface">
              <svg viewBox="0 0 24 24" fill="none" className="size-6 text-gold" aria-hidden="true">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="font-brand text-3xl font-semibold leading-tight">
              Lorem ipsum dolor sit amet
            </h2>
            <p className="text-base leading-relaxed text-charcoal/75">
              Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="flex flex-col gap-5 lg:col-span-2">
              {eyebrow ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  {eyebrow}
                </p>
              ) : null}

              <h2 className="font-brand text-3xl font-semibold leading-tight sm:text-4xl">
                {title}
              </h2>

              {description ? (
                <p className="text-base leading-relaxed text-charcoal/75">{description}</p>
              ) : null}

              {phone ? (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="mt-2 inline-flex text-sm font-medium text-forest transition-colors hover:text-gold"
                >
                  {phone}
                </a>
              ) : null}
            </div>

            <div className="rounded-xl border border-navy/10 bg-surface p-6 lg:col-span-3 lg:p-8">
              <form
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
                noValidate
                onSubmit={handleSubmit}
              >
                <FormField id="contact-name" error={fieldErrors.name}>
                  <label htmlFor="contact-name" className={labelClassName}>
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={CONTACT_FORM_LIMITS.name.min}
                    maxLength={CONTACT_FORM_LIMITS.name.max}
                    autoComplete="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    className={inputClassName}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                  />
                </FormField>

                <FormField id="contact-email" error={fieldErrors.email}>
                  <label htmlFor="contact-email" className={labelClassName}>
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={CONTACT_FORM_LIMITS.email.max}
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    className={inputClassName}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                  />
                </FormField>

                <FormField id="contact-business" error={fieldErrors.businessName}>
                  <label htmlFor="contact-business" className={labelClassName}>
                    Business name <span className="font-normal text-charcoal/50">(optional)</span>
                  </label>
                  <input
                    id="contact-business"
                    name="businessName"
                    type="text"
                    maxLength={CONTACT_FORM_LIMITS.businessName.max}
                    autoComplete="organization"
                    placeholder="Company or organisation"
                    value={formData.businessName ?? ""}
                    onChange={(event) => handleChange("businessName", event.target.value)}
                    className={inputClassName}
                    aria-invalid={Boolean(fieldErrors.businessName)}
                    aria-describedby={
                      fieldErrors.businessName ? "contact-business-error" : undefined
                    }
                  />
                </FormField>

                <FormField id="contact-service" error={fieldErrors.service}>
                  <label htmlFor="contact-service" className={labelClassName}>
                    Service
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={(event) => handleChange("service", event.target.value)}
                    className={`${inputClassName} cursor-pointer ${formData.service ? "" : "text-charcoal/40"}`}
                    aria-invalid={Boolean(fieldErrors.service)}
                    aria-describedby={fieldErrors.service ? "contact-service-error" : undefined}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField
                  id="contact-message"
                  error={fieldErrors.message}
                  className="md:col-span-2"
                >
                  <label htmlFor="contact-message" className={labelClassName}>
                    Your message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={CONTACT_FORM_LIMITS.message.min}
                    maxLength={CONTACT_FORM_LIMITS.message.max}
                    rows={5}
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    className={`${inputClassName} min-h-[140px] resize-y`}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                  />
                </FormField>

                {formError ? (
                  <p className="text-sm text-red-600 md:col-span-2">{formError}</p>
                ) : null}

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center rounded bg-navy px-6 py-3 text-[13px] font-semibold tracking-wide text-surface transition-colors hover:bg-forest disabled:opacity-50 sm:w-auto"
                  >
                    {isSubmitting ? "Sending..." : submitLabel}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
