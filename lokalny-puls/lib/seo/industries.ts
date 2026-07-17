export type Industry = {
  slug: string;
  name: string; // "mechanik"
  namePlural: string; // "warsztaty samochodowe"
  suffix: "google-maps" | "google-opinie" | "google-business"; // dopasowane do przykładów z briefu
  heroOpenings: string[]; // 3 warianty otwarcia hero, wybierane deterministycznie per miasto
  painPoints: { title: string; text: string }[]; // unikalne dla branży
  benefits: { title: string; text: string }[];
  faq: { q: string; a: string }[]; // {city} zostanie podmienione w runtime
  relatedServiceSlug: string; // link do konkretnej strony usługi (linkowanie wewnętrzne)
};

/**
 * KLUCZOWE dla unikalności treści: każda branża ma WŁASNE pain points, benefity
 * i FAQ - nie są to warianty jednego uniwersalnego szablonu z podmienioną nazwą
 * branży. To jest różnica między "thin content" a realną wartością dla czytelnika.
 */
export const INDUSTRIES: Industry[] = [
  {
    slug: "mechanik",
    name: "mechanik",
    namePlural: "warsztaty samochodowe",
    suffix: "google-maps",
    heroOpenings: [
      "Klient szuka mechanika {city_loc} i trafia na warsztat obok, nie na Twój.",
      "Silnik stuka, klient w panice wpisuje \"mechanik {city_loc}\" - kto się pokaże pierwszy?",
      "Auto się zepsuło, telefon w ręku, Google Maps otwarte - a Twój warsztat nigdzie nie widać.",
    ],
    painPoints: [
      { title: "Zero zdjęć warsztatu", text: "Klient nie widzi ani podnośnika, ani narzędzi, ani samochodów w naprawie - wybiera warsztat, który mu to pokazał." },
      { title: "Brak opinii od stałych klientów", text: "Masz klientów od lat, ale nikt z nich nie zostawił opinii - nowi klienci widzą pustą wizytówkę i jadą dalej." },
      { title: "Nazwa i kategoria źle ustawione", text: "Google nie wie czy naprawiasz wszystkie marki, czy tylko diesle, czy robisz też wulkanizację - i pokazuje Cię rzadziej." },
    ],
    benefits: [
      { title: "Wyższa pozycja w \"warsztaty w pobliżu\"", text: "Kompletna wizytówka z odpowiednimi kategoriami pojawia się częściej w wynikach lokalnych." },
      { title: "Telefon zamiast przejeżdżania obok", text: "Klient z awarią dzwoni do pierwszego widocznego warsztatu - chcemy, żeby to był Twój numer." },
      { title: "Opinie budują zaufanie do nieznanego mechanika", text: "Ludzie nie ufają warsztatom - opinie 4.5+ z konkretami (\"uczciwa wycena\", \"nie naciągają\") to przewaga." },
    ],
    faq: [
      { q: "Czy to zadziała dla małego, jednoosobowego warsztatu {city_loc}?", a: "Tak - małe warsztaty zyskują najwięcej, bo konkurencja często ma równie zaniedbaną wizytówkę. Wystarczy być lepiej zoptymalizowanym niż sąsiedzi." },
      { q: "Ile zdjęć warsztatu powinienem dodać?", a: "Minimum 8-10: podnośnik, narzędzia, przed/po naprawy (za zgodą klienta), zespół, wejście do warsztatu - żeby klient rozpoznał miejsce z ulicy." },
      { q: "Co jeśli mam już kilka negatywnych opinii?", a: "Odpowiadamy na nie profesjonalnie i wdrażamy system zbierania nowych opinii od zadowolonych klientów - jedna zła opinia z 30 dobrymi nie odstrasza, bez kontekstu odstrasza bardzo." },
    ],
    relatedServiceSlug: "zarzadzanie-opiniami",
  },
  {
    slug: "fryzjer",
    name: "fryzjer",
    namePlural: "salony fryzjerskie",
    suffix: "google-maps",
    heroOpenings: [
      "Nowa klientka szuka fryzjera {city_loc} - przewija zdjęcia salonów, nie czyta opisów.",
      "\"Fryzjer {city_loc}\" wpisany w Google - a Twój salon jest na drugiej stronie wyników.",
      "Klientka wybiera salon po zdjęciach fryzur, nie po cenie - a Twoja wizytówka jest pusta.",
    ],
    painPoints: [
      { title: "Brak zdjęć wykonanych fryzur", text: "Salony ze zdjęciami portfolio przyciągają wzrok - bez nich wyglądasz jak każdy inny salon w okolicy." },
      { title: "Nieaktualne godziny otwarcia", text: "Klientka przychodzi po godzinach bo Google pokazuje stare dane - i już nie wraca." },
      { title: "Brak informacji o cenniku", text: "Bez orientacyjnych cen klientka woli zadzwonić do salonu, który je pokazuje - mniej niepewności, więcej rezerwacji." },
    ],
    benefits: [
      { title: "Portfolio jako magnes na nowe klientki", text: "10-15 zdjęć fryzur w wizytówce działa jak darmowa reklama wizualna 24/7." },
      { title: "Więcej rezerwacji przez telefon i online", text: "Kompletna, aktualna wizytówka konwertuje przeglądających w umówione wizyty." },
      { title: "Opinie o konkretnych fryzjerkach/fryzjerach", text: "Klientki wracają do konkretnej osoby - opinie z imionami budują lojalność zespołu." },
    ],
    faq: [
      { q: "Jakie zdjęcia najlepiej działają w wizytówce salonu {city_loc}?", a: "Zdjęcia przed/po (za zgodą klientki), wnętrze salonu, zespół przy pracy - unikaj stockowych zdjęć z internetu, klientki je rozpoznają i tracą zaufanie." },
      { q: "Czy warto dodawać cennik do wizytówki?", a: "Tak, nawet orientacyjny \"od-do\" - znacznie zmniejsza liczbę telefonów \"ile kosztuje\" i zwiększa liczbę od razu umówionych wizyt." },
      { q: "Jak zachęcić klientki do zostawienia opinii?", a: "Link do opinii wysłany SMS-em dzień po wizycie działa najlepiej - świeże wrażenie, jeszcze niezapomniane." },
    ],
    relatedServiceSlug: "zdjecia-google",
  },
  {
    slug: "restauracja",
    name: "restauracja",
    namePlural: "restauracje",
    suffix: "google-opinie",
    heroOpenings: [
      "Głodny klient {city_loc} przegląda restauracje w Google Maps - decyduje w 15 sekund po zdjęciach i ocenie.",
      "\"Restauracja {city_loc}\" - trzy pierwsze wyniki dostają 80% rezerwacji. Który jesteś numerem?",
      "Piątkowy wieczór, klient szuka gdzie zjeść {city_loc} - Twoja karta dań nie jest nawet w Google.",
    ],
    painPoints: [
      { title: "Zdjęcia dań słabej jakości lub ich brak", text: "Restauracje bez profesjonalnych zdjęć jedzenia tracą nawet połowę potencjalnych rezerwacji - ludzie jedzą oczami, zanim jeszcze wejdą do środka." },
      { title: "Nieaktualne menu w Google", text: "Klient szuka konkretnego dania, nie widzi go w wizytówce, wybiera konkurencję - mimo że danie jest w Twojej karcie." },
      { title: "Negatywne opinie bez odpowiedzi", text: "Restauracja z nieodpowiedzianą złą opinią sprzed miesięcy wygląda jak zaniedbana - nawet jeśli jedzenie jest świetne." },
    ],
    benefits: [
      { title: "Zdjęcia dań zwiększają rezerwacje", text: "Restauracje z 10+ dobrymi zdjęciami dań notują wyraźnie więcej kliknięć \"zarezerwuj\" i \"zadzwoń\"." },
      { title: "Aktualne menu = mniej pustych stolików", text: "Klienci szukający konkretnego dania trafiają na Twoją restaurację, nie na tę obok." },
      { title: "Profesjonalne odpowiedzi na opinie budują zaufanie", text: "Nawet trudna opinia, na którą odpowiadasz kulturalnie, działa na Twoją korzyść w oczach kolejnych czytających." },
    ],
    faq: [
      { q: "Jak często aktualizować zdjęcia dań w wizytówce {city_loc}?", a: "Przy zmianie karty sezonowej (2-4 razy w roku) plus dodatkowo przy nowościach - stałe zdjęcie tego samego dania przez 3 lata sugeruje, że nic się nie zmienia." },
      { q: "Czy odpowiadać na każdą opinię, nawet 5-gwiazdkową?", a: "Nie jest to konieczne, ale krótkie podziękowanie zajmuje 10 sekund i pokazuje aktywność - Google też to zauważa i premiuje w wynikach." },
      { q: "Co zrobić z nieprawdziwą negatywną opinią?", a: "Można zgłosić ją do Google jako naruszającą zasady, ale niezależnie od wyniku warto odpowiedzieć rzeczowo - czytelnicy sami ocenią wiarygodność." },
    ],
    relatedServiceSlug: "zdjecia-google",
  },
  {
    slug: "stomatolog",
    name: "stomatolog",
    namePlural: "gabinety stomatologiczne",
    suffix: "google-business",
    heroOpenings: [
      "Ból zęba nie czeka - pacjent {city_loc} szuka stomatologa \"teraz\", nie \"może kiedyś\".",
      "Nowy pacjent sprawdza opinie o stomatologu {city_loc} zanim jeszcze zadzwoni - to naturalne, chodzi o zdrowie.",
      "\"Stomatolog {city_loc} przyjmuje dziś\" - jeśli Twoja wizytówka nie mówi jasno o dostępności, pacjent dzwoni gdzie indziej.",
    ],
    painPoints: [
      { title: "Brak jasnej informacji o przyjmowanych przypadkach", text: "Pacjent nie wie czy leczysz też dzieci, czy robisz protetykę, czy tylko przeglądy - dzwoni tam, gdzie to jasno napisane." },
      { title: "Obawa przed nieznanym gabinetem", text: "Zabiegi stomatologiczne budzą stres - pacjent szuka potwierdzenia w opiniach zanim w ogóle rozważy wizytę." },
      { title: "Konkurencja z sieciowymi gabinetami", text: "Duże sieci mają budżety marketingowe - lokalny gabinet wygrywa autentycznością wizytówki, jeśli jest kompletna i aktualna." },
    ],
    benefits: [
      { title: "Zaufanie budowane przed pierwszą wizytą", text: "Kompletna wizytówka z opiniami realnych pacjentów obniża stres związany z wyborem nowego stomatologa." },
      { title: "Jasność oferty = mniej niepotrzebnych telefonów", text: "Opisana specjalizacja (dzieci, protetyka, chirurgia) trafia do właściwych pacjentów od razu." },
      { title: "Wyższa pozycja wobec sieciowych konkurentów", text: "Lokalna, dobrze zoptymalizowana wizytówka potrafi wyprzedzić w mapach większe sieci gabinetów." },
    ],
    faq: [
      { q: "Czy warto pokazywać zdjęcia wnętrza gabinetu {city_loc}?", a: "Tak - zdjęcia czystego, nowoczesnego gabinetu realnie obniżają stres pacjenta przed pierwszą wizytą i zwiększają liczbę umówionych konsultacji." },
      { q: "Jak reagować na opinie dotyczące bólu lub dyskomfortu zabiegu?", a: "Odpowiadaj empatycznie i rzeczowo, bez umniejszania odczuć pacjenta - to buduje wiarygodność bardziej niż całkowity brak takich opinii." },
      { q: "Czy dane medyczne pacjenta mogą pojawić się w publicznej odpowiedzi?", a: "Nigdy - odpowiedzi na opinie muszą być ogólne, bez odnoszenia się do konkretnego leczenia, żeby nie naruszyć tajemnicy lekarskiej." },
    ],
    relatedServiceSlug: "audyt-wizytowki",
  },
  {
    slug: "hotel",
    name: "hotel",
    namePlural: "hotele i pensjonaty",
    suffix: "google-opinie",
    heroOpenings: [
      "Turysta planujący wyjazd {city_loc} czyta 20+ opinii przed rezerwacją - Twoje ostatnie 3 są sprzed roku.",
      "\"Nocleg {city_loc}\" - zdjęcia pokoju decydują szybciej niż opis oferty.",
      "Rezerwacja last-minute {city_loc} - kto ma najlepszą wizytówkę Google, ten ma gościa dziś wieczorem.",
    ],
    painPoints: [
      { title: "Stare zdjęcia pokoi", text: "Zdjęcia sprzed remontu albo w złej jakości sprawiają, że gość rezerwuje konkurencyjny obiekt, mimo że Twój jest lepszy." },
      { title: "Brak odpowiedzi na opinie sezonowe", text: "Skargi z wysokiego sezonu (hałas, tłok) bez odpowiedzi wyglądają na ignorowanie gości - a to odstrasza kolejnych rezerwujących." },
      { title: "Niejasna informacja o udogodnieniach", text: "Gość szuka konkretnie \"parking\", \"śniadanie w cenie\", \"pokoje dla rodzin\" - brak tych informacji w wizytówce = rezerwacja gdzie indziej." },
    ],
    benefits: [
      { title: "Aktualne zdjęcia zwiększają liczbę rezerwacji bezpośrednich", text: "Gość rezerwujący przez telefon czy stronę zamiast platformy rezerwacyjnej to zero prowizji dla pośrednika." },
      { title: "Odpowiedzi na opinie pokazują profesjonalizm", text: "Nawet trudna opinia z sezonu, na którą odpowiadasz konkretnie, buduje zaufanie kolejnych gości." },
      { title: "Kompletne udogodnienia trafiają do właściwych gości", text: "Rodziny, pary, biznesmeni - każdy szuka czego innego, kompletna wizytówka filtruje odpowiednich gości." },
    ],
    faq: [
      { q: "Jak często aktualizować zdjęcia obiektu {city_loc}?", a: "Przynajmniej raz w roku oraz po każdym remoncie czy zmianie wystroju - nieaktualne zdjęcia to jedna z głównych przyczyn rozczarowania gości na miejscu." },
      { q: "Czy odpowiadać na opinie napisane w innym języku?", a: "Tak, warto odpowiedzieć w tym samym języku (lub dwujęzycznie) - pokazuje to gościom zagranicznym, że są mile widziani." },
      { q: "Co zrobić z sezonowym spadkiem oceny (hałas, remont sąsiada)?", a: "Wyjaśnij kontekst w odpowiedzi na opinię - przyszli goście doceniają szczerość bardziej niż milczenie." },
    ],
    relatedServiceSlug: "monitoring-opinii",
  },
  {
    slug: "salon-kosmetyczny",
    name: "salon kosmetyczny",
    namePlural: "salony kosmetyczne",
    suffix: "google-maps",
    heroOpenings: [
      "Klientka szuka \"salon kosmetyczny {city_loc}\" wieczorem, planując wizytę na jutro - Twoja wizytówka musi przekonać ją w kilka sekund.",
      "Zabiegi na twarz to zaufanie - klientka {city_loc} sprawdza zdjęcia efektów, zanim umówi wizytę.",
      "\"Manicure {city_loc}\" - setki wyników, a wygrywają te z najlepszymi zdjęciami paznokci.",
    ],
    painPoints: [
      { title: "Brak zdjęć efektów zabiegów", text: "Salon bez zdjęć \"przed/po\" wygląda anonimowo - klientka nie wie czego się spodziewać po konkretnej usłudze." },
      { title: "Niekompletna lista usług", text: "Jeśli w wizytówce nie ma \"laminacja brwi\" czy \"pedicure hybrydowy\", klientka szukająca akurat tego przechodzi obok." },
      { title: "Brak reakcji na opinie o terminach", text: "Skargi o długim oczekiwaniu na wizytę bez odpowiedzi sugerują chaos organizacyjny, nawet gdy jakość usług jest świetna." },
    ],
    benefits: [
      { title: "Zdjęcia efektów budują zaufanie do konkretnej usługi", text: "Klientka widząca realny efekt manicure czy makijażu decyduje się szybciej i pewniej." },
      { title: "Kompletna lista usług trafia do szukających konkretnie", text: "Google pokazuje Twój salon dokładnie wtedy, gdy ktoś szuka usługi, którą realnie oferujesz." },
      { title: "Profesjonalne zarządzanie opiniami buduje markę", text: "Salon aktywnie odpowiadający na opinie wygląda na dobrze zorganizowany i godny zaufania." },
    ],
    faq: [
      { q: "Czy warto publikować zdjęcia \"przed/po\" klientek {city_loc}?", a: "Tak, za wyraźną zgodą klientki - to jeden z najskuteczniejszych typów treści w branży beauty, znacznie zwiększa konwersję przeglądających w umówione wizyty." },
      { q: "Jak opisać ofertę, żeby pojawiać się w wielu wyszukiwaniach?", a: "Wymień każdą usługę osobno w opisie i kategoriach (manicure, pedicure, henna, laminacja) zamiast ogólnego \"zabiegi kosmetyczne\" - Google dopasowuje trafniej." },
      { q: "Co zrobić z opinią o zbyt długim oczekiwaniu na wizytę?", a: "Odpowiedz konkretnie - np. informując o wprowadzeniu systemu rezerwacji online - to zamienia skargę w dowód, że firma się rozwija." },
    ],
    relatedServiceSlug: "zdjecia-google",
  },
  {
    slug: "prawnik",
    name: "prawnik",
    namePlural: "kancelarie prawne",
    suffix: "google-business",
    heroOpenings: [
      "Klient ze sprawą sądową szuka prawnika {city_loc} zdenerwowany i w pośpiechu - pierwsza wizytówka, którą zrozumie, wygrywa.",
      "\"Prawnik {city_loc} sprawy rozwodowe\" - specjalizacja w opisie wizytówki to różnica między telefonem a przewinięciem dalej.",
      "Zaufanie do prawnika buduje się przed pierwszym kontaktem - w opiniach Google, nie w rozmowie.",
    ],
    painPoints: [
      { title: "Brak jasnej specjalizacji w opisie", text: "Ogólne \"kancelaria prawna\" nie mówi klientowi czy pomagasz w sprawach rozwodowych, spadkowych czy gospodarczych - trafiają do kogoś, kto to napisał." },
      { title: "Zero opinii przy wrażliwych sprawach", text: "Sprawy prawne to stres - klient szuka potwierdzenia w opiniach innych, zanim zaufa nieznanej kancelarii." },
      { title: "Nieaktualne dane kontaktowe", text: "Klient w pilnej sprawie dzwoni pod nieaktualny numer i trafia do konkurencji, która ma to poprawione." },
    ],
    benefits: [
      { title: "Jasna specjalizacja trafia do właściwych klientów", text: "Opis z konkretnymi obszarami prawa (rodzinne, gospodarcze, karne) filtruje zapytania trafniej niż ogólna nazwa kancelarii." },
      { title: "Opinie obniżają barierę pierwszego kontaktu", text: "Nawet kilka rzeczowych opinii znacząco zwiększa liczbę telefonów od nowych klientów w trudnych sprawach." },
      { title: "Aktualna wizytówka = mniej straconych pilnych spraw", text: "Poprawne dane kontaktowe i godziny oznaczają, że pilne sprawy trafiają do Ciebie, nie do konkurencji." },
    ],
    faq: [
      { q: "Czy klienci kancelarii {city_loc} w ogóle zostawiają opinie w Google?", a: "Tak, coraz częściej - szczególnie po sprawach spadkowych czy rozwodowych, gdzie klient docenia wsparcie w trudnym momencie. Warto delikatnie o to poprosić po zakończeniu sprawy." },
      { q: "Jak opisać specjalizację, nie łamiąc zasad etyki zawodowej?", a: "Opis obszarów praktyki (prawo rodzinne, gospodarcze) jest w pełni zgodny z zasadami - unikaj jedynie konkretnych obietnic wyniku sprawy." },
      { q: "Co jeśli klient zostawi opinię ujawniającą szczegóły sprawy?", a: "Warto grzecznie poprosić o edycję opinii bez szczegółów sprawy - ochrona poufności klienta jest ważniejsza niż sama opinia." },
    ],
    relatedServiceSlug: "audyt-wizytowki",
  },
  {
    slug: "fizjoterapeuta",
    name: "fizjoterapeuta",
    namePlural: "gabinety fizjoterapii",
    suffix: "google-maps",
    heroOpenings: [
      "Ból pleców {city_loc} - pacjent szuka fizjoterapeuty, który \"ma dobre opinie\", nie \"jest najbliżej\".",
      "\"Fizjoterapia {city_loc}\" po kontuzji sportowej - specjalizacja w wizytówce decyduje o wyborze.",
      "Rehabilitacja to zaufanie na tygodnie współpracy - pacjent sprawdza opinie zanim umówi pierwszą wizytę.",
    ],
    painPoints: [
      { title: "Brak informacji o metodach terapii", text: "Pacjent szukający konkretnie terapii manualnej czy kinesiotapingu nie znajduje tej informacji i wybiera gabinet, który to opisał." },
      { title: "Zero zdjęć gabinetu i sprzętu", text: "Nowoczesny sprzęt rehabilitacyjny to argument sprzedażowy - bez zdjęć nikt o nim nie wie." },
      { title: "Brak opinii o konkretnych terapeutach", text: "Pacjenci wracają do sprawdzonej osoby - opinie z imionami fizjoterapeutów budują długoterminową lojalność." },
    ],
    benefits: [
      { title: "Opisane metody terapii trafiają do właściwych pacjentów", text: "Kompletna lista usług (terapia manualna, rehabilitacja pooperacyjna, sport) przyciąga trafniejsze zapytania." },
      { title: "Zdjęcia sprzętu budują wrażenie profesjonalizmu", text: "Nowoczesny gabinet pokazany na zdjęciach zwiększa zaufanie przed pierwszą wizytą." },
      { title: "Opinie skracają proces decyzyjny pacjenta", text: "Rehabilitacja to zobowiązanie na tygodnie - dobre opinie realnie skracają czas namysłu przed rezerwacją." },
    ],
    faq: [
      { q: "Czy warto opisywać konkretne kontuzje, w których gabinet {city_loc} się specjalizuje?", a: "Zdecydowanie tak - \"rehabilitacja po kontuzji kolana\", \"fizjoterapia sportowa\" to frazy, których ludzie realnie szukają w Google." },
      { q: "Jak zbierać opinie od pacjentów w trakcie długiej terapii?", a: "Najlepiej poprosić po zakończeniu cyklu zabiegów, gdy pacjent widzi już realny efekt i jest najbardziej skłonny podzielić się opinią." },
      { q: "Czy zdjęcia pacjentów podczas zabiegów są dobrym pomysłem?", a: "Tylko za wyraźną, pisemną zgodą - w praktyce lepiej sprawdzają się zdjęcia samego gabinetu i sprzętu bez wizerunku pacjentów." },
    ],
    relatedServiceSlug: "audyt-wizytowki",
  },
  {
    slug: "kawiarnia",
    name: "kawiarnia",
    namePlural: "kawiarnie",
    suffix: "google-opinie",
    heroOpenings: [
      "Sobotni poranek {city_loc}, ktoś szuka \"kawiarnia w pobliżu\" - zdjęcia wnętrza decydują, gdzie usiądzie.",
      "\"Kawiarnia z dobrą kawą {city_loc}\" - jeśli nie masz zdjęć latte art, przechodzą obok.",
      "Praca zdalna z laptopem {city_loc} - klient szuka kawiarni z Wi-Fi i klimatem, nie tylko z kawą.",
    ],
    painPoints: [
      { title: "Brak zdjęć wnętrza i atmosfery", text: "Kawiarnia to miejsce, nie tylko produkt - bez zdjęć klimatu klient nie wie czy pasuje do jego wizji spotkania czy pracy." },
      { title: "Nieopisane udogodnienia (Wi-Fi, gniazdka, cisza)", text: "Osoby pracujące zdalnie szukają konkretnie tych informacji - ich brak w wizytówce oznacza utraconego, lojalnego klienta na miesiące." },
      { title: "Stare menu bez cen specjalności", text: "Klient szukający konkretnej kawy czy ciasta nie widzi oferty i wybiera kawiarnię, która to pokazała." },
    ],
    benefits: [
      { title: "Zdjęcia klimatu przyciągają właściwą grupę klientów", text: "Kawiarnia \"do pracy\" i kawiarnia \"na romantyczne spotkanie\" to różne zdjęcia - dobrze dobrane przyciągają odpowiednich gości." },
      { title: "Opisane udogodnienia budują stałą klientelę", text: "Osoby pracujące zdalnie wracają regularnie, jeśli wiedzą, że mają zapewnione Wi-Fi i gniazdka." },
      { title: "Aktualne menu zwiększa liczbę odwiedzin", text: "Klient przekonany co do oferty jeszcze przed wejściem decyduje się szybciej i częściej wraca." },
    ],
    faq: [
      { q: "Czy warto zaznaczyć w wizytówce kawiarni {city_loc}, że jest dobra do pracy?", a: "Tak, to konkretna, poszukiwana cecha - dodaj to wprost w opisie i pokaż zdjęcie miejsc z dostępem do prądu." },
      { q: "Jak często zmieniać zdjęcia w wizytówce?", a: "Przy każdej zmianie sezonowej oferty (np. napoje na lato/zimę) oraz gdy wprowadzasz nowe pozycje w menu." },
      { q: "Czy reagować na opinie o hałasie lub tłoku?", a: "Tak - krótkie wyjaśnienie (np. godziny szczytu) pomaga kolejnym klientom zaplanować wizytę w spokojniejszej porze." },
    ],
    relatedServiceSlug: "zdjecia-google",
  },
  {
    slug: "weterynarz",
    name: "weterynarz",
    namePlural: "gabinety weterynaryjne",
    suffix: "google-maps",
    heroOpenings: [
      "Chory pies, zdenerwowany właściciel {city_loc} - szuka weterynarza z dobrymi opiniami, natychmiast.",
      "\"Weterynarz {city_loc} 24h\" - jeśli Twoja wizytówka nie mówi jasno o dostępności, klient dzwoni gdzie indziej.",
      "Właściciel zwierzęcia sprawdza opinie o weterynarzu {city_loc} dokładniej niż o jakiejkolwiek innej usłudze - chodzi o zdrowie pupila.",
    ],
    painPoints: [
      { title: "Brak informacji o dostępności w nagłych przypadkach", text: "Właściciel zwierzęcia w panice szuka jasnej informacji \"przyjmujemy dziś\" lub \"dyżur 24h\" - jej brak oznacza telefon do konkurencji." },
      { title: "Zero opinii o podejściu do zwierząt", text: "Właściciele czytają opinie szczególnie uważnie, szukając wzmianek o cierpliwości i delikatności wobec przestraszonych zwierząt." },
      { title: "Niejasny zakres usług", text: "Szczepienia, chirurgia, USG - jeśli nie jest to opisane, właściciel zwierzęcia z konkretną potrzebą szuka gdzie indziej." },
    ],
    benefits: [
      { title: "Jasna informacja o dostępności buduje zaufanie w nagłych sytuacjach", text: "Właściciel zwierzęcia w stresie wybiera gabinet, który jasno komunikuje, że może pomóc od razu." },
      { title: "Opinie o podejściu do zwierząt to najsilniejszy argument", text: "W branży weterynaryjnej opinie liczą się bardziej niż w niemal każdej innej - ludzie ufają rekomendacjom innych właścicieli zwierząt." },
      { title: "Opisany zakres usług trafia do właściwych właścicieli", text: "Kompletna lista usług (szczepienia, chirurgia, stomatologia zwierzęca) przyciąga trafne zapytania." },
    ],
    faq: [
      { q: "Czy warto zaznaczyć w wizytówce gabinetu {city_loc}, że przyjmujemy nagłe przypadki?", a: "Zdecydowanie tak, to jedna z najczęściej poszukiwanych informacji - jasno napisz to w opisie i dodaj aktualne godziny." },
      { q: "Jak zbierać opinie od właścicieli zwierząt bez naruszania ich prywatności?", a: "Link do opinii wysłany po wizycie działa dobrze - właściciele chętnie dzielą się doświadczeniem, szczególnie po pozytywnym przebiegu leczenia." },
      { q: "Co jeśli opinia dotyczy niepowodzenia leczenia?", a: "Odpowiedz empatycznie, bez szczegółów medycznych - czytelnicy doceniają profesjonalizm i troskę widoczną w tonie odpowiedzi." },
    ],
    relatedServiceSlug: "zarzadzanie-opiniami",
  },
] as const;

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

/** Prosty, deterministyczny hash - ten sam city+industry zawsze wybiera ten sam wariant (stabilne SSG) */
export function pickVariant<T>(arr: T[], seed: string): T {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return arr[hash % arr.length];
}
