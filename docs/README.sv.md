# 🎵 SpelBok - Din digitala spelbok

**[🇩🇪 Deutsch](../README.md)** | **[🇬🇧 English](README.en.md)**

---

En modern Progressive Web App för att hantera ditt musikrepertoar - fullt fungerande offline!

> **SpelBok** = Liederbuch/Spielbuch för musiker

## ✨ Funktioner

### 📱 **Progressive Web App (PWA)**
- ✅ **Installerbar** på iPhone, iPad, Android och Desktop
- ✅ **Offline-funktionalitet** - använd appen utan internet
- ✅ **Native app-upplevelse** - körs i helskärm utan webbläsare
- ✅ **Automatiska uppdateringar** - alltid senaste versionen
- ✅ **Litet lagringsbehov** - endast ~50 KB istället för flera MB
- ✅ **Hemskärmsikon** - snabb åtkomst som en riktig app

### 🌐 **Flerspråkighet**
- **Svenska** - Standardspråk
- **Deutsch** - Komplett tysk översättning
- **English** - Komplett engelsk översättning
- Språkval uppe till höger i headern
- Språkval sparas automatiskt

### 📊 **Datahantering**
- ✅ Lägg till, redigera & ta bort låtar
- ✅ 15 datafält för omfattande dokumentation
- ✅ Automatisk sparning i localStorage
- ✅ Data förblir permanent i webbläsaren
- ✅ Pålitligt ID-system förhindrar oavsiktlig radering av flera poster

### 🔍 **Sök- och filterfunktioner**
- Fulltextsökning över alla fält
- Filtrera efter region (Landskap)
- Filtrera efter svårighetsgrad
- Filtrera efter typ (Traditionell/Ny/Modern)

### 📥 **Import & Export**
- Exportera ditt repertoar som JSON-fil
- Importera JSON-filer (backup-funktion)
- **Automatisk dubblettdetektering**: Vid import hoppas låtar som redan finns (alla fält identiska) automatiskt över
- Säkerhetskopiera dina data regelbundet!

### 📱 **Responsiv design**
- Fungerar på Desktop, Tablet och Smartphone
- Modern design med gradient-bakgrund
- Tydlig tabellvy

## 🚀 Installation & Användning

### 🌟 Installera som PWA (REKOMMENDERAT för iOS/iPad)

Appen kan installeras som en Progressive Web App och körs då som en native app!

