// ============================================
// Musik Repertoire WebApp - Main JavaScript
// © 2025 David Staron
// ============================================

// === TRANSLATIONS ===
const translations = {
    sv: {
        appTitle: "Musik Repertoire",
        appSubtitle: "Hantera ditt musikrepertoar",
        totalSongs: "Totala låtar",
        traditionalSongs: "Traditionella",
        newSongs: "Nya",
        addNewSong: "Lägg till ny låt",
        editSong: "Redigera låt",
        titel: "Titel",
        titelPlaceholder: "T.ex. Bingsjöpolska, Polska efter Hjort Anders",
        lattyp: "Låttyp",
        lattypPlaceholder: "T.ex. Polska, Vals, Slängpolska",
        efterAv: "Efter/Av",
        efterAvPlaceholder: "Kompositör eller källa",
        ort: "Ort",
        ortPlaceholder: "Stad eller by",
        landskap: "Landskap",
        landskapPlaceholder: "T.ex. Dalarna, Skåne",
        land: "Land",
        landPlaceholder: "T.ex. Sverige, Norge",
        tonart: "Tonart",
        tonartPlaceholder: "T.ex. A-dur, d-moll",
        svarighetsgrad: "Svårighetsgrad",
        chooseDifficulty: "Välj svårighetsgrad",
        easy: "Lätt",
        medium: "Medel",
        hard: "Svår",
        veryHard: "Mycket svår",
        utmaningar: "Utmaningar / Bra att jobba på med låten",
        utmaningarPlaceholder: "Tekniska utmaningar, specifika delar att öva på...",
        lardeAv: "Av vem lärde jag mig låten?",
        lardeAvPlaceholder: "Lärare eller källa",
        inspelning: "Var hittar jag inspelning?",
        inspelningPlaceholder: "URL eller plattform",
        noter: "Not?",
        noterPlaceholder: "Finns noter?",
        instrumentKommentar: "Instrument kommentar",
        instrumentPlaceholder: "T.ex. Fiol, Nyckelharpa",
        tradEllerNy: "Trad eller ny",
        chooseType: "Välj typ",
        traditional: "Traditionell",
        new: "Ny",
        modernInterpretation: "Modern tolkning",
        andraKommentarer: "Andra kommentarer",
        andraKommentarerPlaceholder: "Övriga anteckningar och kommentarer...",
        cancel: "Avbryt",
        addSong: "Lägg till låt",
        updateSong: "Uppdatera låt",
        filterTitle: "Filtrera",
        resetFilters: "Återställ filter",
        search: "Sök",
        searchPlaceholder: "Sök i alla fält...",
        allLandskap: "Alla landskap",
        allDifficulties: "Alla svårighetsgrader",
        allTypes: "Alla typer",
        repertoire: "Repertoar",
        exportJson: "Exportera JSON",
        importJson: "Importera JSON",
        actions: "Åtgärder",
        edit: "Redigera",
        delete: "Ta bort",
        noSongsYet: "Ingen låtar ännu",
        addFirstSong: "Lägg till din första låt med formuläret ovan",
        noMatchingFilters: "Inga låtar matchar filtren",
        tryChangingFilters: "Prova att ändra dina filterinställningar",
        confirmDelete: "Är du säker på att du vill ta bort denna låt?",
        confirmImport: "Vill du importera {count} låtar? Detta kommer att lägga till dem till din befintliga samling.",
        importSuccess: "Import lyckades!",
        duplicatesSkipped: "{count} dubbletter hoppades över.",
        allDuplicates: "Alla {count} låtar finns redan i din samling.",
        invalidFileFormat: "Ogiltig fil format. Vänligen välj en giltig JSON-fil.",
        importError: "Fel vid import: {error}"
    },
    de: {
        appTitle: "Musik Repertoire",
        appSubtitle: "Verwalte dein Musikrepertoire",
        totalSongs: "Gesamt Lieder",
        traditionalSongs: "Traditionell",
        newSongs: "Neue",
        addNewSong: "Neues Lied hinzufügen",
        editSong: "Lied bearbeiten",
        titel: "Titel",
        titelPlaceholder: "Z.B. Bingsjöpolska, Polska nach Hjort Anders",
        lattyp: "Liedtyp",
        lattypPlaceholder: "Z.B. Polska, Walzer, Slängpolska",
        efterAv: "Nach/Von",
        efterAvPlaceholder: "Komponist oder Quelle",
        ort: "Ort",
        ortPlaceholder: "Stadt oder Dorf",
        landskap: "Region",
        landskapPlaceholder: "Z.B. Dalarna, Skåne",
        land: "Land",
        landPlaceholder: "Z.B. Schweden, Norwegen",
        tonart: "Tonart",
        tonartPlaceholder: "Z.B. A-Dur, d-Moll",
        svarighetsgrad: "Schwierigkeitsgrad",
        chooseDifficulty: "Schwierigkeit wählen",
        easy: "Leicht",
        medium: "Mittel",
        hard: "Schwer",
        veryHard: "Sehr schwer",
        utmaningar: "Herausforderungen / Gut zum Üben",
        utmaningarPlaceholder: "Technische Herausforderungen, spezifische Teile zum Üben...",
        lardeAv: "Von wem habe ich das Lied gelernt?",
        lardeAvPlaceholder: "Lehrer oder Quelle",
        inspelning: "Wo finde ich die Aufnahme?",
        inspelningPlaceholder: "URL oder Plattform",
        noter: "Noten?",
        noterPlaceholder: "Noten verfügbar?",
        instrumentKommentar: "Instrument Kommentar",
        instrumentPlaceholder: "Z.B. Geige, Nyckelharpa",
        tradEllerNy: "Trad oder neu",
        chooseType: "Typ wählen",
        traditional: "Traditionell",
        new: "Neu",
        modernInterpretation: "Moderne Interpretation",
        andraKommentarer: "Weitere Kommentare",
        andraKommentarerPlaceholder: "Sonstige Notizen und Kommentare...",
        cancel: "Abbrechen",
        addSong: "Lied hinzufügen",
        updateSong: "Lied aktualisieren",
        filterTitle: "Filtern",
        resetFilters: "Filter zurücksetzen",
        search: "Suchen",
        searchPlaceholder: "In allen Feldern suchen...",
        allLandskap: "Alle Regionen",
        allDifficulties: "Alle Schwierigkeitsgrade",
        allTypes: "Alle Typen",
        repertoire: "Repertoire",
        exportJson: "JSON exportieren",
        importJson: "JSON importieren",
        actions: "Aktionen",
        edit: "Bearbeiten",
        delete: "Löschen",
        noSongsYet: "Noch keine Lieder",
        addFirstSong: "Füge dein erstes Lied mit dem Formular oben hinzu",
        noMatchingFilters: "Keine Lieder entsprechen den Filtern",
        tryChangingFilters: "Versuche die Filtereinstellungen zu ändern",
        confirmDelete: "Bist du sicher, dass du dieses Lied löschen möchtest?",
        confirmImport: "Möchtest du {count} Lieder importieren? Diese werden zu deiner bestehenden Sammlung hinzugefügt.",
        importSuccess: "Import erfolgreich!",
        duplicatesSkipped: "{count} Duplikate übersprungen.",
        allDuplicates: "Alle {count} Lieder sind bereits in deiner Sammlung vorhanden.",
        invalidFileFormat: "Ungültiges Dateiformat. Bitte wähle eine gültige JSON-Datei.",
        importError: "Fehler beim Import: {error}"
    },
    en: {
        appTitle: "Music Repertoire",
        appSubtitle: "Manage your music repertoire",
        totalSongs: "Total Songs",
        traditionalSongs: "Traditional",
        newSongs: "New",
        addNewSong: "Add New Song",
        editSong: "Edit Song",
        titel: "Title",
        titelPlaceholder: "E.g. Bingsjöpolska, Polska after Hjort Anders",
        lattyp: "Song Type",
        lattypPlaceholder: "E.g. Polska, Waltz, Slängpolska",
        efterAv: "After/By",
        efterAvPlaceholder: "Composer or source",
        ort: "Place",
        ortPlaceholder: "City or village",
        landskap: "Region",
        landskapPlaceholder: "E.g. Dalarna, Skåne",
        land: "Country",
        landPlaceholder: "E.g. Sweden, Norway",
        tonart: "Key",
        tonartPlaceholder: "E.g. A major, d minor",
        svarighetsgrad: "Difficulty",
        chooseDifficulty: "Choose difficulty",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        veryHard: "Very Hard",
        utmaningar: "Challenges / Good to work on",
        utmaningarPlaceholder: "Technical challenges, specific parts to practice...",
        lardeAv: "Who did I learn the song from?",
        lardeAvPlaceholder: "Teacher or source",
        inspelning: "Where can I find the recording?",
        inspelningPlaceholder: "URL or platform",
        noter: "Sheet music?",
        noterPlaceholder: "Sheet music available?",
        instrumentKommentar: "Instrument Comment",
        instrumentPlaceholder: "E.g. Violin, Nyckelharpa",
        tradEllerNy: "Trad or new",
        chooseType: "Choose type",
        traditional: "Traditional",
        new: "New",
        modernInterpretation: "Modern interpretation",
        andraKommentarer: "Other comments",
        andraKommentarerPlaceholder: "Other notes and comments...",
        cancel: "Cancel",
        addSong: "Add Song",
        updateSong: "Update Song",
        filterTitle: "Filter",
        resetFilters: "Reset Filters",
        search: "Search",
        searchPlaceholder: "Search in all fields...",
        allLandskap: "All regions",
        allDifficulties: "All difficulties",
        allTypes: "All types",
        repertoire: "Repertoire",
        exportJson: "Export JSON",
        importJson: "Import JSON",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        noSongsYet: "No songs yet",
        addFirstSong: "Add your first song using the form above",
        noMatchingFilters: "No songs match the filters",
        tryChangingFilters: "Try changing your filter settings",
        confirmDelete: "Are you sure you want to delete this song?",
        confirmImport: "Do you want to import {count} songs? They will be added to your existing collection.",
        importSuccess: "Import successful!",
        duplicatesSkipped: "{count} duplicates skipped.",
        allDuplicates: "All {count} songs already exist in your collection.",
        invalidFileFormat: "Invalid file format. Please select a valid JSON file.",
        importError: "Error importing: {error}"
    }
};

