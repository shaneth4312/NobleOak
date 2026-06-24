import { saveLead } from "@/lib/saveLead";
import { validateContactFormSubmission } from "@/lib/validators/contactFormValidator";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const result = validateContactFormSubmission(body);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        details: result.errors,
      },
      { status: 400 },
    );
  }

  const pageSlug =
    body &&
    typeof body === "object" &&
    typeof (body as Record<string, unknown>).pageSlug === "string"
      ? (body as Record<string, string>).pageSlug
      : undefined;

  try {
    const lead = await saveLead(result.data, pageSlug);

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
        id: lead.id,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to save submission" },
      { status: 500 },
    );
  }
}
