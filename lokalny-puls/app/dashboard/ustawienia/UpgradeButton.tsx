"use client";

import { useState } from "react";

export default function UpgradeButton({
  planId,
  disabled,
}: {
  planId: "start" | "standard" | "premium";
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Nie udało się rozpocząć płatności. Spróbuj ponownie.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className="w-full py-2 rounded-lg btn-primary font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {disabled ? "Aktywny plan" : loading ? "..." : "Wybierz"}
    </button>
  );
}
