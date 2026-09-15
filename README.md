Lokalno pokretanje

Potrebni su Node.js i npm. Projekat je lokalno testiran uz Node.js 24.20.0 na Windowsu.

Backend i frontend pokreću se u dva odvojena terminala. Komande ispod polaze iz glavnog foldera projekta.

1. Instalacija i podešavanje backenda

cd backend
npm ci

Pri prvom podešavanju kopirati .env.example u .env:

Copy-Item .env.example .env

U fajlu .env postaviti sopstvene podatke za administratorsku prijavu:

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ovde_unesite_sopstvenu_lozinku

Fajl .env sadrži lokalne pristupne podatke i ne dodaje se u Git.

Pokrenuti backend iz foldera backend:

node server.js

Backend je dostupan na http://localhost:3000. Njegov rad može se proveriti otvaranjem http://localhost:3000/api/health.

SQLite baza backend/barcelona.db kreira se automatski pri prvom pokretanju, zajedno sa početnim podacima za atrakcije, ture i proizvode. Rezervacije i porudžbine ostaju sačuvane između pokretanja servera. Lokalna baza nije uključena u Git.

2. Pokretanje frontenda

U drugom terminalu, iz glavnog foldera projekta:

cd frontend
npm ci
npm run dev

Otvoriti adresu koju Vite ispiše u terminalu, najčešće http://localhost:5173.

Za učitavanje proizvoda i tura, slanje rezervacija i porudžbina i administratorski pregled potrebno je da backend bude pokrenut.

Administratorski panel

Administratorska stranica dostupna je na putanji /admin, odnosno lokalno na http://localhost:5173/admin kada frontend koristi podrazumevani port.

Prijava koristi podatke iz fajla backend/.env. Panel omogućava pregled rezervacija, porudžbina i njihovih stavki. Posle promene administratorskih podataka potrebno je ponovo pokrenuti backend.

Provera i build

Iz foldera frontend:

npm run lint
npm run build

Build se generiše u folderu frontend/dist.

Za lokalni pregled generisanog builda:

npm run preview

Backend se pokreće zasebno i potreban je i tokom ovog pregleda.

Napomene

Projekat je namenjen lokalnoj demonstraciji u okviru diplomskog rada.

Plaćanje je simulirano; aplikacija ne obrađuje stvarne kartične transakcije.

Korpa podržava najviše 99 komada istog proizvoda.

Standardna dostava iznosi 4,90 €, ekspresna 9,90 €, a lično preuzimanje je besplatno.

Interaktivnoj mapi potrebna je internet veza za učitavanje podloge.

Frontend trenutno koristi API adresu http://localhost:3000; javno objavljivanje zahteva prilagođavanje konfiguracije.