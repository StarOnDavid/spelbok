// ============================================
// SpelBok - Din digitala spelbok
// Main JavaScript
// © 2025 David Staron
// ============================================

// === GLOBAL VARIABLES ===
let songs = [];
let editingId = null;
let filteredSongs = [];

// === UTILITY FUNCTIONS ===

function generateUniqueId() {
  return "song_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

// Translation helper using i18n module
function t(key, params = {}) {
  return I18n.t(key, params);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Translate difficulty and type values for display
function translateValue(field, value) {
  if (!value || value === "-") return value;

  // Values are stored in English (easy, medium, hard, veryHard, traditional, new, modernInterpretation)
  // Check if it's a translatable field and return translated value
  if (field === "difficulty" || field === "type") {
    return t(value);
  }

  return value;
}

// === LANGUAGE FUNCTIONS ===

async function loadLanguage() {
  await I18n.init();
  updateLanguage();
}

async function changeLanguage(lang) {
  await I18n.changeLanguage(lang);
  updateLanguage();
  updateFilters();
}

function updateLanguage() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = t(key);
  });

  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    element.placeholder = t(key);
  });

  // Update dropdown options
  document.querySelectorAll("[data-i18n-option]").forEach((element) => {
    const key = element.getAttribute("data-i18n-option");
    element.textContent = t(key);
  });

  updateFormTitle();

  if (songs.length > 0) {
    renderTable();
  }
}

function updateFormTitle() {
  const titleKey = editingId !== null ? "editSong" : "addNewSong";
  document.getElementById("formTitle").textContent = t(titleKey);
  document.getElementById("submitBtn").textContent =
    editingId !== null ? t("updateSong") : t("addSong");
}

// === INITIALIZATION ===

document.addEventListener("DOMContentLoaded", async () => {
  await loadLanguage();
  await DB.init(); // Initialize IndexedDB
  await loadSongs();
  setupEventListeners();
});

function setupEventListeners() {
  document
    .getElementById("songForm")
    .addEventListener("submit", handleFormSubmit);
  document.getElementById("cancelBtn").addEventListener("click", resetForm);
  document.getElementById("searchInput").addEventListener("input", filterSongs);
  document
    .getElementById("filterRegion")
    .addEventListener("change", filterSongs);
  document
    .getElementById("filterDifficulty")
    .addEventListener("change", filterSongs);
  document.getElementById("filterType").addEventListener("change", filterSongs);
}

// === DATA MANAGEMENT ===

async function loadSongs() {
  try {
    songs = await DB.getAllSongs();

    // Data migration: Convert old numeric IDs to new unique IDs
    // and old Swedish field names to new English field names
    let needsMigration = false;
    songs.forEach((song) => {
      if (!song.id || typeof song.id === "number") {
        song.id = generateUniqueId();
        needsMigration = true;
      }

      // Migrate Swedish field names to English
      if (song.titel !== undefined) {
        song.title = song.titel;
        delete song.titel;
        needsMigration = true;
      }
      if (song.lattyp !== undefined) {
        song.songType = song.lattyp;
        delete song.lattyp;
        needsMigration = true;
      }
      if (song.efter_av !== undefined) {
        song.composer = song.efter_av;
        delete song.efter_av;
        needsMigration = true;
      }
      if (song.ort !== undefined) {
        song.location = song.ort;
        delete song.ort;
        needsMigration = true;
      }
      if (song.landskap !== undefined) {
        song.region = song.landskap;
        delete song.landskap;
        needsMigration = true;
      }
      if (song.land !== undefined) {
        song.country = song.land;
        delete song.land;
        needsMigration = true;
      }
      if (song.tonart !== undefined) {
        song.key = song.tonart;
        delete song.tonart;
        needsMigration = true;
      }
      if (song.svarighetsgrad !== undefined) {
        song.difficulty = song.svarighetsgrad;
        delete song.svarighetsgrad;
        needsMigration = true;
      }
      if (song.utmaningar !== undefined) {
        song.challenges = song.utmaningar;
        delete song.utmaningar;
        needsMigration = true;
      }
      if (song.larde_av !== undefined) {
        song.learnedFrom = song.larde_av;
        delete song.larde_av;
        needsMigration = true;
      }
      if (song.inspelning !== undefined) {
        song.recording = song.inspelning;
        delete song.inspelning;
        needsMigration = true;
      }
      if (song.noter !== undefined) {
        song.notes = song.noter;
        delete song.noter;
        needsMigration = true;
      }
      if (song.instrument_kommentar !== undefined) {
        song.instrumentComment = song.instrument_kommentar;
        delete song.instrument_kommentar;
        needsMigration = true;
      }
      if (song.trad_eller_ny !== undefined) {
        song.type = song.trad_eller_ny;
        delete song.trad_eller_ny;
        needsMigration = true;
      }
      if (song.andra_kommentarer !== undefined) {
        song.otherComments = song.andra_kommentarer;
        delete song.andra_kommentarer;
        needsMigration = true;
      }

      // Migrate Swedish difficulty values to English
      const difficultyMap = {
        Lätt: "easy",
        Medel: "medium",
        Svår: "hard",
        "Mycket svår": "veryHard",
      };
      if (song.difficulty && difficultyMap[song.difficulty]) {
        song.difficulty = difficultyMap[song.difficulty];
        needsMigration = true;
      }

      // Migrate Swedish type values to English
      const typeMap = {
        Traditionell: "traditional",
        Ny: "new",
        "Modern tolkning": "modernInterpretation",
      };
      if (song.type && typeMap[song.type]) {
        song.type = typeMap[song.type];
        needsMigration = true;
      }
    });

    if (needsMigration && songs.length > 0) {
      // Update songs in IndexedDB
      for (const song of songs) {
        await DB.updateSong(song.id, song);
      }
    }

    filteredSongs = [...songs];
    updateStats();
    updateFilters();
    renderTable();
  } catch (error) {
    console.error("Error loading songs:", error);
    alert(t("importError", { error: error.message }));
  }
}

