# 🎵 SpelBok - Din digitala spelbok

**[🇸🇪 Svenska](docs/README.sv.md)** | **[🇩🇪 Deutsch](README.md)** | **[🇬🇧 English](docs/README.en.md)**

---

Eine moderne Progressive Web App zur Verwaltung deines Musikrepertoires - vollständig offline nutzbar!

> **SpelBok** (Schwedisch) = Liederbuch/Spielbuch für Musiker

## ✨ Features

### 📱 **Progressive Web App (PWA)**
- ✅ **Installierbar** auf iPhone, iPad, Android und Desktop
- ✅ **Offline-Funktionalität** - nutze die App ohne Internet
- ✅ **Native App Erfahrung** - läuft im Vollbild ohne Browser
- ✅ **Automatische Updates** - immer die neueste Version
- ✅ **Kleiner Speicherbedarf** - nur ~50 KB statt mehrere MB
- ✅ **Home-Bildschirm Icon** - schneller Zugriff wie eine echte App

### 🌐 **Mehrsprachigkeit**
- **Schwedisch (Svenska)** - Standardsprache
- **Deutsch** - Vollständige deutsche Übersetzung
- **Englisch (English)** - Vollständige englische Übersetzung
- Sprachauswahl oben rechts im Header
- Sprachwahl wird automatisch gespeichert

### 📊 **Datenverwaltung**
- ✅ Hinzufügen, Bearbeiten & Löschen von Liedern
- ✅ 15 Datenfelder für umfassende Dokumentation
- ✅ Automatische Speicherung in localStorage
- ✅ Daten bleiben dauerhaft im Browser erhalten
- ✅ Zuverlässiges ID-System verhindert versehentliches Löschen mehrerer Einträge

### 🔍 **Such- und Filterfunktionen**
- Volltext-Suche über alle Felder
- Filter nach Region (Landskap)
- Filter nach Schwierigkeitsgrad
- Filter nach Typ (Traditionell/Neu/Modern)

### 📥 **Import & Export**
- Exportiere dein Repertoire als JSON-Datei
- Importiere JSON-Dateien (Backup-Funktion)
- **Automatische Duplikatserkennung**: Beim Import werden Songs, die bereits vorhanden sind (alle Felder identisch), automatisch übersprungen
- Sichere deine Daten regelmäßig!

### 📱 **Responsive Design**
- Funktioniert auf Desktop, Tablet und Smartphone
- Modernes Design mit Gradient-Hintergrund
- Übersichtliche Tabellenansicht

## 🚀 Installation & Verwendung

### 🌟 Als PWA installieren (EMPFOHLEN für iOS/iPad)

Die App kann als Progressive Web App installiert werden und läuft dann wie eine native App!

