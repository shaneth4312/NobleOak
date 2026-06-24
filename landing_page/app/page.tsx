import { SectionRenderer } from "@/components/SectionRenderer";
import { getPageBySlug } from "@/lib/getPage";
import { notFound } from "next/navigation";

export default async function Home() {
  const page = await getPageBySlug("home");

  if (!page) {
    notFound();
  }

  return (
    <main>
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
}
