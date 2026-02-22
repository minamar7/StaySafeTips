import Stripe from "stripe";
import { headers } from "next/headers";

export async function POST(req) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle successful payment
  if (
    event.type === "checkout.session.completed" ||
    event.type === "payment_intent.succeeded"
  ) {
    const session = event.data.object;

    console.log("🎉 PREMIUM UNLOCKED for:", session.customer_email);
    // Εδώ μπορείς να κάνεις:
    // - Save to DB
    // - Update user record
    // - Send email
    // - Activate premium in your system
  }

  return new Response("OK", { status: 200 });
}