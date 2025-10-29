# 🎵 SpelBok - Your digital songbook

**[🇸🇪 Svenska](README.sv.md)** | **[🇩🇪 Deutsch](../README.md)**

---

A modern Progressive Web App for managing your music repertoire - fully functional offline!

> **SpelBok** (Swedish) = Songbook/Playbook for musicians

## ✨ Features

### 📱 **Progressive Web App (PWA)**
- ✅ **Installable** on iPhone, iPad, Android and Desktop
- ✅ **Offline functionality** - use the app without internet
- ✅ **Native app experience** - runs fullscreen without browser
- ✅ **Automatic updates** - always the latest version
- ✅ **Small storage requirement** - only ~50 KB instead of several MB
- ✅ **Home screen icon** - quick access like a real app

### 🌐 **Multilingual**
- **Svenska (Swedish)** - Default language
- **Deutsch (German)** - Complete German translation
- **English** - Complete English translation
- Language selection in the top right corner
- Language choice is saved automatically

### 📊 **Data Management**
- ✅ Add, edit & delete songs
- ✅ 15 data fields for comprehensive documentation
- ✅ Automatic saving in localStorage
- ✅ Data persists in the browser
- ✅ Reliable ID system prevents accidental deletion of multiple entries

### 🔍 **Search and Filter Functions**
- Full-text search across all fields
- Filter by region (Landskap)
- Filter by difficulty level
- Filter by type (Traditional/New/Modern)

### 📥 **Import & Export**
- Export your repertoire as JSON file
- Import JSON files (backup function)
- **Automatic duplicate detection**: During import, songs that already exist (all fields identical) are automatically skipped
- Back up your data regularly!

### 📱 **Responsive Design**
- Works on Desktop, Tablet and Smartphone
- Modern design with gradient background
- Clear table view

## 🚀 Installation & Usage

### 🌟 Install as PWA (RECOMMENDED for iOS/iPad)

The app can be installed as a Progressive Web App and then runs like a native app!

