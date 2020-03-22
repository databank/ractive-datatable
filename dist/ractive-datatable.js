(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("@databank/ractive-datatable", [], factory);
	else if(typeof exports === 'object')
		exports["@databank/ractive-datatable"] = factory();
	else
		root["@databank/ractive-datatable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _less_style_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _less_style_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_less_style_less__WEBPACK_IMPORTED_MODULE_0__);



/* harmony default export */ __webpack_exports__["default"] = (Ractive.extend({

	columns_length() {
		var shown_columns = this.get('columns').filter(function (c) {

			if (typeof c === "string") return true;

			if (typeof c === "object" && c.hide !== true) return true;

			return false;
		});

		return shown_columns.length;
	},

	template: `
		<div class='databank-datatable theme-{{theme}}' style='{{style}}'>
			<div class='tabledatahead'>
				{{#if checkboxes}}
					<div style='width: {{checkbox_width}}px'>
						{{#if multiselect}}
						<input class='input-checkbox' type='checkbox' checked={{selectall}} >
						{{/if}}
					</div>
				{{/if}}

				{{#columns:i}}
					{{#if (typeof . === "object") && (.hide === true) }}
					{{else}}
						<div style='width:{{#if checkboxes }}calc( 100%/{{ @this.columns_length() }} - {{ Math.ceil( ~/checkbox_width / @this.columns_length() ) }}px ){{else}}{{Math.floor(100/ @this.columns_length()  )}}%{{/if}}'>
							{{#if typeof . === "object"}}
								{{.display}}
							{{else}}
							{{.}}
							{{/if}}
						</div>
					{{/if}}
				{{/columns}}
			</div>
			<div class='tabledatacontent'>

				{{#if rows.length === 0}}
					<br><small>Empty</small>
				{{/if}}
				{{#if rows === null }}
					<br><small>Loading...</small>
				{{/if}}

				{{#if err.errorMessage }}
					<br><small style="color:red">{{err.errorMessage}}</small>
				{{/if}}

				{{#rows:row}}


				<div class='tabledatarow {{#if ~/selection[row].selected}}selected{{/if}}' on-click='selectrow'>
					{{#if checkboxes}}
						<div class='tabledatacell check' style="width: {{checkbox_width}}px;" on-click="selectcell">
							<input class='input-checkbox' type='checkbox' checked={{~/selection[row].selected}} >
						</div>
					{{/if}}

					{{#columns:i}}
						{{#if (typeof . === "object") && (.hide === true) }}
						{{else}}
							<div
								style='width:{{#if checkboxes }}calc( 100%/{{ @this.columns_length() }} - {{ Math.ceil( ~/checkbox_width / @this.columns_length() ) }}px ){{else}}{{Math.floor(100/ @this.columns_length() )}}%{{/if}}'
								class='tabledatacell

								{{#if .editable === true }}e{{/if}}
								{{#if ~/selection[row].cols[i].editing }}editing{{/if}}

								{{#if ~/rows[row][.field].hasOwnProperty('KEY')  }}t-K{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('HREF') }}t-HASH{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('S')    }}t-S{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('N')    }}t-N{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('BOOL') }}t-BOOL{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('B')    }}t-B{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('NULL') }}t-NULL{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('L')    }}t-L{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('M')    }}t-M{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('SS')   }}t-SS{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('NS')   }}t-NS{{/if}}
								{{#if ~/rows[row][.field].hasOwnProperty('BS')   }}t-BS{{/if}}
								{{#if .U}}t-U{{/if}}
								'
								{{#if ~/rows[row][.field].hasOwnProperty('HREF') }}on-click='@this.hrefclick( ~/rows[row], . )'{{/if}}

								{{#if (.editable === true) && ~/rows[row][.field].hasOwnProperty('S')    }}on-dblclick='@this.clicktoedit( row, i )'{{/if}}
								{{#if (.editable === true) && ~/rows[row][.field].hasOwnProperty('N')    }}on-dblclick='@this.clicktoedit( row, i )'{{/if}}
								{{#if (.editable === true) && ~/rows[row][.field].hasOwnProperty('BOOL') }}on-dblclick='@this.clicktoedit( row, i )'{{/if}}

								>
								{{#if typeof . === "object"}}
									{{#if ~/rows[row][.field].hasOwnProperty('HREF') }}<a>{{~/rows[row][.field].display || ~/rows[row][.field].HREF}}</a>{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('S')    }}
										{{#if ~/selection[row].cols[i].editing }}
											<input type="text" value={{~/rows[row][.field].S}} on-blur='@this.editfocusout( row, i )' />
										{{else}}
											{{ ~/rows[row][.field].S    }}
										{{/if}}
									{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('N')    }}
										{{#if ~/selection[row].cols[i].editing }}
											<input type="number" value={{~/rows[row][.field].N}} on-blur='@this.editfocusout( row, i )' />
										{{else}}
											{{ ~/rows[row][.field].N    }}
										{{/if}}
									{{/if}}

									{{#if ~/rows[row][.field].hasOwnProperty('BOOL') }}
										{{#if ~/selection[row].cols[i].editing }}
											<select value={{ ~/rows[row][.field].BOOL }} on-blur='@this.editfocusout( row, i )' >
												<option value="true">true</option>
												<option value="false">false</option>
											</select>
										{{else}}
											{{ ~/rows[row][.field].BOOL }}
										{{/if}}
									{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('B')    }}binary{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('NULL') }}NULL{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('L')    }}[...]{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('M')    }}{...}{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('SS')   }}StringSet{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('NS')   }}NumberSet{{/if}}
									{{#if ~/rows[row][.field].hasOwnProperty('BS')   }}BinarySet{{/if}}
								{{else}}
									{{.}}
								{{/if}}
							</div>
						{{/if}}
					{{/columns}}

				</div>



				{{/rows}}
			</div>
		</div>
		`,

	data: function () {
		return {
			selectall: false,
			checkbox_width: 28,
			selection: []

		};
	},
	hrefclick(item, col) {
		this.fire('href', this, item, col);
	},
	clicktoedit(rowidx, colidx) {
		this.set('selection.*.cols.*.editing', false);

		this.set('selection.' + rowidx + '.cols.' + colidx + '.editing', true);

		try {

			if (this.el.getElementsByTagName("select")) this.el.getElementsByTagName("select")[0].focus();
		} catch (e) {}

		try {
			if (this.el.querySelectorAll("input[type=number]")) this.el.querySelectorAll("input[type=number]")[0].focus();
		} catch (e) {}

		try {
			if (this.el.querySelectorAll("input[type=text]")) this.el.querySelectorAll("input[type=text]")[0].focus();
		} catch (e) {}
	},
	editfocusout(rowidx, colidx) {
		this.set('selection.' + rowidx + '.cols.' + colidx + '.editing', false);
	},
	select_event() {
		var ractive = this;
		var ret = [];
		var selection = this.get('selection').map(function (v, k, arr) {
			if (v.selected === true) ret.push(ractive.get('rows.' + k));
		});
		this.fire('select', ret);
	},

	select_all() {
		this.set('selection', this.get('selection').map(function (s) {
			return { selected: true };
		}));
		this.select_event();
	},
	select_none() {
		this.set('selection.*.selected', false);
		this.select_event();
	},
	on: {
		init() {

			this.observe('selectall', function (n, o, keypath) {
				if (n) {
					this.set('selection', this.get('selection').map(function (s) {
						return { selected: true };
					}));
					this.select_event();
					return;
				}

				this.set('selection.*.selected', false);
				this.select_event();
			}, { init: false });
		},
		selectcell(e) {
			var keypath = e.resolve().split('rows').join('selection');

			var is_selected = this.get(keypath + '.selected');

			var is_multiselect = this.get('multiselect') !== false;

			if (!is_multiselect) this.set('selection.*.selected', false);

			if (is_selected) this.set(keypath + '.selected', false);else this.set(keypath + '.selected', true);

			this.select_event();
		}
	}
}));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ])["default"];
});