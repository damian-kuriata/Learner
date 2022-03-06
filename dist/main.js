/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/language_phrase/phrase.js":
/*!************************************************!*\
  !*** ./node_modules/language_phrase/phrase.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Phrase)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\nfunction replaceCharacters (text) {\n  // Array of objects in format {toReplace, replacer}\n  const rules = [\n    // Polish letters\n    {\"ą\":\"a\"},\n    {\"ę\":\"e\"},\n    {\"ź\":\"z\"},\n    {\"ż\":\"z\"},\n    {\"ć\":\"c\"},\n    {\"ń\":\"n\"},\n    {\"ł\":\"l\"},\n    {\"ó\":\"o\"},\n    {\"ś\":\"s\"},\n    // German letters\n    {\"ä\":\"ae\"},\n    {\"ö\":\"oe\"},\n    {\"ü\":\"ue\"},\n    {\"ß\":\"ss\"},\n    // Other characters\n    {\".\":\"\"}\n  ];\n\n  rules.forEach(rule => {\n    const [toReplace, replacer] = Object.keys(rule);\n    text = text.replaceAll(toReplace, replacer);\n  });\n\n  return text;\n}\nclass Phrase {\n  constructor(originalText, translatedText, id = null) {\n    this.originalText = originalText;\n    this.translatedText = translatedText;\n    this.id = id ?? (0,uuid__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().toString().substr(0, 5);\n  }\n\n  checkTranslation(translation, direction) {\n    translation = translation.toLowerCase().trim();\n    translation = replaceCharacters(translation);\n    if (direction !== \"to\" && direction !== \"from\") {\n      throw new Error(\"Wrong direction\");\n    }\n    let tmp = {};\n    Object.assign(tmp, this);\n    // Replace german and polish letters\n    tmp.translatedText = tmp.translatedText.toLowerCase().trim();\n    tmp.translatedText = replaceCharacters(tmp.translatedText);\n\n    tmp.originalText = tmp.originalText.toLowerCase().trim();\n    tmp.originalText = replaceCharacters(tmp.originalText);\n\n    if (direction === \"to\") {\n      return haveMutualSections(translation, tmp.originalText);\n    //  return translation === tmp.originalText;\n    } else {\n      return haveMutualSections(translation, tmp.translatedText);\n    //  return translation === tmp.translatedText;\n    }\n  }\n\n  static localStorageTag = \"learner_data\";\n\n  static loadFromStorage(all=true, phraseId=null) {\n    let data = JSON.parse(localStorage.getItem(Phrase.localStorageTag));\n    if (!data || data.length === 0) {\n      // When data does not yet exist (script fruns for first time for example)\n      return [];\n    }\n\n    let phrases = data;\n    if ((phrases instanceof Array) === false) {\n      // Only instances of Array can be retrieved.\n      throw new Error(\"Data must be array!\");\n    }\n    let allPhrases = phrases.map(phraseData => {\n      return new Phrase(phraseData.originalText,\n        phraseData.translatedText, phraseData.id);\n      });\n    if (all) {\n      // Get all phrases from storage. Note that \"phraseId\" param. is ignored\n      return allPhrases;\n    }\n    if (phraseId) {\n      // Load particular phrase with id from memory.\n      return allPhrases.find(phrase =>{ return phrase.id === phraseId});\n    }\n\n    // When phraseId is false, just  get random phrase in range [0, max - 1]\n    const max = allPhrases.length, min = 0;\n    let randomIndex = Math.floor(Math.random() * (max - min) + min);\n\n    return allPhrases[randomIndex];\n  }\n\n  /* This function saves phrase instance to local storage.\n    When given phrase already exists in local storage, its replaced. */\n  static saveToStorage(phraseInstance) {\n    if (!(phraseInstance instanceof Phrase)) {\n      throw new Error(\"Instance of Phrase required!\");\n    }\n    let currentPhrases = Phrase.loadFromStorage();\n    let phraseExists = false;\n    for (let idx = 0; idx < currentPhrases.length; idx++) {\n      if (currentPhrases[idx].id === phraseInstance.id) {\n        // If phrase already exists, replace it.\n        currentPhrases[idx].originalText = phraseInstance.originalText;\n        currentPhrases[idx].translatedText = phraseInstance.translatedText;\n        phraseExists = true;\n      }\n    }\n    // When phrase does not yet exist, create new one.\n    if (!phraseExists) {\n      currentPhrases.push(phraseInstance);\n    }\n\n    // Update local storage.\n    let serialized = JSON.stringify(currentPhrases);\n    localStorage.setItem(Phrase.localStorageTag, serialized);\n  }\n  static removeFromStorage(phraseId) {\n    // Removes phrase with given id, throws an error when does not exist.\n    let phrases = Phrase.loadFromStorage();\n    let indexToRemove = phrases.findIndex(ph => ph.id === phraseId);\n    if (indexToRemove === -1) {\n      // -1 means that id was not found\n      throw new Error(\"Phrase not found\");\n    }\n    phrases.splice(indexToRemove, 1);\n    // Refresh local storage\n    localStorage.setItem(Phrase.localStorageTag, JSON.stringify(phrases));\n  }\n}\n\nfunction haveMutualSections (first, second, separator=\",\") {\n  let splitFirst = first.split(separator);\n  let splitSecond = second.split(separator);\n\n  // Strip (trim) white characters for each section.\n  splitFirst = splitFirst.map(chunk => chunk.trim());\n  splitSecond = splitSecond.map(chunk => chunk.trim());\n\n  let matchesAll = true;\n  for (let chunk of splitFirst) {\n    matchesAll = splitSecond.includes(chunk);\n  }\n\n  return matchesAll;\n}\n\n\n//# sourceURL=webpack://learner/./node_modules/language_phrase/phrase.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack://learner/./node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\nvar getRandomValues;\nvar rnds8 = new Uint8Array(16);\nfunction rng() {\n  // lazy load so that environments that need to polyfill have a chance to do so\n  if (!getRandomValues) {\n    // getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation. Also,\n    // find the complete implementation of crypto (msCrypto) on IE11.\n    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);\n\n    if (!getRandomValues) {\n      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n    }\n  }\n\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://learner/./node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nvar byteToHex = [];\n\nfor (var i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).substr(1));\n}\n\nfunction stringify(arr) {\n  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack://learner/./node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\nfunction v4(options, buf, offset) {\n  options = options || {};\n  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (var i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(rnds);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n//# sourceURL=webpack://learner/./node_modules/uuid/dist/esm-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://learner/./node_modules/uuid/dist/esm-browser/validate.js?");

/***/ }),

