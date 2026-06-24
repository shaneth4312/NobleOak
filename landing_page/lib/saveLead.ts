import { getDb } from "@/lib/mongo";
import type { ContactFormSubmission } from "@/lib/types";

export type StoredLead = ContactFormSubmission & {
  id: string;
  createdAt: string;
  pageSlug?: string;
};

export async function saveLead(
  submission: ContactFormSubmission,
  pageSlug?: string,
): Promise<StoredLead> {
  const db = await getDb();

  const lead: StoredLead = {
    ...submission,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    pageSlug,
  };

  await db.collection("leads").insertOne({
    ...lead,
    createdAt: new Date(lead.createdAt),
  });

  return lead;
}
