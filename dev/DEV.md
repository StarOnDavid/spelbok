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
