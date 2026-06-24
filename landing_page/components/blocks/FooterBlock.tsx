"use client";

import { useState, type FormEvent } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandBackgroundShapes } from "@/components/BrandBackgroundShapes";
import { BRAND, btnPrimary, bodyMuted, eyebrowLabel } from "@/lib/brand";
import type { FooterLink, FooterSection } from "@/lib/types";
import { sectionInsetX } from "@/lib/sectionLayout";

type FooterBlockProps = Omit<FooterSection, "type">;

function PhoneIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-gold" aria-hidden="true">
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

function MailIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-gold" aria-hidden="true">
      <path
        d="M1.5 3h11L7 7.75 1.5 3Zm0 0v8h11V3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FooterNavLink({ link }: { link: FooterLink }) {
  const className = `${bodyMuted} transition-colors hover:text-gold`;

  if (link.href) {
    return (
      <a className={className} href={link.href}>
        {link.label}
      </a>
    );
  }

  return <span className={className}>{link.label}</span>;
}

function LinkGroup({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col gap-8">
      <p className={eyebrowLabel}>{title}</p>
      <ul className="flex flex-col gap-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <FooterNavLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterBlock({
  description,
  phone,
  email,
  linkGroups = [],
  newsletter,
  copyrightLeft,
  copyrightRight,
}: FooterBlockProps) {
  const [emailValue, setEmailValue] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFieldError(null);
    setFormError(null);
    setSubscribed(false);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details?.email) {
          setFieldError(result.details.email as string);
        } else {
          setFormError(result.error ?? "Something went wrong");
        }
        return;
      }

      setSubscribed(true);
      setEmailValue("");
    } catch {
      setFormError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-navy/10 bg-white text-navy">
      <BrandBackgroundShapes letter="N" corner="bottom-right" scope="section" side="full" />
      <div className={`relative z-10 ${sectionInsetX} pt-16 pb-10 lg:pt-[100px] lg:pb-10`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,374px)_repeat(3,minmax(0,1fr))] lg:justify-between lg:gap-x-10 xl:gap-x-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <BrandLogo variant="mark" />
              {description ? (
                <p className={`w-full text-base leading-[1.4] ${bodyMuted}`}>{description}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-5">
              {phone ? (
                <div className="flex items-center gap-[15px]">
                  <PhoneIcon />
                  <a
                    href={phone.startsWith("tel:") ? phone : `tel:${phone.replace(/\s/g, "")}`}
                    className="font-mono text-sm uppercase leading-none tracking-[0.5px] text-navy transition-colors hover:text-gold"
                  >
                    {phone.replace(/^tel:/, "")}
                  </a>
                </div>
              ) : null}

              {email ? (
                <div className="flex items-center gap-[15px]">
                  <MailIcon />
                  <a
                    href={`mailto:${email}`}
                    className="font-mono text-sm uppercase leading-none tracking-[0.5px] text-navy transition-colors hover:text-gold"
                  >
                    {email}
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          {linkGroups.map((group) => (
            <LinkGroup key={group.title} title={group.title} links={group.links} />
          ))}

          {newsletter ? (
            <div className="flex flex-col gap-8">
              <p className={eyebrowLabel}>{newsletter.title}</p>

              <form className="flex flex-col gap-5" onSubmit={handleNewsletterSubmit} noValidate>
                {newsletter.description ? (
                  <p className={`w-full text-base leading-[1.4] ${bodyMuted}`}>
                    {newsletter.description}
                  </p>
                ) : null}

                <div className="flex w-full flex-col gap-10">
                  <div className="border-b border-gold/40">
                    <input
                      id="footer-newsletter-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={newsletter.emailLabel ?? "Your Email"}
                      aria-label={newsletter.emailLabel ?? "Your Email"}
                      value={emailValue}
                      onChange={(event) => {
                        setEmailValue(event.target.value);
                        setSubscribed(false);
                        setFieldError(null);
                        setFormError(null);
                      }}
                      aria-invalid={fieldError ? true : undefined}
                      aria-describedby={fieldError ? "footer-newsletter-error" : undefined}
                      className="w-full border-0 bg-transparent py-2 text-base text-navy outline-none placeholder:font-mono placeholder:text-sm placeholder:uppercase placeholder:tracking-[0.5px] placeholder:text-charcoal/50"
                    />
                  </div>

                  {fieldError ? (
                    <p id="footer-newsletter-error" className="text-sm text-red-600">
                      {fieldError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${btnPrimary} w-fit disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    {isSubmitting
                      ? "Subscribing..."
                      : (newsletter.submitLabel ?? "Subscribe")}
                  </button>
                </div>

                {formError ? (
                  <p className="text-sm text-red-600" role="alert">
                    {formError}
                  </p>
                ) : null}

                {subscribed ? (
                  <p className="text-sm text-forest" role="status">
                    Thanks for subscribing.
                  </p>
                ) : null}
              </form>
            </div>
          ) : null}
        </div>

        {/* Ornamental rule */}
        <div className="rule-ornament mt-16 lg:mt-[80px]">
          <p className="font-sans text-[11px] leading-none tracking-[0.5px] text-charcoal/40">
            {BRAND.name}
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {copyrightLeft ? (
            <p className="font-sans text-[12px] leading-none text-charcoal/50">
              {copyrightLeft}
            </p>
          ) : null}
          {copyrightRight ? (
            <p className="font-sans text-[12px] leading-none text-charcoal/50 sm:text-right">
              {copyrightRight}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
