"use client";

import { useEffect } from "react";

const bodyHtml = `<canvas id="particlesCanvas"></canvas>

<!-- NAV -->
<nav class="navbar">
  <div class="container">
    <div class="nav-content">
      <a href="#start" class="logo"><div class="logo-icon">📍</div><span>LOKALNY PULS</span></a>
      <ul class="nav-menu">
        <li><a href="#start">Start</a></li>
        <li><a href="#cennik">Cennik</a></li>
        <li><a href="#narzedzia">Narzędzia</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <a href="/login" class="nav-cta" style="background:transparent;border:2px solid #3B82F6;box-shadow:none;margin-right:10px;">Zaloguj się</a>
        <a href="#audyt" class="nav-cta">Darmowy Audyt AI</a>
      <div class="hamburger" onclick="toggleMobileMenu()"><span></span><span></span><span></span></div>
    </div>
  </div>
</nav>

<div class="mobile-menu" id="mobileMenu">
  <ul>
    <li><a href="#start" onclick="toggleMobileMenu()">Start</a></li>
    <li><a href="#cennik" onclick="toggleMobileMenu()">Cennik</a></li>
    <li><a href="#narzedzia" onclick="toggleMobileMenu()">Narzędzia</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="#faq" onclick="toggleMobileMenu()">FAQ</a></li>
    <li><a href="/login" onclick="toggleMobileMenu()">Zaloguj się</a></li>
    <li><a href="#audyt" onclick="toggleMobileMenu()">Darmowy Audyt</a></li>
  </ul>
</div>

<!-- HERO -->
<section class="hero" id="start">
  <svg class="poland-map-bg" viewBox="0 0 400 600" fill="none">
    <path d="M200 50 L250 100 L280 150 L300 250 L280 350 L250 450 L200 500 L150 450 L120 350 L100 250 L120 150 L150 100 Z" stroke="rgba(59,130,246,0.6)" stroke-width="3" fill="none"/>
  </svg>
  <div class="hero-content">
    <div class="hero-badge">⚡ Agencja + Narzędzie dla Lokalnych Firm</div>
    <h1>Twoi klienci już<br>Cię szukają w Google.<br>Zadbaj, żeby Cię znaleźli.</h1>
    <p class="hero-description">
      Optymalizujemy Twoją wizytówkę Google Maps w 48h. 
      Potem dajemy Ci narzędzie, żebyś utrzymał efekt bez wysiłku — więcej telefonów, więcej opinii, więcej rezerwacji.
    </p>
    <button class="hero-cta" onclick="document.getElementById('audyt').scrollIntoView({behavior:'smooth'})">Sprawdź Widoczność Teraz 🚀</button>
  </div>
</section>

<!-- STATS -->
<section class="stats reveal">
  <div class="container">
    <div class="stats-grid">
      <div class="stat-card glass"><div class="stat-icon">📞</div><div class="stat-number" data-target="350">0</div><div class="stat-label">% Wzrost Połączeń</div></div>
      <div class="stat-card glass"><div class="stat-icon">👥</div><div class="stat-number" data-target="247">0</div><div class="stat-label">Obsługa 24/7</div></div>
      <div class="stat-card glass"><div class="stat-icon">📍</div><div class="stat-number" data-target="3">0</div><div class="stat-label">Top w Mapach</div></div>
      <div class="stat-card glass"><div class="stat-icon">📈</div><div class="stat-number" data-target="10">0</div><div class="stat-label">x Zwrot Inwestycji</div></div>
    </div>
  </div>
</section>

<!-- JAK WYGLĄDA WSPÓŁPRACA -->
<section class="steps reveal">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Jak wygląda współpraca</h2>
      <p class="section-subtitle">Od zera do widoczności w 4 prostych krokach</p>
    </div>
    <div class="steps-grid">
      <div class="step-card glass"><div class="step-number">1</div><div class="step-title">Darmowy Audyt</div><div class="step-text">Wypełniasz krótki formularz. Sprawdzamy Twoją wizytówkę i pokazujemy dokładnie co Cię kosztuje.</div></div>
      <div class="step-card glass"><div class="step-number">2</div><div class="step-title">Optymalizacja (48h)</div><div class="step-text">Naprawiamy zdjęcia, opisy, słowa kluczowe i braki. Realizacja w 2 dni robocze.</div></div>
      <div class="step-card glass"><div class="step-number">3</div><div class="step-title">Panel Klienta</div><div class="step-text">Dostajesz dostęp do narzędzia - widzisz opinie, AI podpowiada odpowiedzi, monitorujemy wizytówkę.</div></div>
      <div class="step-card glass"><div class="step-number">4</div><div class="step-title">Wzrost</div><div class="step-text">Więcej telefonów, więcej rezerwacji. Co miesiąc raport pokazujący postępy.</div></div>
    </div>
  </div>
</section>

<!-- FLOATING OFFER -->
<section class="offer reveal">
  <div class="container">
    <div class="offer-card">
      <div class="bestseller-badge">⚡ BESTSELLER</div>
      <h2 class="offer-title">PAKIET<br><span class="highlight">SZYBKI START</span></h2>
      <div class="old-price">199 zł</div>
      <div class="price">149 zł</div>
      <p style="text-align:center;color:#64748B;font-size:1.05rem;margin-bottom:28px;">Płatność jednorazowa • Efekt na lata</p>
      <ul class="pricing-features" style="color:#334155;">
        <li style="color:#334155;">Pełna optymalizacja wizytówki Google</li>
        <li style="color:#334155;">Profesjonalne opisy AI</li>
        <li style="color:#334155;">Analiza konkurencji</li>
        <li style="color:#334155;">Realizacja w 48 godzin</li>
      </ul>
      <a href="#audyt" class="pricing-button">Odbierz Raport 🚀</a>
    </div>
  </div>
</section>

<!-- CENNIK: AGENCJA + ABONAMENT -->
<section class="pricing reveal" id="cennik">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Wybierz swoją drogę</h2>
      <p class="section-subtitle">Jednorazowa naprawa, albo stały wzrost z narzędziem — Ty decydujesz</p>
    </div>

    <div class="tab-toggle">
      <button class="tab-btn active" onclick="switchTab('agencja')">Agencja (jednorazowo)</button>
      <button class="tab-btn" onclick="switchTab('abonament')">Abonament (co miesiąc)</button>
    </div>

    <!-- PANEL: AGENCJA -->
    <div class="pricing-panel active" id="panel-agencja">
      <div class="pricing-grid">
        <div class="pricing-card glass">
          <h3 class="pricing-name">START</h3>
          <p class="pricing-tagline">Wyjdź z niewidzialności</p>
          <div class="pricing-price"><div class="pricing-old-price">199 zł</div><div class="pricing-new-price">149 zł</div></div>
          <ul class="pricing-features">
            <li>Audyt wizytówki Google</li>
            <li>Poprawa nazwy firmy</li>
            <li>Weryfikacja PIN</li>
            <li>Raport z błędami</li>
          </ul>
          <a href="#" class="pricing-button">Wybieram Start</a>
        </div>
        <div class="pricing-card glass featured">
          <h3 class="pricing-name">STANDARD</h3>
          <p class="pricing-tagline">Wyprzedź konkurencję</p>
          <div class="pricing-price"><div class="pricing-old-price">399 zł</div><div class="pricing-new-price">349 zł</div></div>
          <ul class="pricing-features">
            <li>Wszystko z START</li>
            <li>Optymalizacja słów kluczowych</li>
            <li>Opisy AI</li>
            <li>Profesjonalne zdjęcia</li>
            <li>Raport konkurencji</li>
          </ul>
          <a href="#" class="pricing-button">Wybieram Standard</a>
        </div>
        <div class="pricing-card glass">
          <h3 class="pricing-name">PREMIUM</h3>
          <p class="pricing-tagline">Pełna dominacja lokalna</p>
          <div class="pricing-price"><div class="pricing-old-price">999 zł</div><div class="pricing-new-price">849 zł</div></div>
          <ul class="pricing-features">
            <li>Wszystko ze STANDARD</li>
            <li>System zbierania opinii (QR)</li>
            <li>3 miesiące wsparcia</li>
            <li>Priorytetowa indeksacja</li>
          </ul>
          <a href="https://buy.stripe.com/7sYfZigyIfn6VqU9kO0" class="pricing-button">Wybieram Premium</a>
        </div>
      </div>
      <p class="subscription-note">💡 Kupiłeś pakiet? Po 30 dniach zaproponujemy Ci abonament, żeby utrzymać efekt bez wysiłku.</p>
    </div>

    <!-- PANEL: ABONAMENT -->
    <div class="pricing-panel" id="panel-abonament">
      <div class="pricing-grid">
        <div class="pricing-card glass">
          <h3 class="pricing-name">Widoczność</h3>
          <p class="pricing-tagline">Wiesz o wszystkim pierwszy — zero wysiłku</p>
          <div class="pricing-price"><div class="pricing-new-price">99 <span>zł/mc</span></div></div>
          <ul class="pricing-features">
            <li>Nigdy nie przegapisz nowej opinii</li>
            <li>Gotowa odpowiedź AI jednym kliknięciem</li>
            <li>Alert, gdy coś wymaga uwagi</li>
            <li>Raport miesięczny PDF</li>
          </ul>
          <a href="#panel-cs" class="pricing-button secondary">Zapisz się na Widoczność</a>
        </div>
        <div class="pricing-card glass featured">
          <h3 class="pricing-name">Wzrost</h3>
          <p class="pricing-tagline">Nowy post co tydzień, żadna opinia bez odpowiedzi</p>
          <div class="pricing-price"><div class="pricing-new-price">199 <span>zł/mc</span></div></div>
          <ul class="pricing-features">
            <li>Wszystko z Widoczności</li>
            <li>Reagujemy za Ciebie na negatywne opinie w 24h</li>
            <li>Gotowy post na Google 2x/mc</li>
            <li>Priorytetowe wsparcie</li>
          </ul>
          <a href="#panel-cs" class="pricing-button secondary">Zapisz się na Wzrost</a>
        </div>
        <div class="pricing-card glass">
          <h3 class="pricing-name">Dominacja</h3>
          <p class="pricing-tagline">Ty prowadzisz firmę, my dbamy o Google</p>
          <div class="pricing-price"><div class="pricing-new-price">399 <span>zł/mc</span></div></div>
          <ul class="pricing-features">
            <li>Wszystko ze Wzrostu</li>
            <li>Cotygodniowy gotowy post</li>
            <li>Pełna optymalizacja co kwartał</li>
            <li>Dedykowane wsparcie</li>
          </ul>
          <a href="#panel-cs" class="pricing-button secondary">Zapisz się na Premium</a>
        </div>
      </div>
      <p class="subscription-note">🚧 Panel klienta w budowie — zapisz się, żeby dostać dostęp jako pierwszy (i 14 dni gratis).</p>
    </div>
  </div>
</section>

<!-- LOKALNY PULS SIĘ ROZWIJA -->
<section class="roadmap reveal">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Lokalny Puls się rozwija</h2>
      <p class="section-subtitle">To nie jednorazowy projekt — to platforma, która rośnie co miesiąc</p>
    </div>
    <div class="roadmap-list">
      <div class="roadmap-item glass done"><span class="roadmap-check">✅</span><span class="roadmap-text">Optymalizacja wizytówek Google</span><span class="roadmap-date">Działa</span></div>
      <div class="roadmap-item glass done"><span class="roadmap-check">✅</span><span class="roadmap-text">Audyt AI (darmowy)</span><span class="roadmap-date">Działa</span></div>
      <div class="roadmap-item glass next"><span class="roadmap-check">🔵</span><span class="roadmap-text">Panel klienta</span><span class="roadmap-date">Wkrótce</span></div>
      <div class="roadmap-item glass next"><span class="roadmap-check">🔵</span><span class="roadmap-text">AI odpowiedzi na opinie</span><span class="roadmap-date">Wkrótce</span></div>
      <div class="roadmap-item glass next"><span class="roadmap-check">🔵</span><span class="roadmap-text">Raporty miesięczne PDF</span><span class="roadmap-date">Wkrótce</span></div>
      <div class="roadmap-item glass future"><span class="roadmap-check">⚪</span><span class="roadmap-text">Generator postów Google</span><span class="roadmap-date">Planowane</span></div>
      <div class="roadmap-item glass future"><span class="roadmap-check">⚪</span><span class="roadmap-text">AI Chatbot</span><span class="roadmap-date">Planowane</span></div>
      <div class="roadmap-item glass future"><span class="roadmap-check">⚪</span><span class="roadmap-text">Automatyczne rezerwacje</span><span class="roadmap-date">Planowane</span></div>
      <div class="roadmap-item glass future"><span class="roadmap-check">⚪</span><span class="roadmap-text">WhatsApp / Messenger</span><span class="roadmap-date">Planowane</span></div>
    </div>
  </div>
</section>

<!-- NARZĘDZIA -->
<section class="tools reveal" id="narzedzia">
  <div class="container">
    <div class="section-header">
      <span class="coming-soon-badge">Coming Soon</span>
      <h2 class="section-title">Narzędzia</h2>
      <p class="section-subtitle">Panel, do którego logujesz się codziennie, żeby zarządzać swoją obecnością w Google</p>
    </div>
    <div class="tools-grid">
      <div class="tool-card glass"><div class="tool-icon">💬</div><div class="tool-title">Nic Ci nie umknie</div><div class="tool-text">Każda opinia z Google trafia do jednego panelu — nie musisz sam sprawdzać wizytówki codziennie.</div></div>
      <div class="tool-card glass"><div class="tool-icon">🤖</div><div class="tool-title">Odpowiadasz w 10 sekund</div><div class="tool-text">Gotowa, profesjonalna odpowiedź na każdą opinię jednym kliknięciem — zamiast zastanawiać się co napisać.</div></div>
      <div class="tool-card glass"><div class="tool-icon">🔔</div><div class="tool-title">Wiesz pierwszy, nie ostatni</div><div class="tool-text">Nowa opinia, spadek oceny — dostajesz sygnał zanim zauważy to konkurencja.</div></div>
      <div class="tool-card glass"><div class="tool-icon">📊</div><div class="tool-title">Widzisz czy to działa</div><div class="tool-text">Co miesiąc konkretne liczby — ile opinii przybyło, jak zmieniła się widoczność.</div></div>
      <div class="tool-card glass"><div class="tool-icon">💡</div><div class="tool-title">Osobisty doradca</div><div class="tool-text">Codziennie krótka wskazówka co zrobić dziś, żeby zyskać więcej klientów — nie musisz wiedzieć od czego zacząć.</div></div>
      <div class="tool-card glass"><div class="tool-icon">📝</div><div class="tool-title">Post gotowy w minutę</div><div class="tool-text">Bez zastanawiania się co napisać — gotowa treść na Twoją wizytówkę Google, publikujesz jednym kliknięciem.</div></div>
    </div>
  </div>
</section>

<!-- DLACZEGO LOKALNY PULS -->
<section class="why reveal">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Dlaczego Lokalny Puls</h2>
    </div>
    <div class="why-grid">
      <div class="why-card glass"><div class="why-icon">⚡</div><div class="why-title">48 godzin</div><div class="why-text">Konkurencja: 2-4 tygodnie. My: realizacja w 2 dni robocze.</div></div>
      <div class="why-card glass"><div class="why-icon">💳</div><div class="why-title">Jednorazowo lub abonament</div><div class="why-text">Ty wybierasz model. Bez ukrytych kosztów.</div></div>
      <div class="why-card glass"><div class="why-icon">🎯</div><div class="why-title">Tylko Google Maps</div><div class="why-text">Nie rozpraszamy się na 10 usług. Robimy jedną rzecz bardzo dobrze.</div></div>
      <div class="why-card glass"><div class="why-icon">📍</div><div class="why-title">Znamy ten rynek</div><div class="why-text">Oświęcim, Kraków, Katowice, Bielsko-Biała — to nasze podwórko.</div></div>
    </div>
  </div>
</section>

<!-- CHAT FORM -->
<section class="form-section reveal" id="audyt">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Nie zgaduj. Sprawdź to.</h2>
      <p class="section-subtitle">Nasz system AI przeanalizuje Twoją firmę w Google</p>
    </div>
    <div class="chat-form glass">
      <div class="progress-bar"><div class="progress-fill" id="progressBar" style="width:25%"></div></div>
      <div class="chat-messages" id="chatMessages">
        <div class="chat-message"><div class="message-bubble">Cześć! 👋 Pomogę Ci sprawdzić widoczność firmy...</div></div>
      </div>
      <div class="form-step active" id="step1">
        <input type="text" class="form-input" id="companyName" placeholder="Jak nazywa się Twoja firma?">
        <button class="form-button" onclick="nextStep(1)">Dalej →</button>
      </div>
      <div class="form-step" id="step2">
        <input type="tel" class="form-input" id="phone" placeholder="Twój numer telefonu">
        <button class="form-button" onclick="nextStep(2)">Dalej →</button>
      </div>
      <div class="form-step" id="step3">
        <input type="email" class="form-input" id="email" placeholder="Email do wysłania raportu">
        <button class="form-button" onclick="nextStep(3)">Dalej →</button>
      </div>
      <div class="form-step" id="step4">
        <input type="text" class="form-input" id="city" placeholder="W jakim mieście działasz?">
        <button class="form-button" onclick="submitForm()">Odbierz Raport 📊</button>
      </div>
    </div>
  </div>
</section>

<!-- BLOG PREVIEW -->
<section class="blog-preview reveal">
  <div class="container">
    <div class="section-header"><h2 class="section-title">Wiedza, która zarabia</h2></div>
    <div class="blog-grid">
      <a href="/blog#artykul-1" class="blog-card glass"><div class="blog-icon">🔍</div><h3 class="blog-title">Dlaczego znikasz z Map Google?</h3><p class="blog-excerpt">5 błędów które topią widoczność...</p></a>
      <a href="/blog#artykul-2" class="blog-card glass"><div class="blog-icon">📸</div><h3 class="blog-title">Zdjęcia sprzedają jedzenie</h3><p class="blog-excerpt">+30% rezerwacji dzięki 5 zdjęciom...</p></a>
      <a href="/blog#artykul-3" class="blog-card glass"><div class="blog-icon">⚠️</div><h3 class="blog-title">Jak usuwać negatywne opinie?</h3><p class="blog-excerpt">Procedury Google 2026...</p></a>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq reveal" id="faq">
  <div class="container">
    <div class="section-header"><h2 class="section-title">FAQ</h2></div>
    <div class="faq-list">
      <div class="faq-item glass" onclick="toggleFaq(this)">
        <div class="faq-question">Czym różni się pakiet od abonamentu?<span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-inner">Pakiet to jednorazowa naprawa wizytówki (149-849 zł). Abonament (99-399 zł/mc) to narzędzie, które pomaga Ci utrzymać efekt na bieżąco — opinie, posty, monitoring.</div></div>
      </div>
      <div class="faq-item glass" onclick="toggleFaq(this)">
        <div class="faq-question">Czy mogę kupić pakiet i potem przejść na abonament?<span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-inner">Tak, to najczęstsza ścieżka. Większość klientów zaczyna od pakietu STANDARD, a potem przechodzi na abonament, żeby nie stracić efektu.</div></div>
      </div>
      <div class="faq-item glass" onclick="toggleFaq(this)">
        <div class="faq-question">Ile to kosztuje utrzymanie miesięcznie?<span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-inner">Od 99 zł/mc za sam dashboard z AI, do 399 zł/mc za pełną obsługę jak w agencji.</div></div>
      </div>
      <div class="faq-item glass" onclick="toggleFaq(this)">
        <div class="faq-question">Czy muszę coś umieć technicznie?<span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-inner">Nie. Wszystko robimy za Ciebie lub prowadzimy Cię krok po kroku w panelu.</div></div>
      </div>
      <div class="faq-item glass" onclick="toggleFaq(this)">
        <div class="faq-question">Co jeśli zrezygnuję z abonamentu?<span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-inner">Możesz anulować w każdej chwili. Dashboard zostaje aktywny (w trybie podglądu) jeszcze przez 7 dni.</div></div>
      </div>
      <div class="faq-item glass" onclick="toggleFaq(this)">
        <div class="faq-question">Jak długo trwa wdrożenie pakietu?<span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-inner">48 godzin od zamówienia do ukończenia optymalizacji.</div></div>
      </div>
      <div class="faq-item glass" onclick="toggleFaq(this)">
        <div class="faq-question">Czy działacie poza Małopolską/Śląskiem?<span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-inner">Obecnie skupiamy się na Oświęcimiu, Krakowie, Katowicach i Bielsku-Białej. Cała Polska — wkrótce.</div></div>
      </div>
      <div class="faq-item glass" onclick="toggleFaq(this)">
        <div class="faq-question">Co to jest "AI-odpowiedź na opinię" i czy to bezpieczne?<span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-inner">AI generuje gotową, profesjonalną treść odpowiedzi po polsku. Ty zawsze zatwierdzasz zanim zostanie opublikowana — nic nie dzieje się automatycznie bez Twojej zgody.</div></div>
      </div>
      <div class="faq-item glass" onclick="toggleFaq(this)">
        <div class="faq-question">Ile nowych klientów mogę realnie zyskać?<span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-inner">To zależy od branży i konkurencji w Twojej okolicy, ale nasi klienci notowali średnio +30-50% więcej telefonów w pierwszych 2-4 tygodniach po optymalizacji. Sprawdź kalkulator, żeby zobaczyć szacunek dla Twojej firmy.</div></div>
      </div>
    </div>
  </div>
</section>

<!-- PANEL KLIENTA COMING SOON -->
<section class="panel-cs reveal" id="panel-cs">
  <div class="container">
    <div class="panel-cs-card glass">
      <span class="coming-soon-badge">Coming Soon</span>
      <h2 class="section-title" style="margin-bottom:10px;">Panel Klienta</h2>
      <p class="section-subtitle" style="margin-bottom:35px;">Zapisz się, żeby dostać dostęp jako pierwszy — i 14 dni gratis</p>
      <div class="panel-cs-mockup">
        <div class="panel-cs-mockup-bar"><span></span><span></span><span></span></div>
        <div class="panel-cs-mockup-body">
          <div class="panel-cs-mockup-row"><span>Nowa opinia — Jan K.</span><span class="stars">★★★★★</span></div>
          <div class="panel-cs-mockup-row"><span>Sugestia AI gotowa</span><span>✅</span></div>
          <div class="panel-cs-mockup-row"><span>Kompletność wizytówki</span><span>87%</span></div>
          <div class="panel-cs-mockup-row"><span>Raport za marzec</span><span>📄 PDF</span></div>
        </div>
      </div>
      <form class="notify-form" onsubmit="notifySignup(event)">
        <input type="email" class="notify-input" id="notifyEmail" placeholder="Twój email" required>
        <button type="submit" class="notify-button">Zapisz mnie 🔔</button>
      </form>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer-main glass">
      <div class="footer-content">
        <div class="footer-column">
          <div class="logo" style="margin-bottom:20px;"><div class="logo-icon">📍</div><span>LOKALNY PULS</span></div>
          <p style="color:rgba(255,255,255,0.6);">Agencja Marketingu Lokalnego<br>Oświęcim i okolice</p>
        </div>
        <div class="footer-column">
          <h3>Szybkie Linki</h3>
          <ul>
            <li><a href="#start">Start</a></li>
            <li><a href="#cennik">Cennik</a></li>
            <li><a href="#narzedzia">Narzędzia</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Kontakt</h3>
          <ul style="list-style:none;">
            <li style="margin-bottom:10px;">📧 kontakt@lokalnypuls.pl</li>
            <li style="margin-bottom:10px;">📞 +48 [TWÓJ TELEFON]</li>
            <li>📍 Oświęcim, Małopolska</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-payment">
      <div class="payment-badge"><span>🔒</span><span>Bezpieczne Płatności Stripe</span></div>
      <div class="payment-icons"><span>💳</span><span>💵</span><span>🏦</span></div>
    </div>
    <div style="color:rgba(255,255,255,0.4);font-size:.85rem;">© 2026 Lokalny Puls. Wszelkie prawa zastrzeżone.</div>
  </div>
</footer>`;

export default function HomeContent() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/home.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <link rel="stylesheet" href="/styles/home.css" />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
