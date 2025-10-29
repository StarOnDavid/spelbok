# 🚀 GitHub Deployment Guide - SpelBok

## Schritt 1: GitHub Repository erstellen

### Option A: Via GitHub Website (Einfachste Methode)

1. **Gehe zu GitHub.com**
   - Öffne: https://github.com/new
   - Oder klicke auf das "+" Icon oben rechts → "New repository"

2. **Repository konfigurieren**
   ```
   Repository name: spelbok
   Description: 🎵 SpelBok - Din digitala spelbok (Your digital songbook)
   
   Visibility: ✅ Public (für GitHub Pages kostenlos)
   
   ⚠️ WICHTIG: Folgende NICHT aktivieren:
   ❌ Initialize this repository with a README
   ❌ Add .gitignore
   ❌ Choose a license
   
   (Wir haben schon alles lokal!)
   ```

3. **Klicke auf "Create repository"**

### Option B: Via GitHub CLI (für Fortgeschrittene)

```bash
# GitHub CLI installieren (falls nicht vorhanden)
brew install gh

# Login
gh auth login

# Repository erstellen
gh repo create spelbok --public --source=. --remote=origin --push
```

---

## Schritt 2: Lokales Repository mit GitHub verbinden

Nach dem Erstellen zeigt dir GitHub diese Befehle. Führe sie in deinem Terminal aus:

```bash
cd /Users/davidstaron/src/spel_bok

# Remote hinzufügen (ERSETZE "deinusername" mit deinem GitHub Username!)
git remote add origin https://github.com/deinusername/spelbok.git

# Oder mit SSH (wenn du SSH Keys eingerichtet hast):
# git remote add origin git@github.com:deinusername/spelbok.git

# Branch umbenennen zu main (falls noch master)
git branch -M main

# Code zu GitHub pushen
git push -u origin main
```

### Remote überprüfen:
```bash
git remote -v
# Sollte zeigen:
# origin  https://github.com/deinusername/spelbok.git (fetch)
# origin  https://github.com/deinusername/spelbok.git (push)
```

---

## Schritt 3: GitHub Pages aktivieren

### Via GitHub Website:

1. **Gehe zu deinem Repository**
   - URL: `https://github.com/deinusername/spelbok`

2. **Öffne Settings**
   - Klicke oben auf **"Settings"** (Zahnrad-Icon)

3. **Navigiere zu Pages**
   - Links im Menü: **"Pages"**

4. **Konfiguriere GitHub Pages**
   ```
   Source:
   ✅ Deploy from a branch
   
   Branch:
   ✅ main
   ✅ / (root)
   
   Klicke auf "Save"
   ```

5. **Warte 1-2 Minuten**
   - GitHub baut deine Seite
   - Oben erscheint ein grüner Banner mit der URL

6. **Deine App ist live! 🎉**
   ```
   https://deinusername.github.io/spelbok/
   ```

### Via GitHub CLI (Alternative):

```bash
gh repo edit --enable-pages --pages-branch main
```

---

## Schritt 4: Testen

1. **Öffne die URL in deinem Browser**
   ```
   https://deinusername.github.io/spelbok/
   ```

2. **Teste die App**
   - ✅ Lädt die Seite?
   - ✅ CSS korrekt geladen?
   - ✅ JavaScript funktioniert?
   - ✅ Sprache wechseln funktioniert?
   - ✅ Lied hinzufügen funktioniert?
   - ✅ PWA installierbar?

3. **PWA auf Handy installieren**
   - Öffne die URL auf deinem Smartphone
   - Folge der PWA-Installationsanleitung in docs/PWA-INSTALLATION.md

---

## Schritt 5: Zukünftige Updates

Wenn du Änderungen machst, pushe sie einfach zu GitHub:

```bash
# Änderungen machen...
git add .
git commit -m "Deine Änderung beschreiben"
git push origin main

# GitHub Pages aktualisiert automatisch nach 1-2 Minuten!
```

---

## 🔧 Troubleshooting

### Problem: "remote origin already exists"
```bash
# Alten Remote entfernen
git remote remove origin

# Neuen hinzufügen
git remote add origin https://github.com/deinusername/spelbok.git
```

### Problem: "Permission denied"
**Lösung 1 - HTTPS mit Token:**
1. Gehe zu GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Aktiviere: `repo` scope
4. Kopiere das Token
5. Bei `git push` Username eingeben und Token als Passwort verwenden

**Lösung 2 - SSH Keys:**
```bash
# SSH Key generieren
ssh-keygen -t ed25519 -C "deine@email.com"

# Public Key kopieren
cat ~/.ssh/id_ed25519.pub

# Füge den Key zu GitHub hinzu:
# GitHub → Settings → SSH and GPG keys → New SSH key
```

### Problem: "404 Not Found" nach GitHub Pages Aktivierung
- Warte 2-3 Minuten
- Stelle sicher, dass `index.html` im Root-Verzeichnis liegt
- Überprüfe, dass der Branch "main" heißt
- Cache leeren und neu laden (Cmd+Shift+R / Ctrl+Shift+R)

### Problem: CSS/JS werden nicht geladen (404)
**Überprüfe die Pfade in index.html:**
```html
<!-- Sollte RELATIV sein: -->
<link rel="stylesheet" href="assets/css/styles.css">
<script src="assets/js/app.js"></script>

<!-- NICHT absolut: -->
<link rel="stylesheet" href="/assets/css/styles.css">
```

**Oder für GitHub Pages Sub-Path:**
```html
<link rel="stylesheet" href="./assets/css/styles.css">
<script src="./assets/js/app.js"></script>
```

### Problem: Service Worker funktioniert nicht
- GitHub Pages nutzt HTTPS automatisch ✅
- Öffne Browser DevTools (F12) → Application → Service Workers
- Prüfe ob registriert: "spelbok-v2.0.0"

---

## 📱 Custom Domain (Optional)

Falls du eine eigene Domain hast (z.B. spelbok.se):

1. **In GitHub:**
   - Settings → Pages → Custom domain
   - Eingabe: `spelbok.se`
   - Speichern

2. **Bei deinem Domain-Provider:**
   ```
   DNS Records hinzufügen:
   
   A Records:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   
   CNAME Record:
   www → deinusername.github.io
   ```

3. **Warte 24-48h** für DNS-Propagierung

---

## 🎉 Fertig!

Deine App ist jetzt:
- ✅ Auf GitHub gesichert (Versionskontrolle)
- ✅ Online verfügbar (GitHub Pages)
- ✅ Automatisch deployt bei jedem Push
- ✅ Kostenlos gehostet
- ✅ HTTPS-gesichert
- ✅ PWA-installierbar

**URL merken:**
```
https://deinusername.github.io/spelbok/
```

**Teile diese URL mit Freunden und Musikern! 🎵**

---

## 📊 Monitoring

### GitHub Actions (kommt automatisch)
- Jeder Push triggert einen Deployment
- Siehe: Repository → Actions

### Analytics (optional)
- Google Analytics einbauen
- Plausible Analytics (Privacy-friendly)
- GitHub Traffic Stats (Settings → Insights)

---

**Erstellt für SpelBok v2.0.0** | David Staron © 2025
