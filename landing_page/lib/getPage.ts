import { readFile } from "fs/promises";
import path from "path";
import type { Page } from "./types";

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const filePath = path.join(process.cwd(), "data", "pages", `${slug}.json`);
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as Page;
  } catch {
    return null;
  }
}
