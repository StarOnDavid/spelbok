# 📱 PWA Installationsanleitung

## Was ist eine PWA (Progressive Web App)?

Eine Progressive Web App kombiniert das Beste aus Web und nativen Apps:
- ✅ **Funktioniert offline** - nutze die App auch ohne Internet
- ✅ **Wie eine native App** - läuft im Vollbild ohne Browser-UI
- ✅ **Eigenes Icon** auf dem Home-Bildschirm
- ✅ **Schnell & reaktionsschnell** - optimierte Performance
- ✅ **Automatische Updates** - immer die neueste Version
- ✅ **Kleine Größe** - nur ~50 KB im Vergleich zu mehreren MB bei nativen Apps

---

## 🍎 Installation auf iPhone/iPad

### Schritt 1: Safari öffnen
Die PWA funktioniert am besten mit Safari (iOS Standard-Browser).

### Schritt 2: App öffnen
Navigiere zu: `musik-repertoire.html` in Safari

### Schritt 3: Zum Home-Bildschirm hinzufügen
1. Tippe auf das **Teilen-Symbol** (Quadrat mit Pfeil nach oben)
2. Scrolle nach unten und wähle **"Zum Home-Bildschirm"**
3. Bearbeite den Namen falls gewünscht (Standard: "Repertoire")
4. Tippe auf **"Hinzufügen"**

### Schritt 4: Fertig! 🎉
- Die App erscheint als Icon auf deinem Home-Bildschirm
- Tippe darauf zum Öffnen - läuft jetzt wie eine native App!
- Funktioniert auch ohne Internet (Offline-Modus)

---

## 🤖 Installation auf Android

### Schritt 1: Chrome öffnen
Die PWA funktioniert am besten mit Chrome.

### Schritt 2: App öffnen
Navigiere zu: `musik-repertoire.html` in Chrome

### Schritt 3: Installation
**Variante A - Automatischer Prompt:**
- Wenn du die App das erste Mal besuchst, erscheint ein Banner
- Tippe auf **"Installieren"** oder **"Zum Startbildschirm hinzufügen"**

**Variante B - Manuell:**
1. Tippe auf das **Drei-Punkte-Menü** (⋮)
2. Wähle **"App installieren"** oder **"Zum Startbildschirm hinzufügen"**
3. Bestätige mit **"Installieren"**

### Schritt 4: Fertig! 🎉
Die App ist installiert und läuft wie eine native App!

---

## 💻 Installation auf Desktop (Windows/Mac/Linux)

### Chrome / Edge / Brave:
1. Öffne die App im Browser
2. Klicke auf das **⊕ Icon** in der Adressleiste (oder **Menü → App installieren**)
3. Klicke auf **"Installieren"**
4. Die App öffnet sich in einem eigenen Fenster

### Safari (Mac):
1. Öffne die App in Safari
2. Gehe zu **Ablage → Zum Dock hinzufügen**
3. Die App erscheint im Dock

---

## 🌐 Hosting-Optionen für PWA

Damit die PWA auf allen Geräten funktioniert, muss sie über HTTPS gehostet werden.

### Option 1: GitHub Pages (Kostenlos & Einfach) ⭐
```bash
1. Erstelle ein GitHub Repository
2. Lade alle Dateien hoch:
   - musik-repertoire.html
   - manifest.json
   - sw.js
   - icons/ (Ordner)
3. Aktiviere GitHub Pages in den Repository-Einstellungen
4. Deine App ist verfügbar unter: https://username.github.io/repo-name/
```

### Option 2: Netlify (Kostenlos)
1. Gehe zu netlify.com
2. Drag & Drop deinen Ordner
3. Fertig - automatisches HTTPS!

### Option 3: Vercel (Kostenlos)
1. Gehe zu vercel.com
2. Importiere dein GitHub Repo oder lade Dateien hoch
3. Automatisches Deployment & HTTPS

### Option 4: Eigener Server
- Stelle sicher, dass HTTPS aktiviert ist (Let's Encrypt ist kostenlos)
- Lade alle Dateien hoch
- Konfiguriere MIME-Types für `.json` und `.js`

---

## ✅ Checkliste: Ist meine PWA richtig installiert?

Nach der Installation sollte die App:
- ✅ Ein eigenes Icon auf dem Home-Bildschirm haben
- ✅ Im Vollbild öffnen (keine Browser-Adressleiste)
- ✅ Offline funktionieren (teste: Flugmodus → App öffnen)
- ✅ Schnell laden
- ✅ Daten lokal speichern (Songs bleiben erhalten)

---

## 🔧 Fehlerbehebung

### App wird nicht installiert / kein Install-Button
- **iOS**: Nutze Safari (kein Chrome!)
- **Android**: Nutze Chrome
- **Desktop**: Nutze Chrome, Edge oder Brave
- Stelle sicher, dass die App über HTTPS läuft (nicht `file://`)

### Offline-Modus funktioniert nicht
- Öffne die Browser-Konsole (F12)
- Prüfe: "Service Worker registered successfully" in den Logs
- Bei Problemen: Cache leeren und neu installieren

### App wird nicht aktualisiert
- PWAs aktualisieren sich automatisch beim nächsten Start
- Manuell: Cache in den Browser-Einstellungen löschen
- Oder: App deinstallieren und neu installieren

### Icons werden nicht angezeigt
- Stelle sicher, dass der `icons/` Ordner mit hochgeladen wurde
- Prüfe den Pfad in `manifest.json`
- Browser-Cache leeren

---

## 📊 PWA Features im Detail

### Offline-Funktionalität
- **Service Worker** cached die App-Dateien
- Funktioniert auch ohne Internet
- Daten werden lokal in localStorage gespeichert

### Native App Feeling
- **Standalone Display** - kein Browser-UI
- **Splash Screen** beim Start (iOS)
- **Optimierte Performance**

### Geringer Speicherbedarf
- Gesamt: **~50-100 KB**
- Im Vergleich: Native Apps sind oft 50-200 MB groß

---

## 🚀 Nächste Schritte

1. **Installiere die App** auf deinen Geräten
2. **Teste Offline-Modus** - Flugmodus aktivieren und App nutzen
3. **Erstelle Backups** - nutze Export-Funktion regelmäßig
4. **Teile die App** - sende den Link an andere Musiker!

---

**Bei Fragen oder Problemen:** Öffne die Browser-Console (F12) für detaillierte Logs.

© 2025 David Staron | PWA Version 1.0
