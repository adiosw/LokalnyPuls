# Lokalny Puls - Panel Klienta (Etap 2 MVP)

Next.js 15 + Supabase + Stripe + Groq. Build zweryfikowany lokalnie (`next build` przechodzi czysto).

## Co działa już teraz:
- Rejestracja / logowanie (Supabase Auth), sesja chroniona middlewarem
- Dashboard z listą opinii + przycisk "Generuj odpowiedź AI" (Groq, darmowy tier)
- Generator postów Google (Groq)
- Wybór planu (START/STANDARD/PREMIUM) -> Stripe Checkout (subscription mode)
- Webhook Stripe aktualizujący status subskrypcji w Supabase
- Schemat bazy z Row Level Security (każda firma widzi TYLKO swoje dane)

## Czego NIE ma jeszcze (świadomie - to Etap 3+):
- Realnego pobierania opinii z Google (trzeba zatwierdzenia Google Business Profile API - złóż wniosek już teraz, trwa 1-2 tyg.)
- Publikacji odpowiedzi/postów z powrotem do Google
- Generowania raportów PDF (Etap 6)

## Uruchomienie lokalne:

1. `npm install`
2. Skopiuj `.env.local.example` -> `.env.local` i wypełnij:
   - Supabase: Dashboard -> Settings -> API (URL, anon key, service_role key)
   - Stripe: Dashboard -> Developers -> API keys + stwórz 3 Price (recurring, 99/199/399 PLN) -> Products -> API IDs
   - Groq: console.groq.com -> API Keys (darmowe)
3. W Supabase: SQL Editor -> wklej całość `supabase/schema.sql` -> Run
4. `npm run dev` -> http://localhost:3000

## Wdrożenie na produkcję (Vercel):

1. Push kodu na GitHub (prywatne repo)
2. Vercel -> Import Project -> wklej te same zmienne środowiskowe co w `.env.local`
3. Domena: w ustawieniach projektu Vercel dodaj `app.lokalnypuls.pl`
4. W nazwa.pl dodaj CNAME: `app` -> `cname.vercel-dns.com` (Vercel pokaże dokładną wartość po dodaniu domeny)
5. Stripe webhook: Dashboard -> Developers -> Webhooks -> Add endpoint
   - URL: `https://app.lokalnypuls.pl/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Skopiuj "Signing secret" -> `STRIPE_WEBHOOK_SECRET` w Vercel

## Kolejny krok (Etap 3 z masterplanu):
Wniosek o Google Business Profile API - zacznij dzisiaj, bo to jedyny element
zależny od zewnętrznej akceptacji (1-2 tygodnie oczekiwania).

---

## ETAP 3 — dodane w tej wersji:

- Dashboard przebudowany na 5 sekcji: Przegląd firmy (kafelki) / AI Insights ("osobisty doradca") / Centrum powiadomień (dzwoneczek w topbarze, Supabase Realtime) / Szybkie akcje / Roadmap produktu
- Checklist onboardingowy (znika automatycznie po ukończeniu 4 kroków) - rozwiązuje problem pustego dashboardu w dniu 1
- Cron `/api/cron/generate-insights` (codziennie 6:00) - Groq generuje 1-3 wskazówki dnia per firma
- Cron `/api/cron/weekly-email` (poniedziałki 7:00) - Resend wysyła cotygodniowe podsumowanie + liczy streak aktywności
- Nazwy planów SaaS zmienione na oparte o efekt: Widoczność (99 zł) / Wzrost (199 zł) / Dominacja (399 zł) - ID wewnętrzne w bazie zostają bez zmian (start/standard/premium), zmienia się tylko to co widzi klient

## Dodatkowe kroki setupu (Etap 3):

1. Załóż konto na resend.com (darmowe do 3000 maili/mc), zweryfikuj domenę `lokalnypuls.pl`, pobierz API key -> `RESEND_API_KEY`
2. Wygeneruj losowy sekret (`openssl rand -hex 32`) -> `CRON_SECRET` (ten sam sekret musi być ustawiony w Vercel env vars - crony w `vercel.json` wywołują się automatycznie na produkcji, ale możesz też testować ręcznie: `curl -H "Authorization: Bearer TWÓJ_SEKRET" https://app.lokalnypuls.pl/api/cron/generate-insights`)
3. W Supabase: SQL Editor -> uruchom ponownie `supabase/schema.sql` (dodaje nowe tabele `ai_insights`, `monthly_goals`, kolumny onboardingowe w `businesses` - bezpieczne do ponownego uruchomienia, używa `if not exists`)
