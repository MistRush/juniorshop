# JuniorShop

🦔 E-shop s hračkami inspirovaný designem junior.cz

## Funkce

- 🏠 Homepage s hero filtry a produktovými mřížkami
- 📦 Katalog produktů s filtry a řazením
- 🛒 Nákupní košík s localStorage persistencí
- 💳 4-krokový checkout proces
- 🔐 Admin panel pro správu objednávek
- 🔥 Firebase integrace pro ukládání objednávek

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- Firebase Firestore (volitelně)
- Google Fonts (Quicksand)

## Spuštění lokálně

```bash
# Jednoduchý HTTP server
npx serve .
# nebo
python -m http.server 8080
```

## Přístupy

| URL | Popis |
|-----|-------|
| `/` | E-shop pro zákazníky |
| `/admin.html` | Admin panel |

**Admin credentials:** `admin@juniorshop.cz` / `admin123`

## Firebase nastavení

Pro produkční použití nahraďte demo credentials v `firebase-config.js` vlastním Firebase projektem.

## License

MIT
