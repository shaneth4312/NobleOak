function getHeaderOffset(): number {
    const header = document.querySelector("header");
    return header instanceof HTMLElement ? header.offsetHeight : 0;
  }
  
  export function handleAnchorClick(
    e: Pick<MouseEvent, "preventDefault">,
    href: string | undefined,
  ) {
    if (!href?.startsWith("#")) return;
  
    e.preventDefault();
    const id = href.slice(1);
  
    if (!id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  
    const target = document.getElementById(id);
    if (!target) return;
  
    const top =
      target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }
  