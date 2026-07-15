# LOKALNY PULS — JEDEN PROJEKT, JEDEN DEPLOY

To jest **cały produkt w jednej aplikacji Next.js**. Strona główna, blog, kalkulator
i panel klienta (dashboard) działają pod **jedną domeną** (`lokalnypuls.pl`), jeden
build, jeden deploy na Vercel, jedno repozytorium GitHub.

```
lokalnypuls.pl/              → strona główna (dawny index.html)
lokalnypuls.pl/blog          → baza wiedzy (dawny blog.html)
lokalnypuls.pl/kalkulator    → kalkulator utraconych zysków (dawny kalkulator.html)
lokalnypuls.pl/login         → logowanie do panelu
lokalnypuls.pl/register      → rejestracja (14 dni trial)
lokalnypuls.pl/dashboard     → panel klienta SaaS (chroniony logowaniem)
```

Żadnej subdomeny `app.lokalnypuls.pl`, żadnego drugiego repozytorium, żadnego
drugiego hostingu. Wszystko w `lokalny-puls/`.

---

# CO SIĘ ZMIENIŁO WZGLĘDEM POPRZEDNIEJ WERSJI

Poprzednio landing page (`index.html`, `blog.html`, `kalkulator.html`) był osobnym,
statycznym projektem. Teraz jest to część tej samej aplikacji Next.js:

- Cały CSS z tych stron trafił do `public/styles/{home,blog,kalkulator}.css`
- Cały interaktywny JS (particles, chat form, liczniki, FAQ, kalkulator) trafił do
  `public/scripts/{home,kalkulator}.js` — **dokładnie ten sam kod, 1:1, bez przepisywania**
- Struktura HTML każdej strony została opakowana w komponent Next.js
  (`app/page.tsx`, `app/blog/page.tsx`, `app/kalkulator/page.tsx`)
- Wszystkie linki wewnętrzne (`index.html`, `blog.html`, `kalkulator.html`) zostały
  zamienione na trasy Next.js (`/`, `/blog`, `/kalkulator`)
