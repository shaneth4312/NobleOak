import { BrandLogo } from "@/components/BrandLogo";
import type { FooterLink, FooterSection } from "@/lib/types";

type FooterBlockProps = Omit<FooterSection, "type">;

function FooterNavLink({ link }: { link: FooterLink }) {
  const className =
    "text-sm text-surface/65 transition-colors hover:text-gold";

  if (link.href) {
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  }

  return <span className={className}>{link.label}</span>;
}

function LinkGroup({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
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
  return (
    <footer className="bg-navy text-surface">
      <div className="mx-auto max-w-7xl px-8 py-14 lg:px-16 lg:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <BrandLogo className="brightness-0 invert" />

            {description ? (
              <p className="text-sm leading-relaxed text-surface/65">{description}</p>
            ) : null}

            <div className="flex flex-col gap-2 text-sm">
              {phone ? (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-surface/80 transition-colors hover:text-gold"
                >
                  {phone}
                </a>
              ) : null}
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="text-surface/80 transition-colors hover:text-gold"
                >
                  {email}
                </a>
              ) : null}
            </div>
          </div>

          {linkGroups.map((group) => (
            <LinkGroup key={group.title} title={group.title} links={group.links} />
          ))}

          {newsletter ? (
            <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                {newsletter.title}
              </p>

              {newsletter.description ? (
                <p className="text-sm leading-relaxed text-surface/65">
                  {newsletter.description}
                </p>
              ) : null}

              <form className="flex flex-col gap-3">
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={newsletter.emailLabel ?? "Email"}
                  aria-label={newsletter.emailLabel ?? "Email"}
                  className="w-full rounded border border-surface/20 bg-white/5 px-4 py-2.5 text-sm text-surface outline-none placeholder:text-surface/40 focus:border-gold/50"
                />
                <button
                  type="button"
                  className="inline-flex w-fit rounded bg-gold px-5 py-2.5 text-[12px] font-semibold tracking-wide text-navy transition-colors hover:bg-surface"
                >
                  {newsletter.submitLabel ?? "Subscribe"}
                </button>
              </form>
            </div>
          ) : null}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-surface/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {copyrightLeft ? (
            <p className="text-xs text-surface/45">{copyrightLeft}</p>
          ) : null}
          {copyrightRight ? (
            <p className="text-xs text-surface/45 sm:text-right">{copyrightRight}</p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
