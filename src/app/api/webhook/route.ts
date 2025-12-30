import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { config } from "@/lib/config";

export async function POST(req: Request) {
  const buf = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      config.services.stripe.webhook.secret,
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
      // Handle subscription created
      break;
    case "customer.subscription.updated":
      // Handle subscription updated
      break;
    case "customer.subscription.deleted":
      // Handle subscription cancelled
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