/***/ "./src/HideableMixin.js":
/*!******************************!*\
  !*** ./src/HideableMixin.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Hideable)\n/* harmony export */ });\nclass Hideable {\r\n  constructor () {\r\n    if (this.constructor === Hideable) {\r\n      throw new Error(\"Cannot instantiate abstract class\");\r\n    }\r\n    this.hiddenClassName = \"hidden\";\r\n  }\r\n\r\n  hide (...params) {\r\n    if (!(this.container instanceof Element)) {\r\n      const msg = \"In order to use hide and show, container property must be Element.\";\r\n      throw new Error(msg);\r\n    }\r\n    this.container.classList.add(this.hiddenClassName);\r\n  }\r\n\r\n  show (...params) {\r\n    if (!(this.container instanceof Element)) {\r\n      const msg = \"In order to use hide and show, container property must exist.\";\r\n      throw new Error(msg);\r\n    }\r\n    this.container.classList.remove(this.hiddenClassName);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://learner/./src/HideableMixin.js?");

/***/ }),

/***/ "./src/LearnPaneHandler.js":
/*!*********************************!*\
  !*** ./src/LearnPaneHandler.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ LearnPaneHandler)\n/* harmony export */ });\n/* harmony import */ var language_phrase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! language_phrase */ \"./node_modules/language_phrase/phrase.js\");\n/* harmony import */ var _HideableMixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HideableMixin */ \"./src/HideableMixin.js\");\n\r\n\r\n\r\nclass LearnPaneHandler extends _HideableMixin__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\r\n  constructor(learnPane) {\r\n    super();\r\n    // Important, hide() and show() methods are inherited, and they require\r\n    // property named \"container\" to work.\r\n    this.container = learnPane;\r\n    this.currentPhrase = null;\r\n    this.translationDirection;\r\n    this.translatedPhrase = document.querySelector(\"#translated-phrase\");\r\n    this.learnPhraseInput = document.querySelector(\"#learn-phrase-input\");\r\n    this.resultText = document.querySelector(\"#result-text\");\r\n    this.checkButton =\r\n      document.querySelector(\"#check-btn\");\r\n\r\n    this.checkButton.addEventListener(\"click\", () => {\r\n      if (this.currentPhrase) {\r\n        this.checkInput();\r\n      }\r\n    });\r\n    // Enter key support.\r\n    this.learnPhraseInput.addEventListener(\"keyup\", (ev) => {\r\n      if (this.currentPhrase && ev.keyCode === 13) {\r\n        this.checkInput();\r\n        ev.preventDefault();\r\n      }\r\n    });\r\n\r\n    this.nextButton = document.querySelector(\"#next-btn\");\r\n    this.nextButton.addEventListener(\"click\", () => {\r\n      this.processOnePhrase();\r\n    });\r\n  }\r\n\r\n  /* This method obtains phrase from storage and updates relevant fields. */\r\n  processOnePhrase() {\r\n    this.learnPhraseInput.value = \"\";\r\n    this.resultText.textContent = \"\";\r\n    this.translationDirection = Math.floor(Math.random() * (1 - 0 + 1)) + 0;\r\n    this.translationDirection = this.translationDirection === 0? \"to\":\"from\";\r\n    // Obtain next phrase random.\r\n    this.currentPhrase = language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadFromStorage(false)\r\n    // Array instance is returned in case of empty data.\r\n    if (this.currentPhrase instanceof Array) {\r\n      this.translatedPhrase.textContent = \"At first add phrases!\";\r\n      this.currentPhrase = null;\r\n      return;\r\n    }\r\n    if (this.translationDirection === \"to\") {\r\n      this.translatedPhrase.textContent =\r\n        this.currentPhrase.translatedText;\r\n    } else {\r\n      this.translatedPhrase.textContent =\r\n        this.currentPhrase.originalText;\r\n    }\r\n  }\r\n\r\n  checkInput () {\r\n    let userTranslation = this.learnPhraseInput.value;\r\n    let correct =\r\n      this.currentPhrase.checkTranslation(userTranslation,\r\n        this.translationDirection);\r\n    if (correct) {\r\n      this.#onCorrectInput();\r\n    } else {\r\n      this.#onIncorrectInput();\r\n    }\r\n  }\r\n\r\n  #onCorrectInput () {\r\n    this.processOnePhrase();\r\n  }\r\n\r\n  #onIncorrectInput () {\r\n    this.resultText.textContent = \"Wrong, correct answer: \";\r\n    if (this.translationDirection === \"to\") {\r\n      this.resultText.textContent += this.currentPhrase.originalText;\r\n    } else {\r\n      this.resultText.textContent += this.currentPhrase.translatedText;\r\n    }\r\n    this.resultText.classList.add(\"feedback-incorrect\");\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://learner/./src/LearnPaneHandler.js?");