#### iPhone/iPad (Safari):
1. **Öffne die App-URL** in Safari (z.B. https://StarOnDavid.github.io/spelbok/)
2. Tippe auf das **Teilen-Symbol** (□↑)
3. Wähle **"Zum Home-Bildschirm"**
4. Tippe auf **"Hinzufügen"**
5. **Fertig!** Die App ist jetzt auf deinem Home-Bildschirm als "SpelBok"

#### Android (Chrome):
1. **Chrome öffnen** und App öffnen
2. Tippe auf **"App installieren"** im Banner
3. Oder: Menü (⋮) → **"App installieren"**
4. **Fertig!** App läuft wie native App

#### Desktop (Chrome/Edge):
1. Öffne die App im Browser
2. Klicke auf das **⊕ Icon** in der Adressleiste
3. Klicke auf **"Installieren"**

**✨ Vorteile der PWA-Installation:**
- 📱 Läuft im Vollbild (kein Browser)
- 🚀 Funktioniert offline
- ⚡ Schneller Start
- 🏠 Eigenes Icon auf Home-Bildschirm
- 🔄 Automatische Updates

---

### 📱 PWA vs. normale Nutzung

| Feature | PWA (installiert) | Normal (Browser) |
|---------|-------------------|------------------|
| **Offline** | ✅ Ja | ❌ Nein |
| **Home-Icon** | ✅ Ja | ❌ Nein |
| **Vollbild** | ✅ Ja | ❌ Nein |
| **Schneller Start** | ✅ Ja | 🟡 Langsamer |
| **Updates** | ✅ Automatisch | 🟡 Manuell |

**Empfehlung:** Für die beste Erfahrung auf Mobilgeräten die PWA-Installation nutzen!

### Systemanforderungen
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- JavaScript muss aktiviert sein
- Keine Internetverbindung erforderlich

## 📋 Datenfelder

Die App erfasst folgende Informationen zu jedem Lied:

1. **Titel** - Name/Bezeichnung des Liedes (z.B. Bingsjöpolska efter Hjort Anders)
2. **Låttyp** - Art des Liedes (z.B. Polska, Vals, Slängpolska)
3. **Efter/Av** - Komponist oder Quelle
4. **Ort** - Stadt oder Dorf
5. **Landskap** - Region (z.B. Dalarna, Skåne)
6. **Land** - Land (z.B. Schweden, Norwegen)
7. **Tonart** - Tonart des Liedes
8. **Svårighetsgrad** - Schwierigkeitsgrad (Leicht/Mittel/Schwer/Sehr schwer)
9. **Utmaningar** - Herausforderungen und Übungsschwerpunkte
10. **Av vem lärde jag mig låten?** - Von wem du das Lied gelernt hast
11. **Var hittar jag inspelning?** - Wo die Aufnahme zu finden ist
12. **Not?** - Verfügbarkeit von Noten
13. **Instrument kommentar** - Kommentare zum Instrument
14. **Trad eller ny** - Traditionell, Neu oder Moderne Interpretation
15. **Andra kommentarer** - Weitere Notizen

## 💾 Datensicherheit

### Wo werden die Daten gespeichert?
Die Daten werden im **localStorage** deines Browsers gespeichert:
- ✅ Automatische Speicherung bei jeder Änderung
- ✅ Daten bleiben nach Browser-Neustart erhalten
- ✅ Keine Cloud, keine externe Datenbank

### ⚠️ Wichtige Hinweise
- **Lösche nicht den Browser-Cache** - sonst gehen deine Daten verloren!
- **Erstelle regelmäßig Backups** mit der Export-Funktion
- **Privates Browsen** speichert keine Daten dauerhaft

### Backup erstellen
1. Klicke auf "📥 Exportera JSON" / "JSON exportieren" / "Export JSON"
2. Speichere die JSON-Datei an einem sicheren Ort
3. Bei Bedarf: Importiere die Datei mit "📤 Importera JSON"

### Import mit Duplikatserkennung
Beim Import von JSON-Dateien prüft die App automatisch auf Duplikate:
- **Duplikatsprüfung**: Songs werden als Duplikat erkannt, wenn ALLE Felder (außer ID) identisch sind
- **Automatisches Überspringen**: Duplikate werden nicht importiert
- **Statusmeldung**: Du erhältst eine Meldung, wie viele Songs importiert und wie viele übersprungen wurden
- **Beispiel**: Wenn du 20 Songs importierst und 5 bereits vorhanden sind, werden nur 15 neue hinzugefügt

Dies schützt vor versehentlichem doppelten Import derselben Daten!

## 🌐 Sprache wechseln

1. Klicke oben rechts auf das **Globus-Icon** 🌐
2. Wähle deine gewünschte Sprache:
   - **Svenska** (Schwedisch)
   - **Deutsch** (Deutsch)
   - **English** (Englisch)
3. Die gesamte Benutzeroberfläche wird sofort übersetzt
4. Deine Sprachwahl wird automatisch gespeichert

## 🎯 Verwendungstipps

### Effizienter Arbeiten
- Verwende die **Suche** für schnellen Zugriff auf bestimmte Lieder
- Nutze **Filter** um dein Repertoire nach Kategorien zu sortieren
- Die **Statistik** zeigt dir auf einen Blick die Zusammensetzung deines Repertoires

### Best Practices
- Fülle so viele Felder wie möglich aus - je mehr Information, desto besser
- Nutze das "Utmaningar"-Feld für Übungsnotizen
- Verlinke Aufnahmen direkt (YouTube, Spotify, etc.)
- Erstelle wöchentlich ein Backup deiner Daten

## 🛠️ Technische Details

### Moderne Architektur (v2.0.0)
Die App nutzt eine **modulare Struktur** mit getrennten Dateien:

**Struktur:**
```
spelbok/
├── index.html           # Haupt-HTML (Entry Point)
├── manifest.json        # PWA Konfiguration
├── sw.js               # Service Worker (Cache v2.0.0)
├── assets/
│   ├── css/styles.css  # Stylesheet (7.4 KB)
│   └── js/app.js       # App-Logik (14 KB)
└── docs/               # Dokumentation
```

**Service Worker (spelbok-v2.0.0):**
- Ermöglicht Offline-Funktionalität
- Cached HTML, CSS, JS und manifest.json
- Automatische Updates im Hintergrund

**Web App Manifest:**
- Name: "SpelBok - Din digitala spelbok"
- Definiert App-Eigenschaften (Icons, Farben, Start-URL)
- Ermöglicht Installation auf Home-Bildschirm
- iOS- und Android-optimiert

**LocalStorage API:**
- Persistente Datenspeicherung im Browser
- Keine Server-Verbindung erforderlich
- Daten bleiben auch offline verfügbar

### ID-System
Jeder Song erhält beim Erstellen eine eindeutige ID im Format `song_timestamp_randomstring`. Diese ID:
- Wird automatisch generiert
- Ist nicht sichtbar für den Benutzer
- Gewährleistet sichere Lösch- und Bearbeitungsoperationen
- Verhindert Konflikte beim Import/Export
- Bei bestehenden Daten werden alte IDs automatisch migriert

### Technologie-Stack
- **HTML5, CSS3, ES6 JavaScript** - keine Frameworks, pure vanilla JS
- **localStorage API** - für Datenspeicherung
- **Responsive Design** - funktioniert auf allen Geräten
- **Progressive Web App** - mit Service Worker und Manifest
- **Mehrsprachigkeit** - Schwedisch, Deutsch, Englisch

### Browser-Kompatibilität
- ✅ Chrome/Chromium (ab Version 60)
- ✅ Firefox (ab Version 50)
- ✅ Safari (ab Version 11)
- ✅ Edge (ab Version 79)
- ✅ Opera (ab Version 47)

## 📄 Lizenz & Copyright

**© 2025 David Staron**

Diese App ist frei verwendbar für private und kommerzielle Zwecke.

---

## 🎵 Viel Spaß mit SpelBok!