// === GLOBAL VARIABLES ===
const STORAGE_KEY = 'musikRepertoireSongs';
const LANGUAGE_KEY = 'musikRepertoireLanguage';
let currentLanguage = 'sv';
let songs = [];
let editingId = null;
let filteredSongs = [];

// === UTILITY FUNCTIONS ===

function generateUniqueId() {
    return 'song_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function t(key) {
    return translations[currentLanguage][key] || key;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// === LANGUAGE FUNCTIONS ===

function loadLanguage() {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved && translations[saved]) {
        currentLanguage = saved;
        document.getElementById('languageSelect').value = saved;
    }
    updateLanguage();
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem(LANGUAGE_KEY, lang);
    updateLanguage();
    updateFilters();
}

function updateLanguage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });

    updateFormTitle();

    if (songs.length > 0) {
        renderTable();
    }
}

function updateFormTitle() {
    const titleKey = editingId !== null ? 'editSong' : 'addNewSong';
    document.getElementById('formTitle').textContent = t(titleKey);
    document.getElementById('submitBtn').textContent = editingId !== null ? t('updateSong') : t('addSong');
}

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', () => {
    loadLanguage();
    loadSongs();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('songForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('cancelBtn').addEventListener('click', resetForm);
    document.getElementById('searchInput').addEventListener('input', filterSongs);
    document.getElementById('filterLandskap').addEventListener('change', filterSongs);
    document.getElementById('filterSvarighetsgrad').addEventListener('change', filterSongs);
    document.getElementById('filterTradNy').addEventListener('change', filterSongs);
}

