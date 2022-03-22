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

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack://language_phrase/./node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\nvar getRandomValues;\nvar rnds8 = new Uint8Array(16);\nfunction rng() {\n  // lazy load so that environments that need to polyfill have a chance to do so\n  if (!getRandomValues) {\n    // getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation. Also,\n    // find the complete implementation of crypto (msCrypto) on IE11.\n    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);\n\n    if (!getRandomValues) {\n      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n    }\n  }\n\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://language_phrase/./node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nvar byteToHex = [];\n\nfor (var i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).substr(1));\n}\n\nfunction stringify(arr) {\n  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack://language_phrase/./node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\nfunction v4(options, buf, offset) {\n  options = options || {};\n  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (var i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(rnds);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n//# sourceURL=webpack://language_phrase/./node_modules/uuid/dist/esm-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://language_phrase/./node_modules/uuid/dist/esm-browser/validate.js?");

/***/ }),

/***/ "./phrase.js":
/*!*******************!*\
  !*** ./phrase.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Phrase)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\r\n\r\nfunction replaceCharacters (text) {\r\n  // Array of objects in format {toReplace, replacer}\r\n  const rules = [\r\n    // Polish letters\r\n    {\"ą\":\"a\"},\r\n    {\"ę\":\"e\"},\r\n    {\"ź\":\"z\"},\r\n    {\"ż\":\"z\"},\r\n    {\"ć\":\"c\"},\r\n    {\"ń\":\"n\"},\r\n    {\"ł\":\"l\"},\r\n    {\"ó\":\"o\"},\r\n    {\"ś\":\"s\"},\r\n    // German letters\r\n    {\"ä\":\"ae\"},\r\n    {\"ö\":\"oe\"},\r\n    {\"ü\":\"ue\"},\r\n    {\"ß\":\"ss\"},\r\n    // Other characters\r\n    {\".\":\"\"}\r\n  ];\r\n\r\n  rules.forEach(rule => {\r\n    const [toReplace, replacer] = Object.keys(rule);\r\n    text = text.replaceAll(toReplace, replacer);\r\n  });\r\n\r\n  return text;\r\n}\r\nclass Phrase {\r\n  constructor(originalText, translatedText, id = null, group=-1) {\r\n    this.originalText = originalText;\r\n    this.translatedText = translatedText;\r\n    this.id = id ?? (0,uuid__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().toString().substr(0, 5);\r\n    // Default group -1 indicated that Phrase does not belong to group at all.\r\n    this.group = group;\r\n  }\r\n\r\n  checkTranslation(translation, direction) {\r\n    translation = translation.toLowerCase().trim();\r\n    translation = replaceCharacters(translation);\r\n    if (direction !== \"to\" && direction !== \"from\") {\r\n      throw new Error(\"Wrong direction\");\r\n    }\r\n    let tmp = {};\r\n    Object.assign(tmp, this);\r\n    // Replace german and polish letters\r\n    tmp.translatedText = tmp.translatedText.toLowerCase().trim();\r\n    tmp.translatedText = replaceCharacters(tmp.translatedText);\r\n\r\n    tmp.originalText = tmp.originalText.toLowerCase().trim();\r\n    tmp.originalText = replaceCharacters(tmp.originalText);\r\n\r\n    if (direction === \"to\") {\r\n      return haveMutualSections(translation, tmp.originalText);\r\n    //  return translation === tmp.originalText;\r\n    } else {\r\n      return haveMutualSections(translation, tmp.translatedText);\r\n    //  return translation === tmp.translatedText;\r\n    }\r\n  }\r\n\r\n  toString () {\r\n    return Object.keys().reduce((prev, next) => prev + next + \"\\n\", \"\");\r\n  }\r\n\r\n  static localStorageTag = \"learner_data\";\r\n\r\n  static loadFromStorage(all=true, phraseId=null, group=-1) {\r\n    let data = JSON.parse(localStorage.getItem(Phrase.localStorageTag));\r\n    if (!data || data.length === 0) {\r\n      // When data does not yet exist (script fruns for first time for example)\r\n      return [];\r\n    }\r\n\r\n    let phrases = data;\r\n    if ((phrases instanceof Array) === false) {\r\n      // Only instances of Array can be retrieved.\r\n      throw new Error(\"Data must be array!\");\r\n    }\r\n    let allPhrases = [];\r\n    for (let phraseData of phrases) {\r\n      if (phraseData.group === group) {\r\n        allPhrases.push(new Phrase(phraseData.originalText,\r\n          phraseData.translatedText, phraseData.id, phraseData.group\r\n        ));\r\n      }\r\n    }\r\n    if (all) {\r\n      // Get all phrases from storage. Note that \"phraseId\" param. is ignored\r\n      return allPhrases;\r\n    }\r\n    if (phraseId) {\r\n      // Load particular phrase with id from memory.\r\n      return allPhrases.find(phrase =>{ return phrase.id === phraseId});\r\n    }\r\n\r\n    // When phraseId is false, just  get random phrase in range [0, max - 1]\r\n    const max = allPhrases.length, min = 0;\r\n    let randomIndex = Math.floor(Math.random() * (max - min) + min);\r\n\r\n    return allPhrases[randomIndex];\r\n  }\r\n\r\n  /* This function saves phrase instance to local storage.\r\n    When given phrase already exists in local storage, its replaced. */\r\n  static saveToStorage(phraseInstance) {\r\n    if (!(phraseInstance instanceof Phrase)) {\r\n      throw new Error(\"Instance of Phrase required!\");\r\n    }\r\n    let currentPhrases = Phrase.loadFromStorage();\r\n    let phraseExists = false;\r\n    for (let idx = 0; idx < currentPhrases.length; idx++) {\r\n      if (currentPhrases[idx].id === phraseInstance.id) {\r\n        // If phrase already exists, replace it.\r\n        currentPhrases[idx].originalText = phraseInstance.originalText;\r\n        currentPhrases[idx].translatedText = phraseInstance.translatedText;\r\n        currentPhrases[idx].group = phraseInstance.group;\r\n        phraseExists = true;\r\n      }\r\n    }\r\n    // When phrase does not yet exist, create new one.\r\n    if (!phraseExists) {\r\n      currentPhrases.push(phraseInstance);\r\n    }\r\n\r\n    // Update local storage.\r\n    let serialized = JSON.stringify(currentPhrases);\r\n    localStorage.setItem(Phrase.localStorageTag, serialized);\r\n  }\r\n  static removeFromStorage(phraseId) {\r\n    // Removes phrase with given id, throws an error when does not exist.\r\n    let phrases = Phrase.loadFromStorage();\r\n    let indexToRemove = phrases.findIndex(ph => ph.id === phraseId);\r\n    if (indexToRemove === -1) {\r\n      // -1 means that id was not found\r\n      throw new Error(\"Phrase not found\");\r\n    }\r\n    phrases.splice(indexToRemove, 1);\r\n    // Refresh local storage\r\n    localStorage.setItem(Phrase.localStorageTag, JSON.stringify(phrases));\r\n  }\r\n}\r\n\r\nfunction haveMutualSections (first, second, separator=\",\") {\r\n  let splitFirst = first.split(separator);\r\n  let splitSecond = second.split(separator);\r\n\r\n  // Strip (trim) white characters for each section.\r\n  splitFirst = splitFirst.map(chunk => chunk.trim());\r\n  splitSecond = splitSecond.map(chunk => chunk.trim());\r\n\r\n  let matchesAll = true;\r\n  for (let chunk of splitFirst) {\r\n    matchesAll = splitSecond.includes(chunk);\r\n  }\r\n\r\n  return matchesAll;\r\n}\r\n\n\n//# sourceURL=webpack://language_phrase/./phrase.js?");

/***/ }),

/***/ "./tests.js":
/*!******************!*\
  !*** ./tests.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _phrase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./phrase.js */ \"./phrase.js\");\n\r\nconsole.log(\"Hello test\");\r\nlet phrase = new _phrase_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"orig,other\", \"tran\", null, -1);\r\nlet phrase2 = new _phrase_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"orig2\",\"tran2\", null, 0);\r\nlet phrase3 = new _phrase_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"orig3\", \"tran3\", null, \"test\");\r\nlet phrase4 = new _phrase_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"orig4\", \"tran4\", null, \"test\");\r\n_phrase_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].saveToStorage(phrase);\r\n_phrase_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].saveToStorage(phrase2);\r\n_phrase_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].saveToStorage(phrase3);\r\n_phrase_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].saveToStorage(phrase4);\r\n\r\nfor (let o of _phrase_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadFromStorage()) {console.log(o);}\n\n//# sourceURL=webpack://language_phrase/./tests.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./tests.js");
/******/ 	
/******/ })()
;