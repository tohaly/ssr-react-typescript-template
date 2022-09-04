"use strict";
self["webpackHotUpdatessr_template"]("main",{

/***/ "./src/client/index.tsx":
/*!******************************!*\
  !*** ./src/client/index.tsx ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var client_1 = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
var App_1 = __webpack_require__(/*! ./components/App */ "./src/client/components/App.tsx");
var container = document.getElementById('app');
if (container) {
    (0, client_1.hydrateRoot)(container, react_1.default.createElement(App_1.App, null));
}
else {
    console.error('warn container');
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("71e8b658220cf01226ea")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.bb4e5f902a43608c9707.hot-update.js.map