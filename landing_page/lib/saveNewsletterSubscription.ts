import { getDb } from "@/lib/mongo";

export type StoredNewsletterSubscription = {
  id: string;
  email: string;
  createdAt: string;
};

export async function saveNewsletterSubscription(
  email: string,
): Promise<StoredNewsletterSubscription> {
  const db = await getDb();

  const subscription: StoredNewsletterSubscription = {
    id: crypto.randomUUID(),
    email,
    createdAt: new Date().toISOString(),
  };

  await db.collection("newsletterSubscriptions").insertOne({
    ...subscription,
    createdAt: new Date(subscription.createdAt),
  });

  return subscription;
}

export function isDuplicateNewsletterEmail(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: number }).code === 11000
  );
}
