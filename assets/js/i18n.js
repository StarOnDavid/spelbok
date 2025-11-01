// ============================================
// SpelBok - i18n Module
// Internationalization loader
// © 2025 David Staron
// ============================================

const I18n = (() => {
  const LANGUAGE_KEY = "musikRepertoireLanguage";
  const SUPPORTED_LANGUAGES = ["sv", "de", "en"];
  const DEFAULT_LANGUAGE = "sv";

  let currentLanguage = DEFAULT_LANGUAGE;
  let translations = {};

  /**
   * Load translation file for specified language
   * @param {string} lang - Language code (sv, de, en)
   * @returns {Promise<Object>} Translation object
   */
  async function loadTranslations(lang) {
    try {
      const response = await fetch(`./assets/i18n/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error loading ${lang} translations:`, error);
      // Fallback to default language
      if (lang !== DEFAULT_LANGUAGE) {
        console.log(`Falling back to ${DEFAULT_LANGUAGE}`);
        return loadTranslations(DEFAULT_LANGUAGE);
      }
      return {};
    }
  }

  /**
   * Initialize i18n system
   * @returns {Promise<void>}
   */
  async function init() {
    // Get saved language or use default
    const savedLang = localStorage.getItem(LANGUAGE_KEY);
    currentLanguage =
      savedLang && SUPPORTED_LANGUAGES.includes(savedLang)
        ? savedLang
        : DEFAULT_LANGUAGE;

    // Load translations
    translations = await loadTranslations(currentLanguage);

    // Update language selector
    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) {
      languageSelect.value = currentLanguage;
    }

    return translations;
  }

  /**
   * Change language and reload translations
   * @param {string} lang - Language code
   * @returns {Promise<Object>} New translations
   */
  async function changeLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      console.error(`Unsupported language: ${lang}`);
      return translations;
    }

    currentLanguage = lang;
    localStorage.setItem(LANGUAGE_KEY, lang);
    translations = await loadTranslations(lang);

    return translations;
  }

  /**
   * Get translation for key
   * @param {string} key - Translation key
   * @param {Object} params - Optional parameters for interpolation
   * @returns {string} Translated text
   */
  function t(key, params = {}) {
    let text = translations[key] || key;

    // Simple parameter interpolation
    Object.keys(params).forEach((param) => {
      text = text.replace(new RegExp(`\\{${param}\\}`, "g"), params[param]);
    });

    return text;
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  function getCurrentLanguage() {
    return currentLanguage;
  }

  /**
   * Get all translations
   * @returns {Object} All translations for current language
   */
  function getTranslations() {
    return translations;
  }

  /**
   * Check if language is supported
   * @param {string} lang - Language code
   * @returns {boolean}
   */
  function isSupported(lang) {
    return SUPPORTED_LANGUAGES.includes(lang);
  }

  /**
   * Get list of supported languages
   * @returns {Array<string>}
   */
  function getSupportedLanguages() {
    return [...SUPPORTED_LANGUAGES];
  }

  // Public API
  return {
    init,
    changeLanguage,
    t,
    getCurrentLanguage,
    getTranslations,
    isSupported,
    getSupportedLanguages,
  };
})();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = I18n;
}
