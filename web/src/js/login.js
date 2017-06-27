(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = showTips;
function showTips(str) {
    alert(str);
}

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__unit_js__ = __webpack_require__(0);

/**
 * [Login 登录模块]
 * @type {Object}
 */
const Login = {
    /**
     * [checkUser 检测用户名]
     * @return {[Boolean]} [是否通过检测]
     */
    checkUser: function() {
        var $val = this.user.val().trim();
        if ($val == '') {
            __WEBPACK_IMPORTED_MODULE_0__unit_js__["a" /* showTips */]('请输入用户名！');
            return false;
        }
        return true;
    },
    /**
     * [checkPass 检测密码]
     * @return {[Boolean]} [是否通过检测]
     */
    checkPass: function() {
        var $val = this.pass.val().trim();
        if ($val == '') {
            __WEBPACK_IMPORTED_MODULE_0__unit_js__["a" /* showTips */]('请输入密码！');
            return false;
        }
        return true;
    },
    /**
     * [submitFunc 提交表单]
     */
    submitFunc: function() {
        var that = this;
        if (!this.checkUser() || !this.checkPass()) {
            return false;
        }

        if (!this.ready) {
            return false;
        }

        this.ready = false;

        $.ajax({
            url: '/Login/action',
            type: 'POST',
            dataType: 'json',
            data: {
                username: this.user.val(),
                password: this.pass.val()
            },
            success: function(data) {
                if (data.res == 1) {
                    __WEBPACK_IMPORTED_MODULE_0__unit_js__["a" /* showTips */](data.msg);
                    if (data.data.url) {
                        window.location.href = data.url;
                    }
                } else {
                    __WEBPACK_IMPORTED_MODULE_0__unit_js__["a" /* showTips */](data.msg);
                }
                that.ready = true;
            }
        })
    },
    /**
     * [init 初始化]
     */
    init: function() {
        this.ready = true;
        this.wrap = $('#loginForm');
        this.user = $('#user_name');
        this.pass = $('#pass_word');
        this.subm = $('#loginSubmit');

        this.subm.on('click', this.submitFunc.bind(this));
    }
};

Login.init();


/***/ })
/******/ ]);
});
//# sourceMappingURL=login.js.map