export type Service = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  benefits: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "optymalizacja-wizytowki-google",
    name: "Optymalizacja Wizytówki Google",
    title: "Optymalizacja Wizytówki Google - Więcej Klientów z Map | Lokalny Puls",
    metaDescription: "Kompletna optymalizacja wizytówki Google Business Profile - nazwa, kategorie, opis, słowa kluczowe. Realizacja w 48h, efekt widoczny od razu.",
    h1: "Optymalizacja Wizytówki Google - Fundament Widoczności Lokalnej",
    intro: "Wizytówka Google to Twoja witryna sklepowa w internecie - jeśli jest niekompletna, klienci przechodzą obok, nawet nie wiedząc że istniejesz. Optymalizujemy każdy element: nazwę, kategorię, opis, godziny, atrybuty - tak, żeby Google pokazywał Cię częściej i wyżej w lokalnych wynikach wyszukiwania.",
    benefits: [
      { title: "Poprawna kategoria główna i dodatkowa", text: "Google dopasowuje wyniki do zapytań na podstawie kategorii - błędna lub niepełna kategoria oznacza, że nie pojawiasz się w połowie trafnych wyszukiwań." },
      { title: "Opis z naturalnie wplecionymi słowami kluczowymi", text: "Piszemy opis, który brzmi naturalnie dla klienta, ale zawiera frazy, których faktycznie szukają ludzie w Twojej branży i mieście." },
      { title: "Kompletne atrybuty i udogodnienia", text: "Parking, dostępność dla niepełnosprawnych, płatność kartą - każdy zaznaczony atrybut to dodatkowy filtr wyszukiwania, w którym możesz się pojawić." },
    ],
    faq: [
      { q: "Ile trwa optymalizacja wizytówki?", a: "Sama optymalizacja zajmuje nam 48 godzin od zebrania danych o Twojej firmie. Pełny efekt w wynikach wyszukiwania Google buduje się przez 2-4 tygodnie." },
      { q: "Czy stracę dotychczasowe opinie przy optymalizacji?", a: "Nie, żadna opinia, zdjęcie ani dane historyczne nie są usuwane - optymalizujemy istniejącą wizytówkę, nie tworzymy nowej." },
      { q: "Czy mogę to zrobić sam zamiast zlecać?", a: "Tak, wszystkie te ustawienia są dostępne publicznie w Google Business Profile - różnica to czas (kilka godzin nauki i wdrożenia) oraz znajomość, które elementy realnie wpływają na pozycję w wynikach." },
    ],
  },
  {
    slug: "google-business-profile",
    name: "Google Business Profile",
    title: "Zakładanie i Weryfikacja Google Business Profile | Lokalny Puls",
    metaDescription: "Pomagamy założyć, zweryfikować i skonfigurować Google Business Profile od zera. Weryfikacja PIN, poprawna kategoria, pełna konfiguracja.",
    h1: "Google Business Profile - Zakładamy i Konfigurujemy Od Zera",
    intro: "Jeśli Twoja firma jeszcze nie ma wizytówki Google albo jest niezweryfikowana - to pierwszy krok przed jakimkolwiek innym działaniem marketingowym. Zakładamy konto, przechodzimy proces weryfikacji (PIN pocztowy lub telefoniczny) i konfigurujemy wszystkie ustawienia od podstaw.",
    benefits: [
      { title: "Prawidłowa weryfikacja bez błędów", text: "Źle przeprowadzona weryfikacja może zawiesić wizytówkę na tygodnie - prowadzimy Cię przez cały proces krok po kroku." },
      { title: "Poprawna struktura od pierwszego dnia", text: "Łatwiej zbudować dobrze niż naprawiać źle skonfigurowane konto - ustawiamy wszystko zgodnie z wytycznymi Google od razu." },
      { title: "Gotowość na dalszy rozwój", text: "Prawidłowo założone konto to fundament pod przyszłe funkcje - posty, produkty, komunikator Google, rezerwacje." },
    ],
    faq: [
      { q: "Co jeśli firma już ma jakąś wizytówkę, ale nikt jej nie zarządza?", a: "Sprawdzamy status i przejmujemy zarządzanie przez formalny proces Google (żądanie dostępu właściciela) - nie trzeba zakładać nowej wizytówki." },
      { q: "Ile trwa weryfikacja przez Google?", a: "Weryfikacja pocztowa trwa zwykle 5-14 dni, telefoniczna czy mailowa (jeśli dostępna dla danej kategorii firmy) może zająć kilka minut." },
      { q: "Czy potrzebuję dokumentów firmowych?", a: "Google czasem prosi o potwierdzenie działalności (NIP, adres) - przygotowujemy listę potrzebnych dokumentów przed rozpoczęciem procesu." },
    ],
  },
  {
    slug: "google-maps-seo",
    name: "Google Maps SEO",
    title: "Google Maps SEO - Wyższa Pozycja w Wynikach Lokalnych | Lokalny Puls",
    metaDescription: "Kompleksowe SEO dla Google Maps - analiza konkurencji, słowa kluczowe, sygnały lokalne. Wyprzedź konkurencję w wynikach \"w pobliżu\".",
    h1: "Google Maps SEO - Wyprzedź Konkurencję w Wynikach Lokalnych",
    intro: "Pozycja w Google Maps zależy od trzech czynników: trafności (czy wizytówka pasuje do zapytania), odległości i widoczności (aktywność, opinie, zdjęcia). Pracujemy nad wszystkimi trzema jednocześnie - to nie jest jednorazowe działanie, tylko proces budowania przewagi w czasie.",
    benefits: [
      { title: "Analiza pozycji względem konkurencji", text: "Sprawdzamy dokładnie gdzie jesteś dziś i co robią lepiej wypozycjonowani konkurenci w Twojej okolicy." },
      { title: "Budowanie sygnałów lokalnych", text: "Regularna aktywność (posty, zdjęcia, odpowiedzi na opinie) to sygnał dla Google, że wizytówka jest \"żywa\" i wiarygodna." },
      { title: "Dobór słów kluczowych pod realne zapytania", text: "Nie zgadujemy - sprawdzamy jakich fraz faktycznie szukają ludzie w Twojej branży i lokalizacji." },
    ],
    faq: [
      { q: "Jak długo trwa zanim zobaczę efekty w pozycji?", a: "Pierwsze zmiany widoczne są po 1-2 tygodniach, ale pełny efekt budowania pozycji to proces 1-3 miesięcy regularnej pracy." },
      { q: "Czy pozycja w Google Maps to to samo co SEO strony internetowej?", a: "Nie, to osobny algorytm (Google Maps / Local Pack) z innymi czynnikami rankingowymi niż klasyczne wyniki wyszukiwania - dlatego wymaga osobnego podejścia." },
      { q: "Czy konkurencja może zaszkodzić mojej pozycji?", a: "Bezpośrednio nie, ale jeśli konkurencja aktywniej optymalizuje swoją wizytówkę, relatywnie spadasz w wynikach - dlatego to proces ciągły, nie jednorazowy." },
    ],
  },
  {
    slug: "zarzadzanie-opiniami",
    name: "Zarządzanie Opiniami",
    title: "Zarządzanie Opiniami Google - System Zbierania i Odpowiedzi | Lokalny Puls",
    metaDescription: "Profesjonalne zarządzanie opiniami Google - system zbierania opinii (QR code), odpowiedzi na negatywne opinie, budowanie zaufania klientów.",
    h1: "Zarządzanie Opiniami Google - Więcej Opinii, Lepsza Reputacja",
    intro: "94% konsumentów unika firm z niskimi ocenami, a firma bez opinii budzi jeszcze większą nieufność niż ta z kilkoma negatywnymi. Wdrażamy system aktywnego zbierania opinii od zadowolonych klientów oraz profesjonalnie odpowiadamy na te trudne - tak, żeby Twoja wizytówka realnie odzwierciedlała jakość Twojej pracy.",
    benefits: [
      { title: "System zbierania opinii (QR code + link)", text: "Prosty system proszący zadowolonych klientów o opinię we właściwym momencie - zaraz po pozytywnym doświadczeniu." },
      { title: "Profesjonalne odpowiedzi na negatywne opinie", text: "Każda odpowiedź jest przemyślana, empatyczna i buduje zaufanie kolejnych czytających - nawet gdy opinia jest niesprawiedliwa." },
      { title: "Monitoring nowych opinii na bieżąco", text: "Wiesz o każdej nowej opinii od razu, zamiast dowiadywać się przypadkiem tygodnie później." },
    ],
    faq: [
      { q: "Czy można kupić fałszywe opinie?", a: "Nie oferujemy tego i odradzamy - Google aktywnie wykrywa i karze fałszywe opinie, a wykrycie może skutkować zawieszeniem całej wizytówki." },
      { q: "Jak szybko trzeba odpowiadać na negatywne opinie?", a: "Idealnie w ciągu 24-48 godzin - szybka reakcja pokazuje, że firma traktuje feedback poważnie, nawet jeśli sama sytuacja jest trudna." },
      { q: "Czy da się usunąć nieprawdziwą opinię?", a: "Można zgłosić ją do Google jako naruszającą zasady (spam, fałszywe treści) - decyzja należy do Google i nie zawsze kończy się usunięciem, dlatego profesjonalna odpowiedź jest zabezpieczeniem niezależnie od wyniku zgłoszenia." },
    ],
  },
  {
    slug: "ai-dla-google-maps",
    name: "AI dla Google Maps",
    title: "AI dla Google Maps - Automatyczne Odpowiedzi i Posty | Lokalny Puls",
    metaDescription: "Sztuczna inteligencja wspierająca zarządzanie wizytówką Google - gotowe odpowiedzi na opinie, generator postów, codzienne wskazówki.",
    h1: "AI dla Google Maps - Sztuczna Inteligencja Jako Twój Asystent Widoczności",
    intro: "AI nie zastępuje Twojej decyzji - przygotowuje gotową robotę, którą Ty zatwierdzasz jednym kliknięciem. Gotowa odpowiedź na opinię, gotowy post na wizytówkę, codzienna wskazówka co poprawić - wszystko wygenerowane w kilka sekund, zawsze do Twojej akceptacji przed publikacją.",
    benefits: [
      { title: "Gotowa odpowiedź na opinię w kilka sekund", text: "Zamiast zastanawiać się co napisać, dostajesz gotową, profesjonalną treść dopasowaną do tonu opinii - akceptujesz albo edytujesz." },
      { title: "Generator postów bez pisania od zera", text: "Podajesz temat (promocja, nowość, sezon), AI pisze gotowy post - publikujesz jednym kliknięciem." },
      { title: "Codzienne wskazówki dopasowane do Twojej firmy", text: "AI analizuje stan Twojej wizytówki i podpowiada konkretne działanie na dziś, zamiast zostawiać Cię z pytaniem \"od czego zacząć\"." },
    ],
    faq: [
      { q: "Czy AI publikuje treści automatycznie, bez mojej zgody?", a: "Nie - każda odpowiedź i każdy post wymaga Twojego zatwierdzenia przed publikacją. AI przygotowuje, Ty decydujesz." },
      { q: "Czy odpowiedzi AI brzmią jak bot?", a: "Model jest dopasowany do tonu konkretnej opinii (przepraszający, entuzjastyczny, rzeczowy) i pisze po polsku w naturalny sposób - zawsze możesz też edytować treść przed publikacją." },
      { q: "Jaki model AI jest wykorzystywany?", a: "Wykorzystujemy nowoczesne modele językowe wyspecjalizowane w krótkich, naturalnie brzmiących odpowiedziach w języku polskim." },
    ],
  },
  {
    slug: "usuwanie-spamu",
    name: "Usuwanie Spamu z Wizytówki",
    title: "Usuwanie Spamu i Fałszywych Opinii z Google Maps | Lokalny Puls",
    metaDescription: "Zgłaszanie i usuwanie fałszywych opinii, spamu konkurencji oraz nieprawidłowych wpisów na Twojej wizytówce Google Maps.",
    h1: "Usuwanie Spamu z Wizytówki - Ochrona Przed Nieuczciwą Konkurencją",
    intro: "Fałszywe opinie od konkurencji, spam w sekcji zdjęć, nieprawidłowe dane dodane przez osoby trzecie - Google Maps to otwarta platforma, którą da się nadużyć. Identyfikujemy takie treści, zgłaszamy je zgodnie z procedurami Google i pilnujemy, żeby Twoja wizytówka odzwierciedlała rzeczywistość, nie manipulacje.",
    benefits: [
      { title: "Identyfikacja fałszywych opinii i wzorców spamu", text: "Rozpoznajemy typowe sygnały nieuczciwych opinii (brak historii konta, wzorce czasowe, brak realnego kontaktu z firmą)." },
      { title: "Prawidłowo złożone zgłoszenia do Google", text: "Zgłoszenie złożone z odpowiednim uzasadnieniem i dokumentacją ma realnie większą szansę powodzenia niż przypadkowe kliknięcie \"zgłoś\"." },
      { title: "Bieżący monitoring nowych zagrożeń", text: "Sprawdzamy wizytówkę regularnie, żeby wyłapać nowy spam zanim wyrządzi realną szkodę wizerunkową." },
    ],
    faq: [
      { q: "Czy mogę udowodnić, że opinia jest fałszywa?", a: "Nie zawsze da się to udowodnić w 100%, ale wzorce (np. konto założone tego samego dnia, brak innej aktywności) są mocnym argumentem w zgłoszeniu do Google." },
      { q: "Ile trwa rozpatrzenie zgłoszenia przez Google?", a: "Zwykle 3-7 dni roboczych, czasem dłużej przy bardziej złożonych przypadkach wymagających dodatkowej weryfikacji." },
      { q: "Co jeśli Google odrzuci zgłoszenie?", a: "Wtedy rekomendujemy profesjonalną, publiczną odpowiedź na sporną opinię - to zabezpiecza wizerunek niezależnie od decyzji Google." },
    ],
  },
  {
    slug: "zdjecia-google",
    name: "Zdjęcia do Wizytówki Google",
    title: "Profesjonalne Zdjęcia do Wizytówki Google Maps | Lokalny Puls",
    metaDescription: "Dodawanie i optymalizacja zdjęć w wizytówce Google Maps - wnętrze, produkty, zespół. Więcej zdjęć = więcej kliknięć i telefonów.",
    h1: "Zdjęcia do Wizytówki Google - Pierwsze Wrażenie Zanim Klient Wejdzie",
    intro: "Wizytówki z co najmniej 5 zdjęciami dostają średnio 35% więcej kliknięć niż te bez zdjęć - dla restauracji i branży beauty ta liczba jest jeszcze wyższa. Pomagamy dobrać, przygotować i dodać zdjęcia, które realnie sprzedają Twoją firmę, zanim klient jeszcze przez nią przejdzie.",
    benefits: [
      { title: "Dobór odpowiednich kategorii zdjęć", text: "Logo, wnętrze, produkty/usługi, zespół, budynek z zewnątrz - kompletny zestaw, który buduje pełny obraz firmy." },
      { title: "Optymalizacja jakości i formatu", text: "Zdjęcia w odpowiedniej rozdzielczości i kadrze wyglądają profesjonalnie zamiast amatorsko, nawet zrobione telefonem." },
      { title: "Regularne odświeżanie galerii", text: "Aktualne zdjęcia sygnalizują Google i klientom, że firma jest aktywna - to wpływa zarówno na zaufanie, jak i pozycję w wynikach." },
    ],
    faq: [
      { q: "Czy potrzebuję profesjonalnego fotografa?", a: "Nie zawsze - dobry telefon, naturalne światło dzienne i kilka prostych zasad kompozycji często wystarczą. Pomagamy dobrać, co warto sfotografować i jak." },
      { q: "Ile zdjęć powinna mieć wizytówka?", a: "Optymalnie 10-15 zdjęć, regularnie odświeżanych - zbyt mało wygląda na zaniedbaną wizytówkę, zbyt wiele bez porządku utrudnia przeglądanie." },
      { q: "Czy mogę usunąć stare, nieaktualne zdjęcia?", a: "Tak, możesz usuwać własne zdjęcia, ale zdjęcia dodane przez klientów wymagają osobnego zgłoszenia do Google, jeśli są nieaktualne lub wprowadzające w błąd." },
    ],
  },
  {
    slug: "audyt-wizytowki",
    name: "Audyt Wizytówki Google",
    title: "Darmowy Audyt Wizytówki Google - Sprawdź Swoje Błędy | Lokalny Puls",
    metaDescription: "Bezpłatny audyt wizytówki Google Business Profile - sprawdzamy kompletność, błędy, konkurencję. Konkretny raport w 48h.",
    h1: "Audyt Wizytówki Google - Poznaj Dokładnie Co Cię Kosztuje",
    intro: "Zanim cokolwiek zoptymalizujemy, sprawdzamy dokładnie gdzie jesteś dziś: co jest źle skonfigurowane, czego brakuje, jak wypadasz na tle konkurencji w Twojej okolicy. Audyt kończy się konkretnym raportem z priorytetową listą działań, nie ogólnikami.",
    benefits: [
      { title: "Pełna lista błędów i braków", text: "Każdy element wizytówki sprawdzony osobno - kategoria, opis, zdjęcia, opinie, godziny, atrybuty." },
      { title: "Analiza porównawcza z konkurencją", text: "Widzisz dokładnie co robią lepiej wypozycjonowani konkurenci w Twojej branży i mieście." },
      { title: "Priorytetowa lista działań, nie ogólniki", text: "Raport mówi konkretnie co zrobić najpierw, a co może poczekać - zamiast listy 50 rzeczy bez hierarchii ważności." },
    ],
    faq: [
      { q: "Czy audyt jest naprawdę darmowy?", a: "Tak, podstawowy audyt (formularz + raport) jest bezpłatny - płatna jest dopiero realizacja rekomendowanych zmian, jeśli się na to zdecydujesz." },
      { q: "Jak długo czekam na wyniki audytu?", a: "Raport trafia na Twój email zwykle w ciągu kilku godzin od wypełnienia formularza, maksymalnie following business day." },
      { q: "Co jeśli audyt wykaże, że wizytówka jest już dobrze zoptymalizowana?", a: "Wtedy szczerze to napiszemy i podpowiemy jedynie drobne usprawnienia - nie sprzedajemy usług, których realnie nie potrzebujesz." },
    ],
  },
  {
    slug: "monitoring-opinii",
    name: "Monitoring Opinii i Wizytówki",
    title: "Monitoring Opinii Google - Bądź Pierwszy, Nie Ostatni | Lokalny Puls",
    metaDescription: "Stały monitoring wizytówki Google - nowe opinie, zmiany oceny, aktywność konkurencji. Powiadomienia w czasie rzeczywistym.",
    h1: "Monitoring Opinii - Wiesz Pierwszy, Zanim Zauważy Konkurencja",
    intro: "Nowa opinia, spadek średniej oceny, zmiana w danych wizytówki - monitorujemy to wszystko na bieżąco, żebyś nie dowiadywał się o problemach przypadkiem tygodnie później. Powiadomienie trafia do Ciebie od razu, z gotową sugestią co zrobić dalej.",
    benefits: [
      { title: "Natychmiastowe powiadomienia o nowych opiniach", text: "Reagujesz w ciągu godzin, nie tygodni - to robi realną różnicę w tym, jak firma jest postrzegana." },
      { title: "Alert przy spadku średniej oceny", text: "Widzisz problem zanim urośnie - jedna zła opinia to normalność, seria bez reakcji to już sygnał ostrzegawczy." },
      { title: "Cotygodniowe podsumowanie w jednym miejscu", text: "Zamiast sprawdzać wizytówkę codziennie samodzielnie, dostajesz zwięzłe podsumowanie tego, co ważne." },
    ],
    faq: [
      { q: "Jak szybko dostanę powiadomienie o nowej opinii?", a: "Monitoring działa w cyklu kilkugodzinnym - realnie dowiadujesz się tego samego dnia, w którym opinia się pojawiła." },
      { q: "Czy monitoring obejmuje też zdjęcia dodawane przez klientów?", a: "Tak, śledzimy również nowe zdjęcia i pytania zadawane w sekcji Q&A wizytówki." },
      { q: "Czy dostanę powiadomienie o działaniach konkurencji?", a: "W ramach analizy okresowej pokazujemy zmiany u głównych konkurentów (np. wzrost liczby opinii), nie jest to jednak monitoring w czasie rzeczywistym cudzych wizytówek." },
    ],
  },
  {
    slug: "generator-postow-google",
    name: "Generator Postów Google",
    title: "Generator Postów Google Business Profile - AI | Lokalny Puls",
    metaDescription: "Automatyczne generowanie gotowych postów na wizytówkę Google Business Profile za pomocą AI - promocje, nowości, wydarzenia.",
    h1: "Generator Postów Google - Gotowa Treść w Minutę",
    intro: "Regularne posty na wizytówce Google to sygnał aktywności, który Google premiuje w wynikach lokalnych - problem w tym, że mało kto ma czas je pisać regularnie. Podajesz temat, AI generuje gotowy post dopasowany do Twojej branży - publikujesz jednym kliknięciem.",
    benefits: [
      { title: "Gotowa treść bez zastanawiania się od czego zacząć", text: "Temat + branża wystarczą, żeby dostać gotowy, naturalnie brzmiący post po polsku." },
      { title: "Regularna aktywność bez codziennego wysiłku", text: "Zamiast poświęcać czas na pisanie, poświęcasz go na wybór tematu - reszta dzieje się w kilkanaście sekund." },
      { title: "Sugestia typu zdjęcia do posta", text: "AI podpowiada nie tylko treść, ale też jakie zdjęcie najlepiej się do niej doda." },
    ],
    faq: [
      { q: "Czy post jest publikowany automatycznie?", a: "Nie, zawsze widzisz gotową treść przed publikacją i decydujesz czy ją zaakceptować, edytować, czy wygenerować ponownie." },
      { q: "Jak często warto publikować posty?", a: "Optymalnie raz w tygodniu - to częstotliwość, która buduje sygnał aktywności bez nadmiernego wysiłku po Twojej stronie." },
      { q: "Czy mogę zasugerować własny temat posta?", a: "Tak, to właśnie jest punkt wyjścia - wpisujesz temat lub okazję (np. \"promocja weekendowa\"), a AI buduje wokół niego gotową treść." },
    ],
  },
  {
    slug: "marketing-lokalny",
    name: "Marketing Lokalny",
    title: "Marketing Lokalny dla Małych Firm - Kompleksowa Widoczność | Lokalny Puls",
    metaDescription: "Kompleksowy marketing lokalny dla małych i średnich firm - Google Maps, opinie, widoczność w wynikach \"w pobliżu\". Agencja + narzędzie SaaS.",
    h1: "Marketing Lokalny - Widoczność Tam, Gdzie Klienci Faktycznie Szukają",
    intro: "Marketing lokalny to nie billboard ani ulotki - to bycie widocznym dokładnie w momencie, gdy ktoś w Twojej okolicy szuka usługi, którą oferujesz. Łączymy jednorazową optymalizację z narzędziem do codziennego utrzymania widoczności - tak, żeby efekt nie zniknął po miesiącu.",
    benefits: [
      { title: "Podejście całościowe, nie pojedyncza funkcja", text: "Wizytówka, opinie, zdjęcia, posty, monitoring - wszystkie elementy wpływają na siebie nawzajem, dlatego pracujemy nad nimi razem." },
      { title: "Lokalna znajomość rynku Małopolski i Śląska", text: "Rozumiemy specyfikę lokalnej konkurencji w miastach, w których działamy, nie tylko ogólne zasady SEO." },
      { title: "Model dopasowany do budżetu - jednorazowo lub w abonamencie", text: "Możesz zamówić jednorazową naprawę wizytówki albo stałe narzędzie utrzymujące widoczność - Ty wybierasz." },
    ],
    faq: [
      { q: "Czym różni się marketing lokalny od zwykłego SEO strony internetowej?", a: "SEO strony dotyczy pozycji w wynikach wyszukiwania Google poza mapami - marketing lokalny skupia się na Google Maps i lokalnych wynikach \"w pobliżu\", gdzie rządzą inne czynniki rankingowe." },
      { q: "Czy potrzebuję też własnej strony internetowej?", a: "Nie jest to konieczne na start - wiele małych firm zdobywa większość klientów wyłącznie przez dobrze zoptymalizowaną wizytówkę Google, bez osobnej strony WWW." },
      { q: "Jak szybko zobaczę efekty marketingu lokalnego?", a: "Pierwsze zmiany w widoczności pojawiają się po 1-2 tygodniach, pełny efekt (stała, wysoka pozycja) buduje się przez 1-3 miesiące regularnych działań." },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
