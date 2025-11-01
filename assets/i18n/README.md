# 🌐 i18n - Internationalization

Diese Ordner enthält alle Übersetzungen für SpelBok.

## 📁 Struktur

```
i18n/
├── README.md       # Diese Datei
├── sv.json         # Schwedisch (Standard)
├── de.json         # Deutsch
└── en.json         # Englisch
```

## 🔧 Verwendung

### Translation-Dateien

Alle Übersetzungen sind in separaten JSON-Dateien gespeichert:

```json
{
  "appTitle": "SpelBok",
  "appSubtitle": "Din digitala spelbok",
  "totalSongs": "Totala låtar",
  ...
}
```

### i18n Module (assets/js/i18n.js)

Das i18n-Modul lädt die Übersetzungen dynamisch:

```javascript
// Initialisieren
await I18n.init();

// Sprache wechseln
await I18n.changeLanguage('de');

// Übersetzung abrufen
const text = I18n.t('appTitle');

// Mit Parametern (Interpolation)
const text = I18n.t('confirmImport', { count: 5 });
// Result: "Vill du importera 5 låtar? ..."
```

## ➕ Neue Sprache hinzufügen

### Schritt 1: Translation-Datei erstellen

Erstelle eine neue JSON-Datei (z.B. `fr.json` für Französisch):

```json
{
  "appTitle": "SpelBok",
  "appSubtitle": "Votre livre de chansons numérique",
  ...
}
```

### Schritt 2: Sprache im i18n-Modul registrieren

Bearbeite `assets/js/i18n.js`:

```javascript
const SUPPORTED_LANGUAGES = ["sv", "de", "en", "fr"]; // Füge "fr" hinzu
```

### Schritt 3: Service Worker aktualisieren

Bearbeite `sw.js`:

```javascript
const urlsToCache = [
  ...
  "./assets/i18n/fr.json", // Füge neue Datei hinzu
];
```

### Schritt 4: Language Selector aktualisieren

Bearbeite `index.html`:

```html
<select id="languageSelect" onchange="changeLanguage(this.value)">
    <option value="sv">Svenska</option>
    <option value="de">Deutsch</option>
    <option value="en">English</option>
    <option value="fr">Français</option> <!-- Neu -->
</select>
```

### Schritt 5: Cache Version erhöhen

Erhöhe die Version in `sw.js`:

```javascript
const CACHE_NAME = "spelbok-v0.2.0"; // v0.1.0 → v0.2.0
```

## 🔑 Translation Keys

### Hauptbereiche

| Kategorie | Keys |
|-----------|------|
| **App** | `appTitle`, `appSubtitle` |
| **Stats** | `totalSongs`, `traditionalSongs`, `newSongs` |
| **Form** | `titel`, `lattyp`, `efterAv`, `ort`, etc. |
| **Actions** | `addSong`, `updateSong`, `edit`, `delete` |
| **Filter** | `filterTitle`, `search`, `resetFilters` |
| **Messages** | `confirmDelete`, `importSuccess`, `importError` |

### Vollständige Liste

Siehe eine der JSON-Dateien für alle verfügbaren Keys.

## 🔄 Parameter-Interpolation

Einige Übersetzungen unterstützen Parameter:

```json
{
  "confirmImport": "Vill du importera {count} låtar?",
  "duplicatesSkipped": "{count} dubbletter hoppades över.",
  "importError": "Fel vid import: {error}"
}
```

Verwendung:

```javascript
I18n.t('confirmImport', { count: 10 });
// Result: "Vill du importera 10 låtar?"

I18n.t('importError', { error: 'File not found' });
// Result: "Fel vid import: File not found"
```

## 📝 Best Practices

### 1. Konsistente Keys
- Verwende `camelCase` für Keys
- Gruppiere verwandte Keys logisch
- Nutze sprechende Namen

### 2. Platzhalter
- Verwende `{variableName}` für dynamische Werte
- Dokumentiere erwartete Parameter

### 3. Fallbacks
- Das System fällt auf Schwedisch (sv) zurück, wenn eine Sprache fehlt
- Fehlende Keys zeigen den Key-Namen an

### 4. Testing
Nach Änderungen testen:
```bash
# Cache leeren und neu laden
# Chrome DevTools → Application → Clear Storage
```

## 🌍 Unterstützte Sprachen

| Code | Sprache | Status |
|------|---------|--------|
| `sv` | Svenska (Schwedisch) | ✅ Vollständig |
| `de` | Deutsch | ✅ Vollständig |
| `en` | English | ✅ Vollständig |

## 🔍 Debugging

### Translation fehlt?

```javascript
// Browser Console:
console.log(I18n.getTranslations());
console.log(I18n.getCurrentLanguage());
```

### Sprache wird nicht gespeichert?

```javascript
// Browser Console:
localStorage.getItem('musikRepertoireLanguage');
```

### Alte Übersetzungen werden angezeigt?

1. Hard Reload: `Cmd+Shift+R`
2. Cache leeren in DevTools
3. Service Worker deregistrieren

## 📊 Statistiken

- **Anzahl Sprachen:** 3 (sv, de, en)
- **Anzahl Keys:** ~70 pro Sprache
- **Dateigröße:** ~2-3 KB pro Datei
- **Format:** JSON (UTF-8)

## 🔗 i18n Standards

Diese Implementierung folgt gängigen i18n-Konventionen:

- ✅ Separate Translation-Dateien
- ✅ JSON-Format
- ✅ Sprachcodes (ISO 639-1)
- ✅ Parameter-Interpolation
- ✅ Lazy Loading
- ✅ Fallback-Mechanismus

## 📚 Weitere Informationen

- [i18n Best Practices](https://www.w3.org/International/questions/qa-i18n)
- [ISO 639-1 Language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

---

**© 2025 David Staron**
