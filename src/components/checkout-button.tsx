"use client";

import { useState } from "react";

export default function StripeCheckoutButton({ priceId }: { priceId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      {isLoading ? "Loading..." : "Subscribe"}
    </button>
  );
}