#### iPhone/iPad (Safari):
1. **Open the app URL** in Safari (e.g. https://StarOnDavid.github.io/spelbok/)
2. Tap the **Share icon** (□↑)
3. Select **"Add to Home Screen"**
4. Tap **"Add"**
5. **Done!** The app is now on your home screen as "SpelBok"

#### Android (Chrome):
1. **Open Chrome** and open the app
2. Tap **"Install app"** in the banner
3. Or: Menu (⋮) → **"Install app"**
4. **Done!** App runs like a native app

#### Desktop (Chrome/Edge):
1. Open the app in the browser
2. Click on the **⊕ icon** in the address bar
3. Click **"Install"**

**✨ Advantages of PWA installation:**
- 📱 Runs fullscreen (no browser)
- 🚀 Works offline
- ⚡ Faster startup
- 🏠 Own icon on home screen
- 🔄 Automatic updates

---

### 📱 PWA vs. normal usage

| Feature | PWA (installed) | Normal (browser) |
|---------|-----------------|------------------|
| **Offline** | ✅ Yes | ❌ No |
| **Home Icon** | ✅ Yes | ❌ No |
| **Fullscreen** | ✅ Yes | ❌ No |
| **Faster Start** | ✅ Yes | 🟡 Slower |
| **Updates** | ✅ Automatic | 🟡 Manual |

**Recommendation:** For the best experience on mobile devices, use PWA installation!

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript must be enabled
- No internet connection required

## 📋 Data Fields

The app captures the following information for each song:

1. **Title** - Song name (e.g. Bingsjöpolska efter Hjort Anders)
2. **Låttyp** - Type of song (e.g. Polska, Vals, Slängpolska)
3. **Efter/Av** - Composer or source
4. **Place** - City or village
5. **Landskap** - Region (e.g. Dalarna, Skåne)
6. **Country** - Country (e.g. Sweden, Norway)
7. **Key** - Musical key
8. **Difficulty** - Difficulty level (Easy/Medium/Hard/Very hard)
9. **Challenges** - Challenges and practice focus
10. **Who did I learn the song from?** - Your teacher or source
11. **Where can I find a recording?** - Location of recording
12. **Sheet music?** - Availability of sheet music
13. **Instrument comment** - Comments about instrument
14. **Traditional or new** - Traditional, New or Modern interpretation
15. **Other comments** - Additional notes

## 💾 Data Security

### Where is the data stored?
Data is stored in your browser's **localStorage**:
- ✅ Automatic saving with every change
- ✅ Data persists after browser restart
- ✅ No cloud, no external database

### ⚠️ Important Notes
- **Don't clear browser cache** - or your data will be lost!
- **Create regular backups** using the export function
- **Private browsing** doesn't save data permanently

### Create Backup
1. Click "📥 Export JSON"
2. Save the JSON file in a safe location
3. If needed: Import the file with "📤 Import JSON"

### Import with Duplicate Detection
When importing JSON files, the app automatically checks for duplicates:
- **Duplicate check**: Songs are identified as duplicates if ALL fields (except ID) are identical
- **Automatic skip**: Duplicates are not imported
- **Status message**: You'll receive a message about how many songs were imported and how many were skipped
- **Example**: If you import 20 songs and 5 already exist, only 15 new ones will be added

This protects against accidental duplicate import of the same data!

## 🌐 Change Language

1. Click the **Globe icon** 🌐 in the top right
2. Select your desired language:
   - **Svenska** (Swedish)
   - **Deutsch** (German)
   - **English** (English)
3. The entire user interface is translated immediately
4. Your language choice is saved automatically

## 🎯 Usage Tips

### Work Efficiently
- Use **search** for quick access to specific songs
- Use **filters** to sort your repertoire by categories
- The **statistics** show you the composition of your repertoire at a glance

### Best Practices
- Fill in as many fields as possible - the more information, the better
- Use the "Challenges" field for practice notes
- Link recordings directly (YouTube, Spotify, etc.)
- Create a backup of your data weekly

## 🛠️ Technical Details

### Modern Architecture (v2.0.0)
The app uses a **modular structure** with separate files:

**Structure:**
```
spelbok/
├── index.html           # Main HTML (Entry Point)
├── manifest.json        # PWA Configuration
├── sw.js               # Service Worker (Cache v2.0.0)
├── assets/
│   ├── css/styles.css  # Stylesheet (7.4 KB)
│   └── js/app.js       # App Logic (14 KB)
└── docs/               # Documentation
```

**Service Worker (spelbok-v2.0.0):**
- Enables offline functionality
- Caches HTML, CSS, JS and manifest.json
- Automatic updates in the background

**Web App Manifest:**
- Name: "SpelBok - Din digitala spelbok"
- Defines app properties (icons, colors, start URL)
- Enables installation on home screen
- iOS and Android optimized

**LocalStorage API:**
- Persistent data storage in browser
- No server connection required
- Data remains available offline

### ID System
Each song receives a unique ID when created in the format `song_timestamp_randomstring`. This ID:
- Is generated automatically
- Is not visible to the user
- Ensures safe deletion and editing operations
- Prevents conflicts during import/export
- For existing data, old IDs are automatically migrated

### Technology Stack
- **HTML5, CSS3, ES6 JavaScript** - no frameworks, pure vanilla JS
- **localStorage API** - for data storage
- **Responsive design** - works on all devices
- **Progressive Web App** - with Service Worker and Manifest
- **Multilingual** - Swedish, German, English

### Browser Compatibility
- ✅ Chrome/Chromium (from version 60)
- ✅ Firefox (from version 50)
- ✅ Safari (from version 11)
- ✅ Edge (from version 79)
- ✅ Opera (from version 47)

## 📄 License & Copyright

**© 2025 David Staron**

This app is freely usable for private and commercial purposes.

---

## 🎵 Enjoy SpelBok!