// === DATA MANAGEMENT ===

function loadSongs() {
    const stored = localStorage.getItem(STORAGE_KEY);
    songs = stored ? JSON.parse(stored) : [];

    // Data migration: Convert old numeric IDs to new unique IDs
    let needsMigration = false;
    songs.forEach(song => {
        if (!song.id || typeof song.id === 'number') {
            song.id = generateUniqueId();
            needsMigration = true;
        }
    });

    if (needsMigration && songs.length > 0) {
        saveSongs();
    }

    filteredSongs = [...songs];
    updateStats();
    updateFilters();
    renderTable();
}

function saveSongs() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
}

// === FORM HANDLING ===

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        titel: document.getElementById('titel').value,
        lattyp: document.getElementById('lattyp').value,
        efter_av: document.getElementById('efter_av').value,
        ort: document.getElementById('ort').value,
        landskap: document.getElementById('landskap').value,
        land: document.getElementById('land').value,
        tonart: document.getElementById('tonart').value,
        svarighetsgrad: document.getElementById('svarighetsgrad').value,
        utmaningar: document.getElementById('utmaningar').value,
        larde_av: document.getElementById('larde_av').value,
        inspelning: document.getElementById('inspelning').value,
        noter: document.getElementById('noter').value,
        instrument_kommentar: document.getElementById('instrument_kommentar').value,
        trad_eller_ny: document.getElementById('trad_eller_ny').value,
        andra_kommentarer: document.getElementById('andra_kommentarer').value
    };

    if (editingId !== null) {
        updateSong(editingId, formData);
    } else {
        addSong(formData);
    }

    resetForm();
    loadSongs();
}

