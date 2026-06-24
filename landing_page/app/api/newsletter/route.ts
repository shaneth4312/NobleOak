import {
    isDuplicateNewsletterEmail,
    saveNewsletterSubscription,
  } from "@/lib/saveNewsletterSubscription";
  import { validateNewsletterSubscription } from "@/lib/validators/newsletterValidator";
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
  
    const result = validateNewsletterSubscription(body);
  
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
  
    try {
      const subscription = await saveNewsletterSubscription(result.data.email);
  
      return NextResponse.json(
        {
          success: true,
          message: "Subscribed successfully",
          id: subscription.id,
        },
        { status: 201 },
      );
    } catch (error) {
      if (isDuplicateNewsletterEmail(error)) {
        return NextResponse.json(
          {
            success: true,
            message: "Subscribed successfully",
          },
          { status: 200 },
        );
      }
  
      return NextResponse.json(
        { success: false, error: "Unable to save subscription" },
        { status: 500 },
      );
    }
  }
  