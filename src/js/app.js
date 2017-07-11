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
            continuousVertical: true
        });
    });
    $('.btn__page3').on('click', function () {
        $.fn.fullpage.moveTo(4);
    });
}();

;
~function (log) {
    var register = {
        elsFun: function elsFun() {
            this.root = $('#form');
            this.els = {};
            this.els.name = this.root.find('.form__input--name');
            this.els.tel = this.root.find('.form__input--tel');
            this.els.typePer = this.root.find('.radio--personal');
            this.els.typeInc = this.root.find('.radio--inc');
            this.els.inc = this.root.find('.form__input--inc');
            this.els.incWrap = this.root.find('.inc');
            this.els.submitBtn = this.root.find('.btn__page4');
        },
        init: function init() {
            this.elsFun();
            this.data = {};
            this.setRadio();
            this.getRadioVal();
            this.submitFun();
        },
        setRadio: function setRadio() {
            $('.radio').on('change', function () {
                this.getRadioVal();
                this.els.incWrap.toggleClass('none');
            }.bind(this));
        },
        getRadioVal: function getRadioVal() {
            this.els.radios = this.root.find(".radio:checked").val();
            switch (this.els.radios) {
                case 'inc':
                    this.data.type = 'inc';
                    break;
                case 'personal':
                    this.data.type = 'personal';
                    break;
            }
        },
        validator: function validator(opts) {
            switch (opts.type) {
                case 'name':
                    var reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        this.errorFun({
                            type: opts.err.type,
                            msg: opts.err.msg,
                            callback: opts.err.callback
                        });
                        return false;
                    }
                    return true;
                case 'tel':
                    var reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        this.errorFun({
                            type: opts.err.type,
                            msg: opts.err.msg,
                            callback: opts.err.callback
                        });
                        return false;
                    }
                    return true;
                case 'inc':
                    var reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        this.errorFun({
                            type: opts.err.type,
                            msg: opts.err.msg,
                            callback: opts.err.callback
                        });
                        return false;
                    }
                    return true;
                default:
                    if (opts.val === '') {
                        this.errorFun({
                            type: opts.err.type,
                            msg: opts.err.msg,
                            callback: opts.err.callback
                        });
                        return false;
                    }
                    return true;
                    break;
            }
        },
        errorFun: function errorFun(set) {
            switch (set.type) {
                case 'alert':
                    alert(set.msg);
                    break;
                default:
                    set.callback.call(this);
                    break;
            }
        },
        nameFun: function nameFun() {
            if (this.validator({
                type: 'name',
                val: this.els.name.val(),
                err: {
                    type: 'alert',
                    msg: '请输入姓名',
                    callback: function callback() {}
                }
            })) {
                this.data.name = this.els.name.val();
                return true;
            }
            return false;
        },
        telFun: function telFun() {
            if (this.validator({
                type: 'tel',
                val: this.els.tel.val(),
                err: {
                    type: 'alert',
                    msg: '请输入正确的电话号码',
                    callback: function callback() {}
                }
            })) {
                this.data.tel = this.els.tel.val();
                return true;
            }
            return false;
        },
        incFun: function incFun() {
            if (this.validator({
                type: 'inc',
                val: this.els.inc.val(),
                err: {
                    type: 'alert',
                    msg: '检查公司名称',
                    callback: function callback() {}
                }
            })) {
                this.data.inc = this.els.inc.val();
                return true;
            }
            return false;
        },
        submitFun: function submitFun() {
            this.els.submitBtn.on('click', function () {
                if (this.data.type === 'inc') {
                    if (this.nameFun() && this.telFun() && this.incFun()) this.ajaxFun();
                } else {
                    if (this.nameFun() && this.telFun()) this.ajaxFun();
                }
            }.bind(this));
        },
        ajaxFun: function ajaxFun() {
            var _this = this;
            $.ajax({
                type: 'GET',
                url: window.location.href,
                data: _this.data,
                success: function success(data) {
                    $.fn.fullpage.moveTo(5);
                }
            });
        }
    }.init();
}(console.log);

/***/ })
/******/ ]);
});
//# sourceMappingURL=app.js.map