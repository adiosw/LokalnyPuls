"use client";

import { useEffect } from "react";

const bodyHtml = `<div class="calculator-container">
<div class="calculator-content">
<div class="logo"><div class="logo-icon">📍</div><div class="logo-text">LOKALNY PULS</div></div>
<h1 class="title">Ile Tracisz Rocznie?</h1>
<p class="subtitle">Sprawdź, ile pieniędzy ucieka Ci przez słabą widoczność w Google Maps. Wystarczy jeden ruch suwakiem.</p>
<div class="stats-info"><p><strong>80% klientów</strong> sprawdza wizytówkę Google przed zakupem.<br>Jeśli Cię tam nie ma - <strong>wybierają konkurencję</strong>.</p></div>
<div class="slider-section">
<div class="slider-label">Ile średnio zarabiasz na jednym kliencie?</div>
<div class="slider-value" id="sliderValue">500 zł</div>
<input type="range" min="50" max="1000" value="500" step="10" class="slider" id="profitSlider">
</div>
<div class="result-section">
<div class="result-label">Przez słabą widoczność tracisz rocznie szacunkowo:</div>
<div class="result-amount" id="lostProfit">48 000 zł</div>
<div class="result-sublabel">która mogła być w Twojej kieszeni</div>
</div>
<button class="cta-button" onclick="window.location.href='/#cennik'">Odzyskaj te pieniądze za 149 zł 🚀</button>
<div class="disclaimer">* Kalkulacja oparta na statystykach: 80% klientów szuka w Google, średnio 200 potencjalnych klientów miesięcznie pomija firmy bez widoczności. Realny wynik może się różnić w zależności od branży.</div>
</div>
</div>`;

export default function KalkulatorContent() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/kalkulator.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <link rel="stylesheet" href="/styles/kalkulator.css" />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