function addSong(data) {
    const newSong = {
        id: generateUniqueId(),
        ...data
    };
    songs.unshift(newSong);
    saveSongs();
}

function updateSong(id, data) {
    const index = songs.findIndex(s => s.id === id);
    if (index !== -1) {
        songs[index] = { id, ...data };
        saveSongs();
    }
}

function deleteSong(songId) {
    if (!confirm(t('confirmDelete'))) return;

    const songToDelete = songs.find(s => s.id === songId);
    if (!songToDelete) {
        console.error('Song not found:', songId);
        return;
    }

    const beforeCount = songs.length;
    songs = songs.filter(s => s.id !== songId);
    const afterCount = songs.length;

    if (beforeCount - afterCount !== 1) {
        console.error('Delete error: expected to delete 1 song, but deleted', beforeCount - afterCount);
    }

    saveSongs();
    loadSongs();
}

function editSong(songId) {
    const song = songs.find(s => s.id === songId);
    if (!song) return;

    editingId = song.id;
    document.getElementById('cancelBtn').style.display = 'block';

    document.getElementById('titel').value = song.titel || '';
    document.getElementById('lattyp').value = song.lattyp || '';
    document.getElementById('efter_av').value = song.efter_av || '';
    document.getElementById('ort').value = song.ort || '';
    document.getElementById('landskap').value = song.landskap || '';
    document.getElementById('land').value = song.land || '';
    document.getElementById('tonart').value = song.tonart || '';
    document.getElementById('svarighetsgrad').value = song.svarighetsgrad || '';
    document.getElementById('utmaningar').value = song.utmaningar || '';
    document.getElementById('larde_av').value = song.larde_av || '';
    document.getElementById('inspelning').value = song.inspelning || '';
    document.getElementById('noter').value = song.noter || '';
    document.getElementById('instrument_kommentar').value = song.instrument_kommentar || '';
    document.getElementById('trad_eller_ny').value = song.trad_eller_ny || '';
    document.getElementById('andra_kommentarer').value = song.andra_kommentarer || '';

    updateFormTitle();
    document.getElementById('songForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetForm() {
    editingId = null;
    document.getElementById('songForm').reset();
    document.getElementById('cancelBtn').style.display = 'none';
    updateFormTitle();
}

// === STATISTICS ===

function updateStats() {
    document.getElementById('totalSongs').textContent = songs.length;

    const traditional = songs.filter(s => s.trad_eller_ny === 'Traditionell').length;
    const newSongs = songs.filter(s => s.trad_eller_ny === 'Ny').length;

    document.getElementById('traditionalCount').textContent = traditional;
    document.getElementById('newCount').textContent = newSongs;
}

// === FILTERING ===

function updateFilters() {
    const landskapSet = new Set();
    songs.forEach(s => {
        if (s.landskap) landskapSet.add(s.landskap);
    });

    const landskapSelect = document.getElementById('filterLandskap');
    const currentLandskap = landskapSelect.value;
    landskapSelect.innerHTML = `<option value="" data-i18n="allLandskap">${t('allLandskap')}</option>`;

    Array.from(landskapSet).sort().forEach(landskap => {
        const option = document.createElement('option');
        option.value = landskap;
        option.textContent = landskap;
        landskapSelect.appendChild(option);
    });

    landskapSelect.value = currentLandskap;
}

function filterSongs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const landskapFilter = document.getElementById('filterLandskap').value;
    const svarighetsgradFilter = document.getElementById('filterSvarighetsgrad').value;
    const tradNyFilter = document.getElementById('filterTradNy').value;

    filteredSongs = songs.filter(song => {
        if (searchTerm) {
            const searchableText = Object.values(song).join(' ').toLowerCase();
            if (!searchableText.includes(searchTerm)) return false;
        }

        if (landskapFilter && song.landskap !== landskapFilter) return false;
        if (svarighetsgradFilter && song.svarighetsgrad !== svarighetsgradFilter) return false;
        if (tradNyFilter && song.trad_eller_ny !== tradNyFilter) return false;

        return true;
    });

    renderTable();
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterLandskap').value = '';
    document.getElementById('filterSvarighetsgrad').value = '';
    document.getElementById('filterTradNy').value = '';
    filteredSongs = [...songs];
    renderTable();
}

