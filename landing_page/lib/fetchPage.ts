import { headers } from "next/headers";
import type { Page } from "./types";

export async function fetchPageBySlug(slug: string): Promise<Page | null> {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    return null;
  }

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const response = await fetch(`${protocol}://${host}/api/pages/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