// === FORM HANDLING ===

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    title: document.getElementById("title").value,
    songType: document.getElementById("songType").value,
    composer: document.getElementById("composer").value,
    location: document.getElementById("location").value,
    region: document.getElementById("region").value,
    country: document.getElementById("country").value,
    key: document.getElementById("key").value,
    difficulty: document.getElementById("difficulty").value,
    challenges: document.getElementById("challenges").value,
    learnedFrom: document.getElementById("learnedFrom").value,
    recording: document.getElementById("recording").value,
    notes: document.getElementById("notes").value,
    instrumentComment: document.getElementById("instrumentComment").value,
    type: document.getElementById("type").value,
    otherComments: document.getElementById("otherComments").value,
  };

  if (editingId !== null) {
    updateSong(editingId, formData);
  } else {
    addSong(formData);
  }

  resetForm();
}

async function addSong(data) {
  try {
    const newSong = {
      id: generateUniqueId(),
      ...data,
    };
    await DB.addSong(newSong);
    await loadSongs();
  } catch (error) {
    console.error("Error adding song:", error);
    alert(t("importError", { error: error.message }));
  }
}

async function updateSong(id, data) {
  try {
    const updatedSong = { id, ...data };
    await DB.updateSong(id, updatedSong);
    await loadSongs();
  } catch (error) {
    console.error("Error updating song:", error);
    alert(t("importError", { error: error.message }));
  }
}

async function deleteSong(songId) {
  if (!confirm(t("confirmDelete"))) return;

  try {
    await DB.deleteSong(songId);
    await loadSongs();
  } catch (error) {
    console.error("Error deleting song:", error);
    alert(t("importError", { error: error.message }));
  }
}