// === TABLE RENDERING ===

function renderTable() {
    const container = document.getElementById('tableContainer');

    if (filteredSongs.length === 0) {
        const emptyTitle = songs.length === 0 ? t('noSongsYet') : t('noMatchingFilters');
        const emptyMsg = songs.length === 0 ? t('addFirstSong') : t('tryChangingFilters');

        container.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
                <h3>${emptyTitle}</h3>
                <p>${emptyMsg}</p>
            </div>
        `;
        return;
    }

    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>${t('titel')}</th>
                    <th>${t('lattyp')}</th>
                    <th>${t('efterAv')}</th>
                    <th>${t('ort')}</th>
                    <th>${t('landskap')}</th>
                    <th>${t('land')}</th>
                    <th>${t('tonart')}</th>
                    <th>${t('svarighetsgrad')}</th>
                    <th>${t('utmaningar')}</th>
                    <th>${t('lardeAv')}</th>
                    <th>${t('inspelning')}</th>
                    <th>${t('noter')}</th>
                    <th>${t('instrumentKommentar')}</th>
                    <th>${t('tradEllerNy')}</th>
                    <th>${t('andraKommentarer')}</th>
                    <th>${t('actions')}</th>
                </tr>
            </thead>
            <tbody>
    `;

    filteredSongs.forEach(song => {
        tableHTML += `
            <tr>
                <td style="font-weight: 600;">${escapeHtml(song.titel || '-')}</td>
                <td>${escapeHtml(song.lattyp || '-')}</td>
                <td>${escapeHtml(song.efter_av || '-')}</td>
                <td>${escapeHtml(song.ort || '-')}</td>
                <td>${escapeHtml(song.landskap || '-')}</td>
                <td>${escapeHtml(song.land || '-')}</td>
                <td>${escapeHtml(song.tonart || '-')}</td>
                <td>${escapeHtml(song.svarighetsgrad || '-')}</td>
                <td>${escapeHtml(song.utmaningar || '-')}</td>
                <td>${escapeHtml(song.larde_av || '-')}</td>
                <td>${escapeHtml(song.inspelning || '-')}</td>
                <td>${escapeHtml(song.noter || '-')}</td>
                <td>${escapeHtml(song.instrument_kommentar || '-')}</td>
                <td>${escapeHtml(song.trad_eller_ny || '-')}</td>
                <td>${escapeHtml(song.andra_kommentarer || '-')}</td>
                <td>
                    <div class="actions">
                        <button class="btn btn-edit" onclick="editSong('${song.id}')">${t('edit')}</button>
                        <button class="btn btn-delete" onclick="deleteSong('${song.id}')">${t('delete')}</button>
                    </div>
                </td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    container.innerHTML = tableHTML;
}

// === IMPORT/EXPORT ===

function exportData() {
    const dataStr = JSON.stringify(songs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `musik-repertoire-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

function isDuplicate(newSong) {
    return songs.some(existingSong => {
        return (existingSong.titel || '') === (newSong.titel || '') &&
               (existingSong.lattyp || '') === (newSong.lattyp || '') &&
               (existingSong.efter_av || '') === (newSong.efter_av || '') &&
               (existingSong.ort || '') === (newSong.ort || '') &&
               (existingSong.landskap || '') === (newSong.landskap || '') &&
               (existingSong.land || '') === (newSong.land || '') &&
               (existingSong.tonart || '') === (newSong.tonart || '') &&
               (existingSong.svarighetsgrad || '') === (newSong.svarighetsgrad || '') &&
               (existingSong.utmaningar || '') === (newSong.utmaningar || '') &&
               (existingSong.larde_av || '') === (newSong.larde_av || '') &&
               (existingSong.inspelning || '') === (newSong.inspelning || '') &&
               (existingSong.noter || '') === (newSong.noter || '') &&
               (existingSong.instrument_kommentar || '') === (newSong.instrument_kommentar || '') &&
               (existingSong.trad_eller_ny || '') === (newSong.trad_eller_ny || '') &&
               (existingSong.andra_kommentarer || '') === (newSong.andra_kommentarer || '');
    });
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (Array.isArray(importedData)) {
                const cleanedData = importedData.map(song => {
                    const { id, ...songWithoutId } = song;
                    return songWithoutId;
                });

                const newSongs = cleanedData.filter(song => !isDuplicate(song));
                const duplicateCount = importedData.length - newSongs.length;

                if (newSongs.length === 0) {
                    alert(t('allDuplicates').replace('{count}', importedData.length));
                    event.target.value = '';
                    return;
                }

                let confirmMsg = t('confirmImport').replace('{count}', newSongs.length);
                if (duplicateCount > 0) {
                    confirmMsg += ' ' + t('duplicatesSkipped').replace('{count}', duplicateCount);
                }

                if (confirm(confirmMsg)) {
                    newSongs.forEach(song => {
                        addSong(song);
                    });
                    loadSongs();

                    let successMsg = t('importSuccess');
                    if (duplicateCount > 0) {
                        successMsg += ' ' + t('duplicatesSkipped').replace('{count}', duplicateCount);
                    }
                    alert(successMsg);
                }
            } else {
                alert(t('invalidFileFormat'));
            }
        } catch (error) {
            alert(t('importError').replace('{error}', error.message));
        }
    };
    reader.readAsText(file);

    event.target.value = '';
}

// === PWA SERVICE WORKER ===

let deferredPrompt;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired');
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
});

function showInstallButton() {
    console.log('App can be installed');
}

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    deferredPrompt = null;
});

if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    console.log('App is running in standalone mode (installed as PWA)');
}