/***/ }),

/***/ "./src/Toast.js":
/*!**********************!*\
  !*** ./src/Toast.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Toast)\n/* harmony export */ });\nclass Toast {\r\n  #text;\r\n\r\n  constructor (text, autoShow=true, timeoutMillis=10000) {\r\n\r\n    this.container = document.querySelector(\"#toast\");\r\n    console.log(this.container);\r\n    this.#text = text;\r\n    this.container.textContent = text;\r\n    this.shown = false;\r\n    if (autoShow) {\r\n      this.show();\r\n    }\r\n    this.timeout = timeoutMillis;\r\n\r\n    // Because it will be called by external function.\r\n\r\n  }\r\n\r\n  show () {\r\n    if (this.shown) {\r\n      // Must wait till disappears.\r\n      return;\r\n    }\r\n    this.shown = true;\r\n    this.container.classList.add(\"toast-shown\");\r\n    console.log(\"show\");\r\n    setTimeout(this.onTimeout.bind(this), 10000);\r\n  }\r\n\r\n  onTimeout () {\r\n    console.log(\"timeout\");\r\n    this.container.classList.remove(\"toast-shown\", this.timeout);\r\n    this.shown = false;\r\n  }\r\n\r\n  set text (val) {\r\n    this.#text = val;\r\n    this.container.textContent = val;\r\n  }\r\n\r\n  get text () {\r\n    return this.#text;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://learner/./src/Toast.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var language_phrase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! language_phrase */ \"./node_modules/language_phrase/phrase.js\");\n/* harmony import */ var _managePaneHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./managePaneHandler */ \"./src/managePaneHandler.js\");\n/* harmony import */ var _LearnPaneHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LearnPaneHandler */ \"./src/LearnPaneHandler.js\");\n/* harmony import */ var _phraseInputDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./phraseInputDialog */ \"./src/phraseInputDialog.js\");\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./search */ \"./src/search.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nlet learnButton = document.querySelector(\".nav-btn:first-child\");\r\nlet manageButton = document.querySelector(\".nav-btn:nth-child(2)\");\r\nlet learnPane = document.querySelector(\"#learn-pane\");\r\nlet managePane = document.querySelector(\"#manage-pane\");\r\nlet searchValue = \"\";\r\n\r\nlet currentPane = \"learning\";\r\n\r\nlet search = new _search__WEBPACK_IMPORTED_MODULE_4__[\"default\"](onSearchChange, onSearchSubmit);\r\nlet learning = new _LearnPaneHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"](learnPane);\r\nlet manage = new _managePaneHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"](managePane);\r\n\r\nlearnButton.addEventListener(\"click\", () => {\r\n  const isCurrent = switchPane(\"learning\");\r\n  if (isCurrent) {\r\n    return;\r\n  }\r\n  learning.processOnePhrase();\r\n});\r\n\r\nmanageButton.addEventListener(\"click\", () => {\r\n  const isCurrent = switchPane(\"manage\");\r\n  if (isCurrent) manage\r\n});\r\n\r\nlearning.processOnePhrase();\r\n\r\nfunction onSearchChange (ev) {\r\n  searchValue = ev.target.value;\r\n}\r\n\r\n// Switches to \"manage pane\" (if not already in) showing search results.\r\nfunction onSearchSubmit (ev) {\r\n  switchPane(\"manage\", searchValue);\r\n  console.log(\"submit\");\r\n  ev.preventDefault();\r\n  return false;\r\n}\r\n\r\nfunction switchPane (paneName, ...params) {\r\n  switch (paneName) {\r\n    case \"learning\":\r\n      if (currentPane === \"learning\") return true;\r\n      currentPane = \"learning\";\r\n      learning.show(...params);\r\n      manage.hide();\r\n      learnButton.classList.add(\"active-nav-btn\");\r\n      manageButton.classList.remove(\"active-nav-btn\");\r\n    break;\r\n    case \"manage\":\r\n      if (currentPane === \"manage\") {\r\n          manage.show(...params);\r\n          return;\r\n      }\r\n      currentPane = \"manage\";\r\n      manage.show(...params);\r\n      learning.hide();\r\n      learnButton.classList.remove(\"active-nav-btn\");\r\n      manageButton.classList.add(\"active-nav-btn\");\r\n    break;\r\n  }\r\n  return false;\r\n}\r\n\n\n//# sourceURL=webpack://learner/./src/index.js?");

/***/ }),