function editSong(songId) {
  const song = songs.find((s) => s.id === songId);
  if (!song) return;

  editingId = song.id;
  document.getElementById("cancelBtn").style.display = "block";

  document.getElementById("title").value = song.title || "";
  document.getElementById("songType").value = song.songType || "";
  document.getElementById("composer").value = song.composer || "";
  document.getElementById("location").value = song.location || "";
  document.getElementById("region").value = song.region || "";
  document.getElementById("country").value = song.country || "";
  document.getElementById("key").value = song.key || "";
  document.getElementById("difficulty").value = song.difficulty || "";
  document.getElementById("challenges").value = song.challenges || "";
  document.getElementById("learnedFrom").value = song.learnedFrom || "";
  document.getElementById("recording").value = song.recording || "";
  document.getElementById("notes").value = song.notes || "";
  document.getElementById("instrumentComment").value =
    song.instrumentComment || "";
  document.getElementById("type").value = song.type || "";
  document.getElementById("otherComments").value = song.otherComments || "";

  updateFormTitle();
  document
    .getElementById("songForm")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetForm() {
  editingId = null;
  document.getElementById("songForm").reset();
  document.getElementById("cancelBtn").style.display = "none";
  updateFormTitle();
}

// === STATISTICS ===

function updateStats() {
  document.getElementById("totalSongs").textContent = songs.length;

  const traditional = songs.filter((s) => s.type === "traditional").length;
  const newSongs = songs.filter((s) => s.type === "new").length;

  document.getElementById("traditionalCount").textContent = traditional;
  document.getElementById("newCount").textContent = newSongs;
}

// === FILTERING ===

function updateFilters() {
  // Region Filter
  const regionSet = new Set();
  songs.forEach((s) => {
    if (s.region) regionSet.add(s.region);
  });

  const regionSelect = document.getElementById("filterRegion");
  const currentRegion = regionSelect.value;
  regionSelect.innerHTML = `<option value="" data-i18n="allRegions">${t("allRegions")}</option>`;

  Array.from(regionSet)
    .sort()
    .forEach((region) => {
      const option = document.createElement("option");
      option.value = region;
      option.textContent = region;
      regionSelect.appendChild(option);
    });

  regionSelect.value = currentRegion;

  // Difficulty Filter
  const difficultySet = new Set();
  songs.forEach((s) => {
    if (s.difficulty) difficultySet.add(s.difficulty);
  });

  const difficultySelect = document.getElementById("filterDifficulty");
  const currentDifficulty = difficultySelect.value;
  difficultySelect.innerHTML = `<option value="" data-i18n="allDifficulties">${t("allDifficulties")}</option>`;

  // Defined order for difficulty levels
  const difficultyOrder = ["easy", "medium", "hard", "veryHard"];

  difficultyOrder.forEach((difficulty) => {
    if (difficultySet.has(difficulty)) {
      const option = document.createElement("option");
      option.value = difficulty;
      option.textContent = t(difficulty);
      difficultySelect.appendChild(option);
    }
  });

  difficultySelect.value = currentDifficulty;

  // Type Filter
  const typeSet = new Set();
  songs.forEach((s) => {
    if (s.type) typeSet.add(s.type);
  });

  const typeSelect = document.getElementById("filterType");
  const currentType = typeSelect.value;
  typeSelect.innerHTML = `<option value="" data-i18n="allTypes">${t("allTypes")}</option>`;

  // Defined order for type
  const typeOrder = ["traditional", "new", "modernInterpretation"];

  typeOrder.forEach((type) => {
    if (typeSet.has(type)) {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = t(type);
      typeSelect.appendChild(option);
    }
  });

  typeSelect.value = currentType;
}

function filterSongs() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const regionFilter = document.getElementById("filterRegion").value;
  const difficultyFilter = document.getElementById("filterDifficulty").value;
  const typeFilter = document.getElementById("filterType").value;

  filteredSongs = songs.filter((song) => {
    if (searchTerm) {
      const searchableText = Object.values(song).join(" ").toLowerCase();
      if (!searchableText.includes(searchTerm)) return false;
    }

    if (regionFilter && song.region !== regionFilter) return false;
    if (difficultyFilter && song.difficulty !== difficultyFilter) return false;
    if (typeFilter && song.type !== typeFilter) return false;

    return true;
  });

  renderTable();
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("filterRegion").value = "";
  document.getElementById("filterDifficulty").value = "";
  document.getElementById("filterType").value = "";
  filteredSongs = [...songs];
  renderTable();
}

// === TABLE RENDERING ===

