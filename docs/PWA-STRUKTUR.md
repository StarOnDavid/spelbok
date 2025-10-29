# 📁 PWA Dateistruktur

## Erforderliche Dateien für PWA-Deployment

```
musik-repertoire-pwa/
│
├── musik-repertoire.html      # Haupt-App-Datei (öffne diese im Browser)
├── manifest.json              # PWA Manifest (App-Metadaten, Icons)
├── sw.js                      # Service Worker (Offline-Funktionalität)
│
├── icons/                     # App-Icons für verschiedene Plattformen
│   ├── icon-72x72.png        # Kleinste Größe
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png      # iOS Standard
│   ├── icon-192x192.png      # Android Standard
│   ├── icon-384x384.png
│   └── icon-512x512.png      # Größte Größe
│
├── test-data.json            # Optional: Test-Daten zum Importieren
├── README.md                  # Dokumentation
└── PWA-INSTALLATION.md        # Installationsanleitung

```

## 📦 Deployment-Checkliste

### Für lokale Nutzung:
- ✅ Alle Dateien in einem Ordner
- ✅ HTML-Datei im Browser öffnen
- ✅ Fertig!

### Für Web-Hosting (HTTPS erforderlich):
- ✅ Alle Dateien hochladen
- ✅ Verzeichnisstruktur beibehalten
- ✅ HTTPS muss aktiviert sein
- ✅ MIME-Types konfigurieren:
  - `.json` → `application/json`
  - `.js` → `application/javascript`
  - `.png` → `image/png`

### Für GitHub Pages:
1. Repository erstellen
2. Alle Dateien committen:
   ```bash
   git add .
   git commit -m "Initial PWA commit"
   git push origin main
   ```
3. GitHub Pages aktivieren (Settings → Pages → Branch: main)
4. URL: `https://username.github.io/repo-name/musik-repertoire.html`

## 🔧 Wichtige Hinweise

### Service Worker Cache
Der Service Worker cached folgende Dateien:
- `musik-repertoire.html`
- `manifest.json`

**Nach Updates:**
- Cache-Version in `sw.js` erhöhen (z.B. `v1` → `v2`)
- Service Worker wird automatisch aktualisiert beim nächsten Besuch

### Icons
- **Minimum:** icon-192x192.png und icon-512x512.png
- **iOS optimal:** icon-152x152.png
- **Alle Größen empfohlen** für beste Kompatibilität

### Manifest.json
Wichtige Eigenschaften:
- `start_url`: Startseite der App
- `display: standalone`: Vollbild-Modus
- `theme_color`: Farbe der Browser-UI
- `background_color`: Splash Screen Hintergrund

## 🌐 Hosting-Anbieter

### Kostenlose Optionen:
1. **GitHub Pages** ⭐ (empfohlen)
   - Kostenlos
   - Automatisches HTTPS
   - Einfaches Deployment

2. **Netlify**
   - Kostenlos
   - Drag & Drop
   - Automatisches HTTPS

3. **Vercel**
   - Kostenlos
   - GitHub-Integration
   - Automatisches Deployment

4. **Cloudflare Pages**
   - Kostenlos
   - Schnell (CDN)
   - Automatisches HTTPS

### Eigener Server:
- Apache/Nginx mit Let's Encrypt (HTTPS)
- Alle Dateien in public_html oder www
- .htaccess für MIME-Types (Apache)

## 📊 Größe & Performance

**Gesamtgröße:**
- HTML: ~45 KB (komprimiert)
- manifest.json: ~1 KB
- sw.js: ~2 KB
- Icons gesamt: ~50 KB
- **Total: ~100 KB** 🎉

**Ladezeit:**
- Erstbesuch: < 1 Sekunde
- Wiederholter Besuch (gecached): < 100ms
- Offline: Sofort

## 🔄 Update-Prozess

### Automatische Updates:
1. Nutzer öffnet App
2. Service Worker prüft auf Updates
3. Neue Version wird heruntergeladen
4. Beim nächsten Start: neue Version aktiv

### Manuelle Updates (für Entwickler):
1. Dateien aktualisieren
2. Cache-Version in `sw.js` erhöhen
3. Auf Server hochladen
4. Nutzer bekommen Update automatisch

## 🐛 Debugging

### Browser DevTools:
```
F12 → Application Tab → Service Workers
```

Prüfe:
- ✅ Service Worker Status: "activated and running"
- ✅ Cache Storage: Dateien gecached
- ✅ Manifest: Korrekt geladen

### Console Logs:
```javascript
// In Browser-Konsole:
navigator.serviceWorker.getRegistrations()
  .then(regs => console.log(regs));
```

## 📱 Testing auf Geräten

### iOS/Safari:
1. Über HTTPS hosten
2. In Safari öffnen
3. Web Inspector aktivieren (Einstellungen → Safari → Erweitert)
4. Console-Logs prüfen

### Android/Chrome:
1. Über HTTPS hosten
2. In Chrome öffnen
3. Chrome DevTools Remote Debugging
4. Lighthouse-Audit durchführen

---

**Bei Problemen:** Siehe [PWA-INSTALLATION.md](PWA-INSTALLATION.md) → Fehlerbehebung

© 2025 David Staron
