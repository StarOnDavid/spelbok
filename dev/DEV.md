# 🛠️ SpelBok - Development Guide

Entwicklungs-Dokumentation für SpelBok

---

## 🚀 Schnellstart

### Methode 1: Start-Script (Empfohlen)

```bash
# Im Projektverzeichnis:
./dev/start-server.sh
```

Öffne dann: **http://localhost:8000**

---

### Methode 2: Manueller Python Server

```bash
# Im Projektverzeichnis:
cd /Users/davidstaron/src/spel_bok
python3 -m http.server 8000
```

---

### Methode 3: Eigener Port

```bash
# Port 3000:
python3 -m http.server 3000

# Port 5000:
python3 -m http.server 5000
```

---

## 📁 Projektstruktur

```
spelbok/
├── index.html              # Haupt-HTML (Entry Point)
├── manifest.json           # PWA Konfiguration
├── sw.js                   # Service Worker (Cache v2.0.0)
├── assets/
│   ├── css/
│   │   └── styles.css      # Stylesheet (7.4 KB)
│   ├── js/
│   │   └── app.js          # App-Logik (14 KB)
│   └── icons/              # PWA Icons
├── docs/                   # Dokumentation (sv, de, en)
│   ├── README.sv.md
│   ├── README.de.md
│   └── README.en.md
├── dev/                    # Development Tools
│   ├── start-server.sh     # Dev Server Script
│   └── DEV.md             # Diese Datei
└── tests/                  # Tests (optional)
```

---

## 🔧 Entwicklungstools

### Browser DevTools

**Chrome/Edge:**
- **Console:** `Cmd+Option+J` (Mac) / `Ctrl+Shift+J` (Windows)
- **DevTools:** `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)

**Firefox:**
- **Console:** `Cmd+Option+K` (Mac) / `Ctrl+Shift+K` (Windows)

**Safari:**
- Aktiviere "Develop" Menü in Einstellungen
- **Console:** `Cmd+Option+C`

### PWA Testing

**Service Worker überprüfen:**
1. Chrome DevTools → Application → Service Workers
2. Aktiviere "Update on reload"
3. Klicke "Unregister" um Service Worker zu löschen

**Cache löschen:**
1. Chrome DevTools → Application → Storage
2. "Clear site data"

**PWA installieren (Test):**
1. Chrome: Adressleiste → Install Icon
2. Safari (iOS): Share → "Add to Home Screen"

---

## 📝 Entwicklungs-Workflow

### 1. Änderungen vornehmen

Bearbeite Dateien in:
- `index.html` - HTML Struktur
- `assets/css/styles.css` - Styling
- `assets/js/app.js` - JavaScript Logik

### 2. Testen

1. **Speichere** deine Änderungen
2. **Reload** im Browser (`Cmd+R` / `Ctrl+R`)
3. Bei Service Worker Änderungen: **Hard Reload** (`Cmd+Shift+R`)

### 3. Service Worker aktualisieren

Wenn du `sw.js` änderst:

```javascript
// sw.js - CACHE_NAME erhöhen:
const CACHE_NAME = 'spelbok-v2.0.1'; // v2.0.0 → v2.0.1
```

### 4. LocalStorage testen

**Daten anzeigen:**
```javascript
// Browser Console:
localStorage.getItem('musikRepertoireSongs');
```

**Daten löschen:**
```javascript
// Browser Console:
localStorage.clear();
```

---

## 🐛 Debugging

### Service Worker Probleme

```javascript
// Browser Console - Service Worker Status:
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log('Registrations:', registrations);
});

// Service Worker deregistrieren:
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.unregister());
});
```

### LocalStorage Probleme

```javascript
// Alle gespeicherten Daten anzeigen:
console.log(localStorage);

// Spezifische Daten:
console.log(JSON.parse(localStorage.getItem('musikRepertoireSongs')));

// Sprache:
console.log(localStorage.getItem('musikRepertoireLanguage'));
```

### Cache Probleme

1. **Hard Reload:** `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows)
2. **Cache leeren:** DevTools → Application → Clear Storage
3. **Service Worker neu laden:** DevTools → Application → Service Workers → Update

---

## 🧪 Testing Checkliste

