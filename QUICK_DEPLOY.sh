#!/bin/bash
# 🚀 SpelBok Quick Deploy Script
# Automatisiert das GitHub Setup (teilweise)

echo "🎵 SpelBok - GitHub Deployment Helper"
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Kein Git Repository gefunden!"
    echo "Führe aus: git init"
    exit 1
fi

echo "✅ Git Repository gefunden"
echo ""

# Ask for GitHub username
read -p "GitHub Username: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ Username erforderlich!"
    exit 1
fi

REPO_NAME="spelbok"
REPO_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"

echo ""
echo "Repository URL: $REPO_URL"
echo ""

# Check if remote exists
if git remote | grep -q "origin"; then
    echo "⚠️  Remote 'origin' existiert bereits"
    read -p "Entfernen und neu erstellen? (y/n): " REMOVE_REMOTE
    if [ "$REMOVE_REMOTE" = "y" ]; then
        git remote remove origin
        echo "✅ Alter Remote entfernt"
    else
        echo "❌ Abgebrochen"
        exit 1
    fi
fi

# Add remote
echo "📡 Füge Remote hinzu..."
git remote add origin "$REPO_URL"

if [ $? -eq 0 ]; then
    echo "✅ Remote hinzugefügt"
else
    echo "❌ Fehler beim Hinzufügen des Remote"
    exit 1
fi

# Verify remote
echo ""
echo "🔍 Remote Konfiguration:"
git remote -v

echo ""
echo "======================================"
echo "✅ Setup abgeschlossen!"
echo ""
echo "Nächste Schritte:"
echo ""
echo "1. Erstelle das Repository auf GitHub:"
echo "   → https://github.com/new"
echo "   → Name: $REPO_NAME"
echo "   → Public"
echo "   → KEINE README, .gitignore oder License hinzufügen!"
echo ""
echo "2. Dann führe aus:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Aktiviere GitHub Pages:"
echo "   → Repo Settings → Pages"
echo "   → Source: main branch / (root)"
echo "   → Save"
echo ""
echo "4. Deine App ist dann live unter:"
echo "   https://$GITHUB_USER.github.io/$REPO_NAME/"
echo ""
echo "📖 Vollständige Anleitung: GITHUB_DEPLOYMENT.md"
echo "======================================"