#### iPhone/iPad (Safari):
1. **Öppna app-URL:en** i Safari (t.ex. https://StarOnDavid.github.io/spelbok/)
2. Tryck på **Dela-symbolen** (□↑)
3. Välj **"Lägg till på hemskärmen"**
4. Tryck på **"Lägg till"**
5. **Klart!** Appen finns nu på din hemskärm som "SpelBok"

#### Android (Chrome):
1. **Öppna Chrome** och öppna appen
2. Tryck på **"Installera app"** i bannern
3. Eller: Meny (⋮) → **"Installera app"**
4. **Klart!** Appen körs som native app

#### Desktop (Chrome/Edge):
1. Öppna appen i webbläsaren
2. Klicka på **⊕-ikonen** i adressfältet
3. Klicka på **"Installera"**

**✨ Fördelar med PWA-installation:**
- 📱 Körs i helskärm (ingen webbläsare)
- 🚀 Fungerar offline
- ⚡ Snabbare start
- 🏠 Egen ikon på hemskärmen
- 🔄 Automatiska uppdateringar

---

### 📱 PWA vs. normal användning

| Funktion | PWA (installerad) | Normal (webbläsare) |
|----------|-------------------|---------------------|
| **Offline** | ✅ Ja | ❌ Nej |
| **Hemskärmsikon** | ✅ Ja | ❌ Nej |
| **Helskärm** | ✅ Ja | ❌ Nej |
| **Snabbare start** | ✅ Ja | 🟡 Långsammare |
| **Uppdateringar** | ✅ Automatiskt | 🟡 Manuellt |

**Rekommendation:** För bästa upplevelse på mobila enheter, använd PWA-installation!

### Systemkrav
- Modern webbläsare (Chrome, Firefox, Safari, Edge)
- JavaScript måste vara aktiverat
- Ingen internetanslutning krävs

## 📋 Datafält

Appen registrerar följande information för varje låt:

1. **Titel** - Låtens namn (t.ex. Bingsjöpolska efter Hjort Anders)
2. **Låttyp** - Typ av låt (t.ex. Polska, Vals, Slängpolska)
3. **Efter/Av** - Kompositör eller källa
4. **Ort** - Stad eller by
5. **Landskap** - Region (t.ex. Dalarna, Skåne)
6. **Land** - Land (t.ex. Sverige, Norge)
7. **Tonart** - Låtens tonart
8. **Svårighetsgrad** - Svårighetsgrad (Lätt/Medel/Svår/Mycket svår)
9. **Utmaningar** - Utmaningar och övningsfokus
10. **Av vem lärde jag mig låten?** - Vem du lärde dig låten av
11. **Var hittar jag inspelning?** - Var inspelningen finns
12. **Not?** - Tillgång till noter
13. **Instrument kommentar** - Kommentarer om instrument
14. **Trad eller ny** - Traditionell, Ny eller Modern tolkning
15. **Andra kommentarer** - Övriga anteckningar

## 💾 Datasäkerhet

### Var sparas datan?
Datan sparas i din webbläsares **localStorage**:
- ✅ Automatisk sparning vid varje ändring
- ✅ Datan finns kvar efter omstart av webbläsaren
- ✅ Inget moln, ingen extern databas

### ⚠️ Viktiga meddelanden
- **Rensa inte webbläsarens cache** - då försvinner din data!
- **Skapa regelbundna backuper** med export-funktionen
- **Privat surfning** sparar inte data permanent

### Skapa backup
1. Klicka på "📥 Exportera JSON"
2. Spara JSON-filen på en säker plats
3. Vid behov: Importera filen med "📤 Importera JSON"

### Import med dubblettdetektering
Vid import av JSON-filer kontrollerar appen automatiskt dubbletter:
- **Dublettkontroll**: Låtar identifieras som dubbletter om ALLA fält (utom ID) är identiska
- **Automatisk överhoppning**: Dubbletter importeras inte
- **Statusmeddelande**: Du får ett meddelande om hur många låtar som importerades och hur många som hoppades över
- **Exempel**: Om du importerar 20 låtar och 5 redan finns, läggs endast 15 nya till

Detta skyddar mot oavsiktlig dubbel import av samma data!

## 🌐 Byta språk

1. Klicka på **Globe-ikonen** 🌐 uppe till höger
2. Välj önskat språk:
   - **Svenska** (Svenska)
   - **Deutsch** (Tyska)
   - **English** (Engelska)
3. Hela användargränssnittet översätts direkt
4. Ditt språkval sparas automatiskt

## 🎯 Användningstips

### Effektivt arbete
- Använd **sökning** för snabb åtkomst till specifika låtar
- Använd **filter** för att sortera ditt repertoar efter kategorier
- **Statistiken** visar dig snabbt sammansättningen av ditt repertoar

### Best Practices
- Fyll i så många fält som möjligt - ju mer information, desto bättre
- Använd "Utmaningar"-fältet för övningsanteckningar
- Länka inspelningar direkt (YouTube, Spotify, etc.)
- Skapa en backup av dina data varje vecka

## 🛠️ Tekniska detaljer

### Modern arkitektur (v2.0.0)
Appen använder en **modulär struktur** med separata filer:

**Struktur:**
```
spelbok/
├── index.html           # Huvud-HTML (Entry Point)
├── manifest.json        # PWA-konfiguration
├── sw.js               # Service Worker (Cache v2.0.0)
├── assets/
│   ├── css/styles.css  # Stylesheet (7.4 KB)
│   └── js/app.js       # App-logik (14 KB)
└── docs/               # Dokumentation
```

**Service Worker (spelbok-v2.0.0):**
- Möjliggör offline-funktionalitet
- Cachar HTML, CSS, JS och manifest.json
- Automatiska uppdateringar i bakgrunden

**Web App Manifest:**
- Namn: "SpelBok - Din digitala spelbok"
- Definierar app-egenskaper (ikoner, färger, start-URL)
- Möjliggör installation på hemskärmen
- iOS- och Android-optimerad

**LocalStorage API:**
- Persistent datalagring i webbläsaren
- Ingen serveranslutning krävs
- Datan finns kvar även offline

### ID-system
Varje låt får ett unikt ID vid skapande i formatet `song_timestamp_randomstring`. Detta ID:
- Genereras automatiskt
- Är inte synligt för användaren
- Garanterar säkra radering- och redigeringsoperationer
- Förhindrar konflikter vid import/export
- För befintlig data migreras gamla ID:n automatiskt

### Teknikstack
- **HTML5, CSS3, ES6 JavaScript** - inga ramverk, ren vanilla JS
- **localStorage API** - för datalagring
- **Responsiv design** - fungerar på alla enheter
- **Progressive Web App** - med Service Worker och Manifest
- **Flerspråkighet** - Svenska, Tyska, Engelska

### Webbläsarkompatibilitet
- ✅ Chrome/Chromium (från version 60)
- ✅ Firefox (från version 50)
- ✅ Safari (från version 11)
- ✅ Edge (från version 79)
- ✅ Opera (från version 47)

## 📄 Licens & Copyright

**© 2025 David Staron**

Denna app är fritt användbar för privat och kommersiellt bruk.

---

## 🎵 Ha kul med SpelBok!

**Skapad av David Staron** | SpelBok v2.0.0 © 2025
