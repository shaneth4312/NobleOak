import { SectionRenderer } from "@/components/SectionRenderer";
import { fetchPageBySlug } from "@/lib/fetchPage";
import { notFound } from "next/navigation";

export default async function Home() {
  const page = await fetchPageBySlug("home");

  if (!page?.sections?.length) {
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
