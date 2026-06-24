import type { HeaderNavLink, HeaderSection } from "@/lib/types";

type HeaderBlockProps = Omit<HeaderSection, "type">;

function NavLink({ link }: { link: HeaderNavLink }) {
  if (link.href) {
    return <a href={link.href}>{link.label}</a>;
  }

  return <span>{link.label}</span>;
}

export function HeaderBlock({ navLinks = [], cta }: HeaderBlockProps) {
  return (
    <header>
      <div>
        <a href="#">NobleOak Partners</a>

        {navLinks.length > 0 ? (
          <nav aria-label="Main navigation">
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {cta ? (
          cta.href ? (
            <a href={cta.href}>{cta.label}</a>
          ) : (
            <span>{cta.label}</span>
          )
        ) : null}
      </div>
    </header>
  );
}