/***/ "./src/managePaneHandler.js":
/*!**********************************!*\
  !*** ./src/managePaneHandler.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ManagePaneHandler)\n/* harmony export */ });\n/* harmony import */ var language_phrase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! language_phrase */ \"./node_modules/language_phrase/phrase.js\");\n/* harmony import */ var _phraseInputDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./phraseInputDialog */ \"./src/phraseInputDialog.js\");\n/* harmony import */ var _HideableMixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HideableMixin */ \"./src/HideableMixin.js\");\n/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Toast */ \"./src/Toast.js\");\n\r\n\r\n\r\n\r\n\r\nclass PhraseList  {\r\n  constructor(listElement, onDelete, onEdit) {\r\n    this.listElement = listElement;\r\n    this.onDelete = onDelete;\r\n    this.onEdit = onEdit;\r\n    this.refresh(language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadFromStorage());\r\n  }\r\n\r\n  refresh(phrases) {\r\n    this.phrases = phrases;\r\n    // At first remove previous phrases.\r\n    while (this.listElement.firstChild) {\r\n      this.listElement.removeChild(this.listElement.firstChild);\r\n    }\r\n\r\n    this.phrases.forEach((phrase, idx) => {\r\n      // Update HTML document.\r\n      let phraseItem = document.createElement(\"li\");\r\n      const phraseID = phrase.id;\r\n      phraseItem.setAttribute(\"id\", \"phrase\" + phraseID);\r\n      phraseItem.innerHTML = `\r\n        <div>\r\n        ${idx + 1}.${phrase.originalText}\r\n\r\n        </div>\r\n      `;\r\n      // Append edit and delete buttons.\r\n      const editButton = document.createElement(\"button\");\r\n      editButton.classList.add(\"edit-button\");\r\n      editButton.setAttribute(\"id\", \"edit\" + phraseID);\r\n      editButton.addEventListener(\"click\", (e) => {\r\n        const id = e.target.getAttribute(\"id\").slice(4); // editi<d>\r\n        console.log(\"Before: \", phrase);\r\n        this.onEdit(phrase);\r\n      });\r\n      editButton.textContent = \"Edit\";\r\n\r\n      const deleteButton = document.createElement(\"button\");\r\n      deleteButton.classList.add(\"delete-button\");\r\n      deleteButton.setAttribute(\"id\", \"delete\" + phraseID);\r\n      deleteButton.addEventListener(\"click\", () => {\r\n        const id = deleteButton.getAttribute(\"id\").slice(6); // deleteid\r\n        console.log(\"Delete id: \", id);\r\n        this.onDelete(phrase.id);\r\n      });\r\n      deleteButton.textContent = \"X\";\r\n      deleteButton.setAttribute(\"aria-label\", \"Delete phrase\");\r\n\r\n      phraseItem.appendChild(editButton);\r\n      phraseItem.appendChild(deleteButton);\r\n      this.listElement.appendChild(phraseItem);\r\n    });\r\n  }\r\n}\r\n\r\nclass ManagePaneHandler extends _HideableMixin__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\r\n  constructor (managePane) {\r\n    super();\r\n    this.newOriginalText = \"\";\r\n    this.newTranslatedText = \"\";\r\n    this.phraseEdited = null;\r\n    this.searchTerm = \"\";\r\n\r\n    this.container = managePane;\r\n     // Because methods are later passed as callbacks, their this is out of\r\n     // Range, so at first we have to set it to as fixed value.\r\n    this.onNewOriginalTextChange = this.onNewOriginalTextChange.bind(this);\r\n    this.onNewTranslatedTextChange = this.onNewTranslatedTextChange.bind(this);\r\n    this.onPhraseEdit = this.onPhraseEdit.bind(this);\r\n    this.onPhraseDelete = this.onPhraseDelete.bind(this);\r\n    this.onConfirm = this.onConfirm.bind(this);\r\n    this.onClose = this.onClose.bind(this);\r\n\r\n    const handlers = {\r\n      \"originalTextInput\": this.onNewOriginalTextChange,\r\n      \"translatedTextInput\": this.onNewTranslatedTextChange,\r\n      \"closeButton\": this.onClose,\r\n      \"confirmButton\": this.onConfirm,\r\n      // Same as close.\r\n      \"cancelButton\": this.onClose\r\n    };\r\n\r\n    this.phraseList = new PhraseList(document.querySelector(\".phrases-list\"),\r\n      this.onPhraseDelete, this.onPhraseEdit);\r\n\r\n    this.phraseInputDialog = new _phraseInputDialog__WEBPACK_IMPORTED_MODULE_1__[\"default\"](handlers);\r\n\r\n    this.newButton = document.querySelector(\"#new-button\");\r\n    this.newButton.addEventListener(\"click\", () => {\r\n      this.phraseInputDialog.show();\r\n      // Once the dialog is shown, button must be disabled to prevent\r\n      // Multiple opened dialogs.\r\n      this.newButton.disabled = true;\r\n    });\r\n\r\n    this.clearAllButton = document.querySelector(\"#clear-all-button\");\r\n    this.clearAllButton.addEventListener(\"click\", () => {\r\n      // Delete all phrases.\r\n      const all = language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadFromStorage(true);\r\n      for (let one of all) {\r\n        language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeFromStorage(one.id);\r\n      }\r\n      this.phraseList.refresh([]);\r\n    });\r\n\r\n    this.phrasesFileForm = document.querySelector(\"#file-form\");\r\n    this.phrasesFileForm.addEventListener(\"submit\", async (ev) => {\r\n      ev.preventDefault();\r\n      const file =\r\n        document.querySelector(\"#phrases-file\").files[0];\r\n\r\n      const loadedPhrases = await loadPhrasesFromFile(file);\r\n      // Save to storage.\r\n      for (const phrase of loadedPhrases) {\r\n        language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].saveToStorage(phrase);\r\n      }\r\n      this.phraseList.refresh(language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadFromStorage());\r\n    });\r\n  }\r\n\r\n  onPhraseDelete (id) {\r\n    language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeFromStorage(id);\r\n    const  phrases = language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadFromStorage();\r\n    this.phraseList.refresh(phrases);\r\n  }\r\n\r\n  // Fired when edit phrase button is clicked\r\n  onPhraseEdit (phrase) {\r\n    this.phraseEdited = phrase;\r\n    console.log(\"Phrae in edit: \", phrase);\r\n    this.newOriginalText = phrase.originalText;\r\n    this.newTranslatedText = phrase.translatedText;\r\n    this.phraseInputDialog.show();\r\n    this.phraseInputDialog.setOriginalTextValue(phrase.originalText);\r\n    this.phraseInputDialog.setTranslatedTextValue(phrase.translatedText);\r\n  }\r\n\r\n  onNewOriginalTextChange (e) {\r\n    console.log(\"Orig:\", e.target.value);\r\n    this.newOriginalText = e.target.value;\r\n  }\r\n\r\n  onNewTranslatedTextChange (e) {\r\n    console.log(\"trans: \", e.target.value);\r\n    this.newTranslatedText = e.target.value;\r\n  }\r\n\r\n  onConfirm () {\r\n    console.log(this.newOriginalText);\r\n    console.log(this.newOriginalText, this.newTranslatedText);\r\n    let toSave;\r\n    if (this.phraseEdited) {\r\n      toSave = new language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.newOriginalText, this.newTranslatedText,\r\n        this.phraseEdited.id);\r\n    } else {\r\n      toSave = new language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.newOriginalText, this.newTranslatedText);\r\n    }\r\n    console.log(\"To save: \", toSave);\r\n    language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].saveToStorage(toSave);\r\n    const  phrases = language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadFromStorage();\r\n    this.phraseList.refresh(phrases);\r\n    this.phraseInputDialog.setTranslatedTextValue(\"\");\r\n    this.phraseInputDialog.setOriginalTextValue(\"\");\r\n    this.newOriginalText = \"\";\r\n    this.newTranslatedText = \"\";\r\n    //this.#onInputComplete();\r\n  }\r\n\r\n  onClose () {\r\n    this.#onInputComplete();\r\n  }\r\n\r\n  #onInputComplete () {\r\n    this.phraseInputDialog.hide();\r\n    // Important, clear internal input data.\r\n    this.phraseInputDialog.setTranslatedTextValue(\"\");\r\n    this.phraseInputDialog.setOriginalTextValue(\"\");\r\n    this.newOriginalText = \"\";\r\n    this.newTranslatedText = \"\";\r\n    this.newButton.disabled = false;\r\n    this.phraseEdited = null;\r\n  }\r\n\r\n  /* -- Override methods from Hideable */\r\n  show (...params) {\r\n    super.show(params);\r\n\r\n    // Search term has been passed?\r\n    if (params[0]) {\r\n      this.searchTerm = params[0];\r\n      // Force list refresh.\r\n      const  phrases = language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadFromStorage();\r\n      console.log(params[0]);\r\n      this.phraseList.refresh( filterPhrases(phrases, this.searchTerm) );\r\n    }\r\n  }\r\n}\r\n\r\nfunction filterPhrases (phrases, searchTerm, caseSensitive=false) {\r\n  // Get all phrases beginning with searchTerm.\r\n  if (phrases instanceof Array === false) {\r\n    throw new Error(\"Array instance must be passed\");\r\n  }\r\n  const res =  phrases.filter((phrase) => {\r\n    // Convert to lower case when needed.\r\n    if (caseSensitive) {\r\n      phrase.originalText = phrase.originalText.toLowerCase();\r\n      phrase.translatedText = phrase.translatedText.toLowerCase();\r\n    }\r\n    if (phrase.originalText.startsWith(searchTerm) ||\r\n        phrase.translatedText.startsWith(searchTerm)) {\r\n          return true;\r\n        }\r\n        return false;\r\n  });\r\n\r\n  console.log(res);\r\n  return res;\r\n}\r\n\r\nasync function loadPhrasesFromFile (fileInstance) {\r\n  const separator = \":\";\r\n\r\n  if (fileInstance instanceof File === false) {\r\n    throw new Error(\"File instance must be provided\");\r\n  }\r\n\r\n  let phrases = [];\r\n  let textContents = await fileInstance.text();\r\n  // For some reason, text sometimes contains '/r' character. Remove it.\r\n  textContents.replaceAll(\"/r\",\"\");\r\n  // For each line.\r\n  for (let line of textContents.split(\"\\n\")) {\r\n    let [beforeSep, afterSep] = line.split(separator);\r\n    let originalText = beforeSep.trim();\r\n    let translatedText = afterSep.trim();\r\n    let newPhrase = new language_phrase__WEBPACK_IMPORTED_MODULE_0__[\"default\"](originalText, translatedText);\r\n\r\n    phrases.push(newPhrase);\r\n  }\r\n  return phrases;\r\n}\r\n\n\n//# sourceURL=webpack://learner/./src/managePaneHandler.js?");