function renderTable() {
  const container = document.getElementById("tableContainer");

  if (filteredSongs.length === 0) {
    const emptyTitle =
      songs.length === 0 ? t("noSongsYet") : t("noMatchingFilters");
    const emptyMsg =
      songs.length === 0 ? t("addFirstSong") : t("tryChangingFilters");

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
                    <th>${t("titel")}</th>
                    <th>${t("lattyp")}</th>
                    <th>${t("efterAv")}</th>
                    <th>${t("ort")}</th>
                    <th>${t("landskap")}</th>
                    <th>${t("land")}</th>
                    <th>${t("tonart")}</th>
                    <th>${t("svarighetsgrad")}</th>
                    <th>${t("utmaningar")}</th>
                    <th>${t("lardeAv")}</th>
                    <th>${t("inspelning")}</th>
                    <th>${t("noter")}</th>
                    <th>${t("instrumentKommentar")}</th>
                    <th>${t("tradEllerNy")}</th>
                    <th>${t("andraKommentarer")}</th>
                    <th>${t("actions")}</th>
                </tr>
            </thead>
            <tbody>
    `;

  filteredSongs.forEach((song) => {
    tableHTML += `
            <tr>
                <td style="font-weight: 600;">${escapeHtml(song.title || "-")}</td>
                <td>${escapeHtml(song.songType || "-")}</td>
                <td>${escapeHtml(song.composer || "-")}</td>
                <td>${escapeHtml(song.location || "-")}</td>
                <td>${escapeHtml(song.region || "-")}</td>
                <td>${escapeHtml(song.country || "-")}</td>
                <td>${escapeHtml(song.key || "-")}</td>
                <td>${escapeHtml(translateValue("difficulty", song.difficulty) || "-")}</td>
                <td>${escapeHtml(song.challenges || "-")}</td>
                <td>${escapeHtml(song.learnedFrom || "-")}</td>
                <td>${escapeHtml(song.recording || "-")}</td>
                <td>${escapeHtml(song.notes || "-")}</td>
                <td>${escapeHtml(song.instrumentComment || "-")}</td>
                <td>${escapeHtml(translateValue("type", song.type) || "-")}</td>
                <td>${escapeHtml(song.otherComments || "-")}</td>
                <td>
                    <div class="actions">
                        <button class="btn btn-edit" onclick="editSong('${song.id}')">${t("edit")}</button>
                        <button class="btn btn-delete" onclick="deleteSong('${song.id}')">${t("delete")}</button>
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

async function exportData() {
  try {
    // Get fresh data from IndexedDB
    const allSongs = await DB.getAllSongs();
    const dataStr = JSON.stringify(allSongs, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `musik-repertoire-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting data:", error);
    alert(t("importError", { error: error.message }));
  }
}

function isDuplicate(newSong) {
  return songs.some((existingSong) => {
    return (
      (existingSong.title || "") === (newSong.title || "") &&
      (existingSong.songType || "") === (newSong.songType || "") &&
      (existingSong.composer || "") === (newSong.composer || "") &&
      (existingSong.location || "") === (newSong.location || "") &&
      (existingSong.region || "") === (newSong.region || "") &&
      (existingSong.country || "") === (newSong.country || "") &&
      (existingSong.key || "") === (newSong.key || "") &&
      (existingSong.difficulty || "") === (newSong.difficulty || "") &&
      (existingSong.challenges || "") === (newSong.challenges || "") &&
      (existingSong.learnedFrom || "") === (newSong.learnedFrom || "") &&
      (existingSong.recording || "") === (newSong.recording || "") &&
      (existingSong.notes || "") === (newSong.notes || "") &&
      (existingSong.instrumentComment || "") ===
        (newSong.instrumentComment || "") &&
      (existingSong.type || "") === (newSong.type || "") &&
      (existingSong.otherComments || "") === (newSong.otherComments || "")
    );
  });
}

async function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function (e) {
    try {
      const importedData = JSON.parse(e.target.result);
      if (Array.isArray(importedData)) {
        const cleanedData = importedData.map((song) => {
          const { id, ...songWithoutId } = song;
          return songWithoutId;
        });

        const newSongs = cleanedData.filter((song) => !isDuplicate(song));
        const duplicateCount = importedData.length - newSongs.length;

        if (newSongs.length === 0) {
          alert(t("allDuplicates", { count: importedData.length }));
          event.target.value = "";
          return;
        }

        let confirmMsg = t("confirmImport", { count: newSongs.length });
        if (duplicateCount > 0) {
          confirmMsg += " " + t("duplicatesSkipped", { count: duplicateCount });
        }

        if (confirm(confirmMsg)) {
          // Import songs to IndexedDB
          for (const song of newSongs) {
            await addSong(song);
          }

          let successMsg = t("importSuccess");
          if (duplicateCount > 0) {
            successMsg +=
              " " + t("duplicatesSkipped", { count: duplicateCount });
          }
          alert(successMsg);
        }
      } else {
        alert(t("invalidFileFormat"));
      }
    } catch (error) {
      alert(t("importError", { error: error.message }));
    }
  };
  reader.readAsText(file);

  event.target.value = "";
}

// === PWA SERVICE WORKER ===

let deferredPrompt;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered successfully:",
          registration.scope,
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt event fired");
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

function showInstallButton() {
  console.log("App can be installed");
}

window.addEventListener("appinstalled", () => {
  console.log("PWA was installed");
  deferredPrompt = null;
});

if (
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true
) {
  console.log("App is running in standalone mode (installed as PWA)");
}
