import { HeaderBlock } from "@/components/blocks/HeaderBlock";
import { getPageBySlug } from "@/lib/getPage";
import { notFound } from "next/navigation";

export default async function Home() {
  const page = await getPageBySlug("home");

  if (!page) {
    notFound();
  }

  const header = page.sections.find((section) => section.type === "header");

  if (!header || header.type !== "header") {
    return null;
  }

  return (
    <main>
      <HeaderBlock {...header} />
    </main>
  );
}
