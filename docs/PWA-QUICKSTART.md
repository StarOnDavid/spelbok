# 🚀 PWA Quick Start

## ⚡ In 5 Minuten zur installierbaren App!

### Option A: Lokal nutzen (sofort)
1. Öffne `musik-repertoire.html` im Browser
2. Die App funktioniert!
3. Für Installation als PWA: Siehe unten

### Option B: Auf GitHub Pages hosten (5 Minuten)

#### 1. GitHub Repository erstellen
```bash
# Gehe zu github.com und erstelle ein neues Repository
# Name z.B.: musik-repertoire
```

#### 2. Dateien hochladen
**Wichtig:** Lade alle folgenden Dateien und Ordner hoch:
- ✅ `musik-repertoire.html`
- ✅ `manifest.json`
- ✅ `sw.js`
- ✅ `icons/` (kompletter Ordner mit allen PNG-Dateien)

**Via Git:**
```bash
git clone https://github.com/username/musik-repertoire.git
cd musik-repertoire

# Kopiere alle Dateien in diesen Ordner
cp musik-repertoire.html manifest.json sw.js ./
cp -r icons ./

git add .
git commit -m "Initial PWA version"
git push origin main
```

**Via Web-Interface:**
- Drag & Drop alle Dateien auf GitHub
- Oder: "Add file" → "Upload files"

#### 3. GitHub Pages aktivieren
1. Gehe zu: Repository → **Settings** → **Pages**
2. Source: **main** branch
3. Save
4. Warte 1-2 Minuten

#### 4. Fertig! 🎉
Deine App ist jetzt verfügbar unter:
```
https://username.github.io/musik-repertoire/musik-repertoire.html
```

### Installation auf Geräten

#### iPhone/iPad:
1. Öffne die URL in **Safari**
2. Teilen-Button → **"Zum Home-Bildschirm"**
3. Fertig!

#### Android:
1. Öffne die URL in **Chrome**
2. **"App installieren"** im Popup
3. Fertig!

#### Desktop:
1. Öffne die URL in **Chrome/Edge**
2. Klicke auf **⊕ Symbol** in der Adressleiste
3. **"Installieren"**
4. Fertig!

---

## 🔍 Überprüfen ob alles funktioniert

### Checklist:
- ✅ App öffnet sich im Browser
- ✅ Keine Fehler in der Browser-Konsole (F12)
- ✅ "Service Worker registered successfully" in der Konsole
- ✅ Manifest.json wird geladen (Network-Tab)
- ✅ Icons werden angezeigt
- ✅ Install-Button erscheint (bei HTTPS)

### Test: Offline-Modus
1. Öffne die App
2. Warte 5 Sekunden (Service Worker lädt)
3. Gehe offline (Flugmodus oder Netzwerk trennen)
4. Lade die Seite neu
5. ✅ App sollte weiterhin funktionieren!

---

## 📱 Alternative Hosting-Optionen

### Netlify (Drag & Drop):
1. Gehe zu **netlify.com**
2. Drag & Drop den kompletten Ordner
3. Fertig! URL: `https://random-name.netlify.app`

### Vercel:
1. Gehe zu **vercel.com**
2. Import Repository oder Upload
3. Fertig! URL: `https://projekt-name.vercel.app`

### Cloudflare Pages:
1. Gehe zu **pages.cloudflare.com**
2. Connect GitHub Repository
3. Deploy
4. Fertig!

---

## 🎯 Empfohlener Workflow

### Für Entwicklung:
```
Lokal bearbeiten → Testen → Zu GitHub pushen → Automatisches Deployment
```

### Für Updates:
```
1. Dateien bearbeiten
2. Cache-Version in sw.js erhöhen (CACHE_NAME = 'v2')
3. Hochladen/Pushen
4. Nutzer bekommen automatisch die neue Version
```

---

## 💡 Pro-Tipps

### Custom Domain (Optional):
- GitHub Pages unterstützt Custom Domains
- Einstellungen → Pages → Custom Domain
- Z.B.: `repertoire.meinedomain.de`

### Schnellere Ladezeiten:
- GitHub Pages nutzt CDN (weltweit schnell)
- Netlify/Vercel ebenfalls CDN
- Optimal für globale Nutzer

### Analytics (Optional):
- Google Analytics Code in HTML einfügen
- Oder: Netlify/Vercel Analytics nutzen

---

## 🐛 Häufige Probleme

### "Service Worker not registered"
- **Lösung:** Stelle sicher, dass `sw.js` im gleichen Verzeichnis wie die HTML-Datei liegt
- Oder: HTTPS verwenden (nicht `file://`)

### Icons werden nicht angezeigt
- **Lösung:** Prüfe, ob `icons/` Ordner hochgeladen wurde
- Pfade in `manifest.json` prüfen

### "Add to Home Screen" erscheint nicht
- **Lösung:** 
  - iOS: Nur Safari unterstützt PWA-Installation
  - Android: Nur Chrome/Edge
  - Desktop: HTTPS erforderlich

### App lädt nicht offline
- **Lösung:**
  - Warte 10 Sekunden nach dem ersten Laden
  - Service Worker muss sich registrieren
  - Console prüfen: "activated and running"

---

**Weitere Hilfe:** Siehe [PWA-INSTALLATION.md](PWA-INSTALLATION.md) für detaillierte Anleitungen

**Viel Erfolg!** 🚀

© 2025 David Staron
