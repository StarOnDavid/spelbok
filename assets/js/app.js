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
    .getElementById("filterLandskap")
    .addEventListener("change", filterSongs);
  document
    .getElementById("filterSvarighetsgrad")
    .addEventListener("change", filterSongs);
  document
    .getElementById("filterTradNy")
    .addEventListener("change", filterSongs);
}

// === DATA MANAGEMENT ===

async function loadSongs() {
  try {
    songs = await DB.getAllSongs();

    // Data migration: Convert old numeric IDs to new unique IDs
    let needsMigration = false;
    songs.forEach((song) => {
      if (!song.id || typeof song.id === "number") {
        song.id = generateUniqueId();
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
    titel: document.getElementById("titel").value,
    lattyp: document.getElementById("lattyp").value,
    efter_av: document.getElementById("efter_av").value,
    ort: document.getElementById("ort").value,
    landskap: document.getElementById("landskap").value,
    land: document.getElementById("land").value,
    tonart: document.getElementById("tonart").value,
    svarighetsgrad: document.getElementById("svarighetsgrad").value,
    utmaningar: document.getElementById("utmaningar").value,
    larde_av: document.getElementById("larde_av").value,
    inspelning: document.getElementById("inspelning").value,
    noter: document.getElementById("noter").value,
    instrument_kommentar: document.getElementById("instrument_kommentar").value,
    trad_eller_ny: document.getElementById("trad_eller_ny").value,
    andra_kommentarer: document.getElementById("andra_kommentarer").value,
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

  document.getElementById("titel").value = song.titel || "";
  document.getElementById("lattyp").value = song.lattyp || "";
  document.getElementById("efter_av").value = song.efter_av || "";
  document.getElementById("ort").value = song.ort || "";
  document.getElementById("landskap").value = song.landskap || "";
  document.getElementById("land").value = song.land || "";
  document.getElementById("tonart").value = song.tonart || "";
  document.getElementById("svarighetsgrad").value = song.svarighetsgrad || "";
  document.getElementById("utmaningar").value = song.utmaningar || "";
  document.getElementById("larde_av").value = song.larde_av || "";
  document.getElementById("inspelning").value = song.inspelning || "";
  document.getElementById("noter").value = song.noter || "";
  document.getElementById("instrument_kommentar").value =
    song.instrument_kommentar || "";
  document.getElementById("trad_eller_ny").value = song.trad_eller_ny || "";
  document.getElementById("andra_kommentarer").value =
    song.andra_kommentarer || "";

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

  const traditional = songs.filter(
    (s) => s.trad_eller_ny === "Traditionell",
  ).length;
  const newSongs = songs.filter((s) => s.trad_eller_ny === "Ny").length;

  document.getElementById("traditionalCount").textContent = traditional;
  document.getElementById("newCount").textContent = newSongs;
}

// === FILTERING ===

function updateFilters() {
  // Landskap Filter
  const landskapSet = new Set();
  songs.forEach((s) => {
    if (s.landskap) landskapSet.add(s.landskap);
  });

  const landskapSelect = document.getElementById("filterLandskap");
  const currentLandskap = landskapSelect.value;
  landskapSelect.innerHTML = `<option value="" data-i18n="allLandskap">${t("allLandskap")}</option>`;

  Array.from(landskapSet)
    .sort()
    .forEach((landskap) => {
      const option = document.createElement("option");
      option.value = landskap;
      option.textContent = landskap;
      landskapSelect.appendChild(option);
    });

  landskapSelect.value = currentLandskap;

  // Svårighetsgrad Filter
  const svarighetsgradSet = new Set();
  songs.forEach((s) => {
    if (s.svarighetsgrad) svarighetsgradSet.add(s.svarighetsgrad);
  });

  const svarighetsgradSelect = document.getElementById("filterSvarighetsgrad");
  const currentSvarighetsgrad = svarighetsgradSelect.value;
  svarighetsgradSelect.innerHTML = `<option value="" data-i18n="allDifficulties">${t("allDifficulties")}</option>`;

  // Definierte Reihenfolge für Schwierigkeitsgrade
  const difficultyOrder = ["Lätt", "Medel", "Svår", "Mycket svår"];

  difficultyOrder.forEach((difficulty) => {
    if (svarighetsgradSet.has(difficulty)) {
      const option = document.createElement("option");
      option.value = difficulty;
      option.textContent = difficulty;
      svarighetsgradSelect.appendChild(option);
    }
  });

  svarighetsgradSelect.value = currentSvarighetsgrad;

  // Trad eller ny Filter
  const tradNySet = new Set();
  songs.forEach((s) => {
    if (s.trad_eller_ny) tradNySet.add(s.trad_eller_ny);
  });

  const tradNySelect = document.getElementById("filterTradNy");
  const currentTradNy = tradNySelect.value;
  tradNySelect.innerHTML = `<option value="" data-i18n="allTypes">${t("allTypes")}</option>`;

  // Definierte Reihenfolge für Typ
  const typeOrder = ["Traditionell", "Ny", "Modern tolkning"];

  typeOrder.forEach((type) => {
    if (tradNySet.has(type)) {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      tradNySelect.appendChild(option);
    }
  });

  tradNySelect.value = currentTradNy;
}

function filterSongs() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const landskapFilter = document.getElementById("filterLandskap").value;
  const svarighetsgradFilter = document.getElementById(
    "filterSvarighetsgrad",
  ).value;
  const tradNyFilter = document.getElementById("filterTradNy").value;

  filteredSongs = songs.filter((song) => {
    if (searchTerm) {
      const searchableText = Object.values(song).join(" ").toLowerCase();
      if (!searchableText.includes(searchTerm)) return false;
    }

    if (landskapFilter && song.landskap !== landskapFilter) return false;
    if (svarighetsgradFilter && song.svarighetsgrad !== svarighetsgradFilter)
      return false;
    if (tradNyFilter && song.trad_eller_ny !== tradNyFilter) return false;

    return true;
  });

  renderTable();
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("filterLandskap").value = "";
  document.getElementById("filterSvarighetsgrad").value = "";
  document.getElementById("filterTradNy").value = "";
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
                <td style="font-weight: 600;">${escapeHtml(song.titel || "-")}</td>
                <td>${escapeHtml(song.lattyp || "-")}</td>
                <td>${escapeHtml(song.efter_av || "-")}</td>
                <td>${escapeHtml(song.ort || "-")}</td>
                <td>${escapeHtml(song.landskap || "-")}</td>
                <td>${escapeHtml(song.land || "-")}</td>
                <td>${escapeHtml(song.tonart || "-")}</td>
                <td>${escapeHtml(song.svarighetsgrad || "-")}</td>
                <td>${escapeHtml(song.utmaningar || "-")}</td>
                <td>${escapeHtml(song.larde_av || "-")}</td>
                <td>${escapeHtml(song.inspelning || "-")}</td>
                <td>${escapeHtml(song.noter || "-")}</td>
                <td>${escapeHtml(song.instrument_kommentar || "-")}</td>
                <td>${escapeHtml(song.trad_eller_ny || "-")}</td>
                <td>${escapeHtml(song.andra_kommentarer || "-")}</td>
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
      (existingSong.titel || "") === (newSong.titel || "") &&
      (existingSong.lattyp || "") === (newSong.lattyp || "") &&
      (existingSong.efter_av || "") === (newSong.efter_av || "") &&
      (existingSong.ort || "") === (newSong.ort || "") &&
      (existingSong.landskap || "") === (newSong.landskap || "") &&
      (existingSong.land || "") === (newSong.land || "") &&
      (existingSong.tonart || "") === (newSong.tonart || "") &&
      (existingSong.svarighetsgrad || "") === (newSong.svarighetsgrad || "") &&
      (existingSong.utmaningar || "") === (newSong.utmaningar || "") &&
      (existingSong.larde_av || "") === (newSong.larde_av || "") &&
      (existingSong.inspelning || "") === (newSong.inspelning || "") &&
      (existingSong.noter || "") === (newSong.noter || "") &&
      (existingSong.instrument_kommentar || "") ===
        (newSong.instrument_kommentar || "") &&
      (existingSong.trad_eller_ny || "") === (newSong.trad_eller_ny || "") &&
      (existingSong.andra_kommentarer || "") ===
        (newSong.andra_kommentarer || "")
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