- Dodałem jeden przycisk **"Zaloguj się"** w nawigacji strony głównej (obok "Darmowy
  Audyt AI") prowadzący do `/login` — bo panel klienta realnie już istnieje, więc
  Twoi obecni klienci muszą mieć jak się do niego dostać ze strony głównej

**Zweryfikowane, nie tylko założone:** odpaliłem pełny `next build` + `next start`
i sprawdziłem curl-em że `/`, `/blog`, `/kalkulator` faktycznie renderują właściwą
treść, a style/skrypty (`/styles/home.css`, `/scripts/home.js` itd.) ładują się
z kodem 200. `/dashboard` w dalszym ciągu poprawnie przekierowuje niezalogowanego
użytkownika do `/login` — logika ochrony panelu jest nietknięta.

---

# WDROŻENIE — JEDNA ŚCIEŻKA, OD POCZĄTKU DO KOŃCA

## Krok 1 — GitHub (5 minut)

```bash
cd lokalny-puls
git init
git add -A
git commit -m "Lokalny Puls - pełny projekt (landing + dashboard SaaS)"
git branch -M main
git remote add origin https://github.com/TWOJA-NAZWA/lokalny-puls.git
git push -u origin main
```

Wcześniej załóż puste repo na **github.com/new** (bez README/.gitignore — masz już
gotowe). Jeśli terminal poprosi o hasło przy pushu — GitHub wymaga dziś **Personal
Access Tokena** zamiast hasła: **Settings → Developer settings → Personal access
tokens → Generate new token** (zaznacz `repo`), wklej token zamiast hasła.

**Bez terminala:** w nowym repo na GitHub kliknij "uploading an existing file" i
przeciągnij całą zawartość folderu `lokalny-puls/`.

## Krok 2 — Supabase (baza danych + logowanie), ~10 min
1. **supabase.com** → New project
2. **SQL Editor** → wklej całą zawartość `supabase/schema.sql` → **Run**
3. **Settings → API** → skopiuj: `Project URL`, `anon public key`, `service_role key`

## Krok 3 — Stripe (płatności abonamentowe), ~10 min
1. **Dashboard → Products** → 3 produkty **recurring** (miesięczne):
   Widoczność (99 PLN), Wzrost (199 PLN), Dominacja (399 PLN)
2. Skopiuj **Price ID** każdego (`price_...`)
3. **Developers → API keys** → skopiuj `Secret key`
4. Webhook dodasz w Kroku 6, po wdrożeniu (potrzebny jest adres produkcyjny)

## Krok 4 — Groq (darmowe AI), ~2 min
**console.groq.com** → API Keys → utwórz klucz

## Krok 5 — Resend (cotygodniowe emaile), ~10 min
1. **resend.com** → Sign up (darmowe do 3000 maili/mc)
2. **Domains** → dodaj `lokalnypuls.pl` → dodaj rekordy DNS w panelu nazwa.pl
3. Skopiuj **API Key**

## Krok 6 — Deploy na Vercel, ~15 min
1. **vercel.com** → Add New Project → **Import Git Repository** → wybierz `lokalny-puls`
2. W **Environment Variables** wklej wszystkie zmienne z `.env.local.example`,
   wypełnione prawdziwymi wartościami z Kroków 2-5, plus:
   - `CRON_SECRET` — losowy ciąg (np. `openssl rand -hex 32`)
   - `NEXT_PUBLIC_APP_URL` = `https://lokalnypuls.pl` (bez subdomeny `app.`!)
3. **Deploy** — Vercel wykryje `vercel.json` i skonfiguruje crony automatycznie
4. **Project Settings → Domains** → dodaj `lokalnypuls.pl` (i `www.lokalnypuls.pl`
   jeśli chcesz obu wersji)
5. W panelu nazwa.pl zmień nameservery na Vercel (instrukcja pojawi się w tym
   samym oknie po dodaniu domeny) **albo** dodaj rekord A/CNAME wskazany przez Vercel
6. Wróć do Stripe → **Developers → Webhooks → Add endpoint**:
   - URL: `https://lokalnypuls.pl/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Skopiuj **Signing secret** → dodaj jako `STRIPE_WEBHOOK_SECRET` w Vercel → redeploy

## Krok 7 — Test końcowy
1. `lokalnypuls.pl` → sprawdź czy strona główna wygląda dobrze, particles działają
2. `lokalnypuls.pl/blog`, `/kalkulator` → sprawdź czy renderują się poprawnie
3. `lokalnypuls.pl/register` → załóż testowe konto → powinieneś trafić do `/dashboard`
4. `/dashboard/ustawienia` → wybierz plan → karta testowa Stripe: `4242 4242 4242 4242`

---

# PRZED PUBLIKACJĄ — PODMIEŃ

W `app/HomeContent.tsx` (strona główna) i `app/blog/BlogContent.tsx`:
- `+48 [TWÓJ TELEFON]` → Twój prawdziwy numer
- `href="#"` przy przyciskach Widoczność/Wzrost w cenniku agencji sekcja START/STANDARD
  → Twoje linki Stripe (Premium ma już wpięty prawdziwy link)

To są teraz stringi HTML wewnątrz plików `.tsx` (`const bodyHtml = \`...\`;`) —
szukaj po prostu przez Ctrl+F tej samej treści co wcześniej, tylko w innym pliku.

---

# CO DZIAŁA, A CO ODŁOŻONE NA PÓŹNIEJ

| Działa już teraz | Odłożone |
|---|---|
| Cała strona główna + blog + kalkulator, jeden deploy | Realne pobieranie opinii z Google (Google Business Profile API — złóż wniosek już dziś, trwa 1-2 tyg.) |
| Logowanie / rejestracja / dashboard z 5 sekcjami | Publikacja odpowiedzi/postów z powrotem do Google |
| AI-sugestie odpowiedzi + generator postów (Groq) | Raporty PDF |
| Płatności subskrypcyjne (Stripe) | Chatbot, WhatsApp, Voice AI, rezerwacje (v2.0) |
| Cotygodniowy email + streak (Resend) | |
| Codzienne AI Insights (cron) | |
