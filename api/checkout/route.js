
import Stripe from "stripe";

export async function POST(req) {
  try {
    const { plan } = await req.json();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const priceMap = {
      monthly: process.env.STRIPE_PRICE_MONTHLY,
      annual: process.env.STRIPE_PRICE_ANNUAL,
      lifetime: process.env.STRIPE_PRICE_LIFETIME,
    };

    const priceId = priceMap[plan];

    if (!priceId) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: plan === "lifetime" ? "payment" : "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "https://stay-safe-tips.vercel.app/success.html",
      cancel_url: "https://stay-safe-tips.vercel.app/cancel.html",
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}