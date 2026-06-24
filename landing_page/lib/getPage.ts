import { readFile } from "fs/promises";
import path from "path";
import type { Page } from "./types";

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const filePath = path.join(process.cwd(), "data", "pages", `${slug}.json`);
    const raw = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw) as Page;

    if (
      !parsed ||
      typeof parsed.slug !== "string" ||
      !Array.isArray(parsed.sections)
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
