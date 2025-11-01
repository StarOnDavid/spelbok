// ============================================
// SpelBok - Database Module
// IndexedDB with Dexie.js
// © 2025 David Staron
// ============================================

const DB = (() => {
  const STORAGE_KEY = "musikRepertoireSongs"; // localStorage key
  const MIGRATION_KEY = "db_migration_timestamp";
  const MIGRATION_CLEANUP_DAYS = 30;

  // Initialize Dexie database
  const db = new Dexie("SpelBokDB");

  // Define schema with indexes for filtering
  db.version(1).stores({
    songs: "id, region, difficulty, type",
  });

  /**
   * Migrate data from localStorage to IndexedDB
   * @returns {Promise<boolean>} Success status
   */
  async function migrateFromLocalStorage() {
    try {
      const localData = localStorage.getItem(STORAGE_KEY);
      if (!localData) {
        console.log("DB: No localStorage data to migrate");
        return false;
      }

      const songs = JSON.parse(localData);
      if (!Array.isArray(songs) || songs.length === 0) {
        console.log("DB: No songs to migrate");
        return false;
      }

      console.log(`DB: Migrating ${songs.length} songs from localStorage...`);

      // Clear existing data in IndexedDB (clean migration)
      await db.songs.clear();

      // Bulk insert into IndexedDB
      await db.songs.bulkAdd(songs);

      // Set migration timestamp
      const timestamp = Date.now();
      localStorage.setItem(MIGRATION_KEY, timestamp.toString());

      console.log(`DB: Migration successful! ${songs.length} songs migrated.`);
      return true;
    } catch (error) {
      console.error("DB: Migration failed:", error);
      return false;
    }
  }

  /**
   * Check and cleanup old localStorage data (after 30 days)
   */
  function cleanupOldLocalStorage() {
    try {
      const migrationTimestamp = localStorage.getItem(MIGRATION_KEY);
      if (!migrationTimestamp) return;

      const migrationDate = parseInt(migrationTimestamp, 10);
      const now = Date.now();
      const daysPassed = (now - migrationDate) / (1000 * 60 * 60 * 24);

      if (daysPassed >= MIGRATION_CLEANUP_DAYS) {
        console.log(
          `DB: Cleaning up localStorage (${Math.floor(daysPassed)} days since migration)`,
        );
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(MIGRATION_KEY);
      }
    } catch (error) {
      console.error("DB: Cleanup error:", error);
    }
  }

  /**
   * Initialize database and perform migration if needed
   * @returns {Promise<void>}
   */
  async function init() {
    try {
      // Check if IndexedDB is empty
      const count = await db.songs.count();

      if (count === 0) {
        // Try migration from localStorage
        await migrateFromLocalStorage();
      }

      // Cleanup old localStorage after 30 days
      cleanupOldLocalStorage();
    } catch (error) {
      console.error("DB: Initialization error:", error);
      throw error;
    }
  }

  /**
   * Get all songs
   * @returns {Promise<Array>} All songs
   */
  async function getAllSongs() {
    try {
      return await db.songs.toArray();
    } catch (error) {
      console.error("DB: Error getting songs:", error);
      // Fallback to localStorage
      return fallbackToLocalStorage("get");
    }
  }

  /**
   * Add a new song
   * @param {Object} song - Song object
   * @returns {Promise<string>} Song ID
   */
  async function addSong(song) {
    try {
      const id = await db.songs.add(song);
      return id;
    } catch (error) {
      console.error("DB: Error adding song:", error);
      return fallbackToLocalStorage("add", song);
    }
  }

  /**
   * Update an existing song
   * @param {string} id - Song ID
   * @param {Object} updates - Updated fields
   * @returns {Promise<number>} Number of updated records
   */
  async function updateSong(id, updates) {
    try {
      return await db.songs.update(id, updates);
    } catch (error) {
      console.error("DB: Error updating song:", error);
      return fallbackToLocalStorage("update", { id, ...updates });
    }
  }

  /**
   * Delete a song
   * @param {string} id - Song ID
   * @returns {Promise<void>}
   */
  async function deleteSong(id) {
    try {
      await db.songs.delete(id);
    } catch (error) {
      console.error("DB: Error deleting song:", error);
      return fallbackToLocalStorage("delete", id);
    }
  }

  /**
   * Get songs by filter
   * @param {Object} filters - Filter object {region, difficulty, type}
   * @returns {Promise<Array>} Filtered songs
   */
  async function getFilteredSongs(filters = {}) {
    try {
      let collection = db.songs.toCollection();

      // Apply filters if provided
      if (filters.region) {
        collection = db.songs.where("region").equals(filters.region);
      }
      if (filters.difficulty) {
        collection = collection.and(
          (song) => song.difficulty === filters.difficulty,
        );
      }
      if (filters.type) {
        collection = collection.and((song) => song.type === filters.type);
      }

      return await collection.toArray();
    } catch (error) {
      console.error("DB: Error filtering songs:", error);
      return fallbackToLocalStorage("get");
    }
  }

  /**
   * Search songs by text
   * @param {string} searchTerm - Search term
   * @returns {Promise<Array>} Matching songs
   */
  async function searchSongs(searchTerm) {
    try {
      const allSongs = await db.songs.toArray();
      const term = searchTerm.toLowerCase();

      return allSongs.filter((song) => {
        const searchableText = Object.values(song).join(" ").toLowerCase();
        return searchableText.includes(term);
      });
    } catch (error) {
      console.error("DB: Error searching songs:", error);
      return fallbackToLocalStorage("get");
    }
  }

  /**
   * Clear all songs (for import)
   * @returns {Promise<void>}
   */
  async function clearAll() {
    try {
      await db.songs.clear();
    } catch (error) {
      console.error("DB: Error clearing songs:", error);
      throw error;
    }
  }

  /**
   * Bulk import songs
   * @param {Array} songs - Array of songs
   * @returns {Promise<void>}
   */
  async function bulkImport(songs) {
    try {
      await db.songs.bulkAdd(songs);
    } catch (error) {
      console.error("DB: Error bulk importing:", error);
      throw error;
    }
  }

  /**
   * Fallback to localStorage if IndexedDB fails
   * @param {string} operation - Operation type
   * @param {*} data - Data for operation
   * @returns {*} Result
   */
  function fallbackToLocalStorage(operation, data = null) {
    console.warn("DB: Falling back to localStorage");

    const stored = localStorage.getItem(STORAGE_KEY);
    let songs = stored ? JSON.parse(stored) : [];

    switch (operation) {
      case "get":
        return songs;

      case "add":
        songs.push(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
        return data.id;

      case "update":
        const updateIndex = songs.findIndex((s) => s.id === data.id);
        if (updateIndex !== -1) {
          songs[updateIndex] = data;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
        }
        return updateIndex !== -1 ? 1 : 0;

      case "delete":
        songs = songs.filter((s) => s.id !== data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
        return;

      default:
        return songs;
    }
  }

  // Public API
  return {
    init,
    getAllSongs,
    addSong,
    updateSong,
    deleteSong,
    getFilteredSongs,
    searchSongs,
    clearAll,
    bulkImport,
  };
})();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = DB;
}
