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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


;
~function () {
    $(document).ready(function () {
        $('#z8').fullpage({
            continuousVertical: true,
            afterLoad: function afterLoad() {
                //console.log($(this).addClass('active'));
            }
        });
    });
}();

;
~function (log) {
    var register = {
        els: function els() {
            this.root = $('#form');
            this.name = this.root.find('.form__input--name');
            this.tel = this.root.find('.form__input--tel');
            this.typePer = this.root.find('.radio--personal');
            this.typeInc = this.root.find('.radio--inc');
            this.inc = this.root.find('.form__input--inc');
            this.incWrap = this.root.find('.inc');
            this.submitBtn = this.root.find('.btn__page4');
            this.err = this.root.find('.error');
        },
        init: function init() {
            this.els();
            this.data = {};
            this.setRadio();
            this.submitFun();
        },
        setRadio: function setRadio() {
            var _this = this;
            this.getRadioVal();
            this.data.type = 'personal';
            $('.radio').on('change', function () {
                _this.getRadioVal();
                if (_this.radio === 'inc') {
                    _this.incWrap.toggleClass('none');
                    _this.data.type = 'inc';
                } else {
                    _this.incWrap.toggleClass('none');
                    _this.data.type = 'personal';
                }
            });
        },
        getRadioVal: function getRadioVal() {
            this.radio = this.root.find("input[type='radio']:checked").val();
        },
        validator: function validator(opts) {
            switch (opts.type) {
                case 'name':
                    var reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        alert('请输入姓名');
                        return false;
                    }
                    return true;
                case 'tel':
                    var reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        alert('请输入正确的电话号码');
                        return false;
                    }
                    return true;
                case 'inc':
                    var reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        alert('检查公司名称');
                        return false;
                    }
                    return true;
                default:
                    if (opts.val === '') {
                        alert('内容不能为空');
                        return false;
                    }
                    return true;
                    break;
            }
        },
        nameFun: function nameFun() {
            if (this.validator({
                type: 'name',
                val: this.name.val()
            })) {
                this.data.name = this.name.val();
                return true;
            }
            return false;
        },
        telFun: function telFun() {
            if (this.validator({
                type: 'tel',
                val: this.tel.val()
            })) {
                this.data.tel = this.tel.val();
                return true;
            }
            return false;
        },
        incFun: function incFun() {
            if (this.validator({
                type: 'inc',
                val: this.inc.val()
            })) {
                this.data.inc = this.inc.val();
                return true;
            }
            return false;
        },
        submitFun: function submitFun() {
            var _this = this;
            this.submitBtn.on('click', function () {
                if (_this.data.type === 'inc') {
                    if (_this.nameFun() && _this.telFun() && _this.incFun()) _this.ajaxFun();
                } else {
                    if (_this.nameFun() && _this.telFun()) _this.ajaxFun();
                }
            });
        },
        ajaxFun: function ajaxFun() {
            var _this = this;
            $.ajax({
                type: 'GET',
                url: window.location.href,
                data: _this.data,
                success: function success(data) {}
            });
        }
    }.init();
}(console.log);

/***/ })
/******/ ]);
});
//# sourceMappingURL=app.js.map