/***/ }),

/***/ "./src/phraseInputDialog.js":
/*!**********************************!*\
  !*** ./src/phraseInputDialog.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PhraseInputDialog)\n/* harmony export */ });\n/* harmony import */ var _HideableMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HideableMixin */ \"./src/HideableMixin.js\");\n\r\n\r\nclass PhraseInputDialog extends _HideableMixin__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n  #handlers;\r\n  #inEdit;\r\n\r\n  constructor (handlers, originalText=\"\", translatedText=\"\") {\r\n    super();\r\n    this.originalText = originalText;\r\n    this.translatedText = translatedText;\r\n    this.#handlers = handlers;\r\n    this.#inEdit = false;\r\n\r\n\r\n    if (!handlers) {\r\n      return;\r\n    }\r\n\r\n    //HTML\r\n    this.container = document.querySelector(\"#phrase-input-dialog\");\r\n    this.originalTextInput = document.querySelector(\"#original-text-input\");\r\n    this.translatedTextInput = document.querySelector(\"#translated-text-input\");\r\n    this.confirmButton = document.querySelector(\".dialog-confirm-btn\");\r\n    this.cancelButton = document.querySelector(\".dialog-cancel-btn\");\r\n    this.closeButton = document.querySelector(\".dialog-close-btn\");\r\n    this.originalTextInput.value = originalText;\r\n    this.translatedTextInput.value = translatedText;\r\n\r\n    for (let handlerName in handlers) {\r\n      if (!this[handlerName]) continue;\r\n      if (this[handlerName] instanceof HTMLButtonElement) {\r\n        this[handlerName].onclick = handlers[handlerName];\r\n      } else {\r\n        this[handlerName].onchange = handlers[handlerName];\r\n        console.log(this[handlerName]);\r\n      }\r\n    }\r\n  }\r\n\r\n  setOriginalTextValue (value) {\r\n    if (!this.originalTextInput) {\r\n      throw new Error(\"No text input present\");\r\n    }\r\n    this.originalText = value;\r\n    this.originalTextInput.value = value;\r\n  }\r\n\r\n  setTranslatedTextValue (value) {\r\n    if (!this.translatedTextInput) {\r\n      throw new Error(\"No text input present\");\r\n    }\r\n    this.translatedText = value;\r\n    this.translatedTextInput.value = value\r\n  }\r\n\r\n  destroy () {\r\n    for (let elemName in this) {\r\n      // Container does not have event handlers attached.\r\n      if (elemName === \"container\") {\r\n        continue;\r\n      }\r\n      let ev;\r\n      if (elemName.endsWith(\"Input\")) {\r\n        ev = \"change\";\r\n      } else if (elemName.endsWith(\"Button\")) {\r\n        ev = \"click\";\r\n      }\r\n      this[elemName].removeEventListener(ev, this.#handlers[elemName]);\r\n    }\r\n  }\r\n\r\n  set inEdit (val) {\r\n    this.#inEdit = val;\r\n  }\r\n\r\n  get inEdit () {\r\n    return this.#inEdit;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://learner/./src/phraseInputDialog.js?");

/***/ }),

/***/ "./src/search.js":
/*!***********************!*\
  !*** ./src/search.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Search)\n/* harmony export */ });\nclass Search {\r\n  constructor (onInputChange=null, onSubmit=null) {\r\n    this.form = document.querySelector(\"#search\");\r\n    this.input = document.querySelector(\"#search > input[type='search']\");\r\n\r\n    if (onSubmit) {\r\n      this.form.addEventListener(\"submit\", onSubmit);\r\n    }\r\n    if (onInputChange) {\r\n      this.input.addEventListener(\"input\", onInputChange);\r\n    }\r\n  }\r\n\r\n  setInputValue (val) {\r\n    this.input.value = val;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://learner/./src/search.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;