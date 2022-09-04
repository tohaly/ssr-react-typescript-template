/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/paths.ts":
/*!*************************!*\
  !*** ./config/paths.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paths = exports.resolvePath = exports.rootPath = void 0;
var fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
exports.rootPath = fs_1.default.realpathSync(process.cwd());
var resolvePath = function (path) { return "".concat(exports.rootPath, "/").concat(path); };
exports.resolvePath = resolvePath;
exports.paths = {
    publicPath: '/static/',
    srcClient: (0, exports.resolvePath)('src/client'),
    clientBuild: (0, exports.resolvePath)('build/client'),
    appHtml: (0, exports.resolvePath)('src/client/template.html'),
    srcServer: (0, exports.resolvePath)('src/server'),
    serverBuild: (0, exports.resolvePath)('build/server'),
};


/***/ }),

/***/ "./src/client/components/App.tsx":
/*!***************************************!*\
  !*** ./src/client/components/App.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
var App = function () { return react_1.default.createElement("h1", null, "Hello ddworl\u0430\u0430deeeqwe!!"); };
exports.App = App;


/***/ }),

/***/ "./src/server/index.tsx":
/*!******************************!*\
  !*** ./src/server/index.tsx ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
var cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
var paths_1 = __webpack_require__(/*! ../../config/paths */ "./config/paths.ts");
var body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
var chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
var sssRender_1 = __webpack_require__(/*! ./middleware/sssRender */ "./src/server/middleware/sssRender.tsx");
dotenv_1.default.config();
var app = (0, express_1.default)();
// Use Nginx or Apache to serve static assets in production or remove the if() around the
// following
// lines to use the express.static middleware to serve assets for production (not recommended!)
// if (process.env.NODE_ENV === 'development') {
app.use(paths_1.paths.publicPath, express_1.default.static(path_1.default.join(paths_1.paths.clientBuild, paths_1.paths.publicPath)));
// }
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, sssRender_1.sssRender)());
app.listen(process.env.PORT || 8500, function () {
    console.log("[".concat(new Date().toISOString(), "]"), chalk_1.default.blue("App is running: http://localhost:".concat(process.env.PORT || 8500)));
});


/***/ }),

/***/ "./src/server/middleware/sssRender.tsx":
/*!*********************************************!*\
  !*** ./src/server/middleware/sssRender.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sssRender = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
var server_1 = __webpack_require__(/*! react-dom/server */ "react-dom/server");
var template_1 = __webpack_require__(/*! ../template */ "./src/server/template/index.ts");
var App_1 = __webpack_require__(/*! ../../client/components/App */ "./src/client/components/App.tsx");
var sssRender = function () {
    return function (req, res) {
        var cssScripts = [];
        var jsScripts = ['http://localhost:8501/static/bundle.js', 'http://localhost:8501/static/vendor.js'];
        var appMarkup = (0, server_1.renderToString)(react_1.default.createElement(App_1.App, null));
        var html = (0, server_1.renderToString)(react_1.default.createElement(template_1.Html, { cssScripts: cssScripts, jsScripts: jsScripts, innerHtml: appMarkup }));
        var htmlMarker = '<!doctype html>';
        return res.send(htmlMarker + html);
    };
};
exports.sssRender = sssRender;


/***/ }),

/***/ "./src/server/template/Html.tsx":
/*!**************************************!*\
  !*** ./src/server/template/Html.tsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Html = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
var Html = function (_a) {
    var cssScripts = _a.cssScripts, jsScripts = _a.jsScripts, innerHtml = _a.innerHtml;
    return (react_1.default.createElement("html", { lang: 'ru' },
        react_1.default.createElement("head", null,
            react_1.default.createElement("meta", { charSet: 'utf-8' }),
            react_1.default.createElement("meta", { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
            cssScripts.filter(Boolean).map(function (href) { return (react_1.default.createElement("link", { key: href, rel: 'stylesheet', href: href })); })),
        react_1.default.createElement("body", null,
            react_1.default.createElement("div", { id: 'app', dangerouslySetInnerHTML: { __html: innerHtml } }),
            jsScripts.filter(Boolean).map(function (src) { return (react_1.default.createElement("script", { key: src, src: src })); }))));
};
exports.Html = Html;


/***/ }),

/***/ "./src/server/template/index.ts":
/*!**************************************!*\
  !*** ./src/server/template/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./Html */ "./src/server/template/Html.tsx"), exports);


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/***/ ((module) => {

module.exports = require("chalk");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.tsx");
/******/ 	
/******/ })()
;
//# sourceMappingURL=server.js.map