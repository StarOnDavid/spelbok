# 📝 Änderungsprotokoll - SpelBok

## [2.0.0] - 2025-10-29

### 🎉 Umbenennung: "Musik Repertoire" → "SpelBok"

Die App wurde von "Musik Repertoire" zu "SpelBok" (Schwedisch für "Liederbuch/Spielbuch") umbenannt.

### ✅ Geänderte Dateien:

#### 1. **index.html**
- Title: `🎵 SpelBok`
- Description: "Din digitala spelbok - Hantera ditt musikrepertoar"
- Apple App Title: `SpelBok`

#### 2. **assets/css/styles.css**
- Header-Kommentar aktualisiert: "SpelBok - Din digitala spelbok"

#### 3. **assets/js/app.js**
- Header-Kommentar aktualisiert
- Übersetzungen aktualisiert:
  - **Schwedisch**: "SpelBok" / "Din digitala spelbok"
  - **Deutsch**: "SpelBok" / "Dein digitales Liederbuch"
  - **Englisch**: "SpelBok" / "Your digital songbook"

#### 4. **manifest.json**
- Name: "SpelBok - Din digitala spelbok"
- Short Name: "SpelBok"
- Description: "Din digitala spelbok - Hantera ditt musikrepertoar..."
- Start URL: `./index.html` (statt `./musik-repertoire.html`)
- Icon-Pfade: `assets/icons/` (statt `icons/`)

#### 5. **Dokumentation**
- `docs/README.md` - Titel aktualisiert
- `GETTING_STARTED.md` - Titel aktualisiert
- `PROJECT_STRUCTURE.md` - Titel aktualisiert

### 📋 Zusammenfassung der Namensänderungen:

| Bereich | Vorher | Nachher |
|---------|--------|---------|
| **App Name (SV)** | Musik Repertoire | SpelBok |
| **Subtitle (SV)** | Hantera ditt musikrepertoar | Din digitala spelbok |
| **App Name (DE)** | Musik Repertoire | SpelBok |
| **Subtitle (DE)** | Verwalte dein Musikrepertoire | Dein digitales Liederbuch |
| **App Name (EN)** | Music Repertoire | SpelBok |
| **Subtitle (EN)** | Manage your music repertoire | Your digital songbook |

### 🎯 Bedeutung "SpelBok":

**SpelBok** ist ein schwedisches Wort mit doppelter Bedeutung:
- **"Spel"** = Spielen (Musik spielen) / Spiel
- **"Bok"** = Buch
- **"SpelBok"** = Liederbuch / Notenbuch / Spielbuch für Musiker

Der Name ist:
- ✅ Authentisch schwedisch (passend zur Folk-Musik)
- ✅ Kürzer und prägnanter
- ✅ Leicht zu merken
- ✅ Beschreibt die Funktion perfekt

### 🔄 Migration für Benutzer:

**Keine Aktion erforderlich!** 
- LocalStorage-Daten bleiben erhalten
- Bestehende Daten werden nicht beeinflusst
- Die App funktioniert wie gewohnt

### 📱 PWA-Installation:

Bei Neuinstallation erscheint jetzt:
- Icon-Name: **SpelBok**
- App-Name: **SpelBok - Din digitala spelbok**

Bereits installierte Apps:
- Können neu installiert werden mit dem neuen Namen
- Alte Installation kann gelöscht werden

---

## [1.0.0] - 2025-10-29

### 🎉 Initiale Refaktorierung

- Single-File HTML aufgeteilt in modulare Struktur
- Separate CSS, JavaScript und HTML-Dateien
- Ordnerstruktur mit `assets/`, `docs/`
- PWA-optimiert mit Service Worker
- Mehrsprachigkeit: Schwedisch, Deutsch, Englisch

---

**Erstellt von David Staron** | © 2025