### Funktionalität
- [ ] Song hinzufügen funktioniert
- [ ] Song bearbeiten funktioniert
- [ ] Song löschen funktioniert
- [ ] Suche funktioniert
- [ ] Filter funktionieren
- [ ] Export funktioniert
- [ ] Import funktioniert
- [ ] Duplikatserkennung funktioniert

### Mehrsprachigkeit
- [ ] Schwedisch funktioniert
- [ ] Deutsch funktioniert
- [ ] Englisch funktioniert
- [ ] Sprachwechsel wird gespeichert

### PWA
- [ ] Service Worker registriert sich
- [ ] Offline-Modus funktioniert
- [ ] App ist installierbar
- [ ] Icons werden korrekt angezeigt

### Browser
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (Desktop)
- [ ] Safari (iOS)
- [ ] Chrome (Android)

### Responsive Design
- [ ] Desktop (> 1200px)
- [ ] Tablet (768px - 1200px)
- [ ] Mobile (< 768px)

---

## 🔄 Git Workflow

```bash
# Status prüfen:
git status

# Änderungen anzeigen:
git diff

# Änderungen stagen:
git add .

# Commit:
git commit -m "feat: Add new feature"

# Push:
git push origin main
```

### Commit Message Convention

```
feat: Neue Funktion
fix: Bugfix
docs: Dokumentation
style: Styling
refactor: Code-Refactoring
test: Tests
chore: Build/Tools
```

---

## 📊 Performance Optimierung

### Dateigröße prüfen

```bash
# Im Projektverzeichnis:
du -sh assets/css/styles.css
du -sh assets/js/app.js
du -sh index.html
```

### Ladezeit testen

1. Chrome DevTools → Network
2. "Disable cache"
3. Reload
4. Prüfe "DOMContentLoaded" und "Load" Zeit

---

## 🔐 Sicherheit

### Wichtige Hinweise

- **localStorage** ist nicht verschlüsselt
- Keine sensiblen Daten speichern
- XSS-Schutz durch `escapeHtml()` Funktion
- Kein Backend = keine API-Sicherheit nötig

---

## 📚 Nützliche Links

### Dokumentation
- **PWA:** https://web.dev/progressive-web-apps/
- **Service Worker:** https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- **LocalStorage:** https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

### Tools
- **PWA Builder:** https://www.pwabuilder.com/
- **Lighthouse:** Chrome DevTools → Lighthouse
- **Can I Use:** https://caniuse.com/

---

## 🆘 Hilfe

### Server startet nicht?

**Port bereits belegt:**
```bash
# Port-Nutzung prüfen:
lsof -i :8000

# Prozess beenden:
kill -9 <PID>
```

**Python nicht gefunden:**
```bash
# Python Version prüfen:
python3 --version

# Falls nicht installiert:
# Mac: brew install python3
# Linux: apt-get install python3
```

### PWA funktioniert nicht?

1. **HTTPS erforderlich** (außer localhost)
2. **manifest.json** muss erreichbar sein
3. **Service Worker** muss registriert sein
4. **Icons** müssen vorhanden sein

### Änderungen werden nicht angezeigt?

1. **Hard Reload:** `Cmd+Shift+R`
2. **Cache leeren**
3. **Service Worker deregistrieren**
4. **Browser neu starten**

---

## 💡 Best Practices

### Development
- Verwende **Chrome DevTools** für Debugging
- Teste auf **echten Geräten** (nicht nur Emulator)
- Nutze **Git** für Versionskontrolle
- Schreibe **klare Commit Messages**

### Code
- Halte **Funktionen klein** und fokussiert
- Nutze **aussagekräftige Variablennamen**
- Kommentiere **komplexen Code**
- Vermeide **globale Variablen**

### Testing
- Teste **alle Browser**
- Teste **Offline-Modus**
- Teste **verschiedene Bildschirmgrößen**
- Teste **Import/Export** mit echten Daten

---

## 🎯 Nächste Schritte

Mögliche Verbesserungen:
- [ ] Automatische Tests hinzufügen
- [ ] TypeScript verwenden
- [ ] Build-Prozess (Webpack/Vite)
- [ ] CSS-Präprozessor (SCSS)
- [ ] Linting (ESLint)
- [ ] Code-Formatierung (Prettier)
- [ ] CI/CD Pipeline
- [ ] Backend-Integration

---

**© 2025 David Staron**

Viel Erfolg beim Entwickeln! 🎵
