import { type Stripe, loadStripe } from "@stripe/stripe-js";
import { config } from "./config";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(config.services.stripe.key);
  }
  return stripePromise;
};

export const stripe = require("stripe")(config.services.stripe.secret);
