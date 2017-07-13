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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showTips = showTips;
exports.callue4 = callue4;
function showTips(str) {
  alert(str);
}

function callue4() {
  CallUE4();
}

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _unit = __webpack_require__(0);

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Z = {
    /**
     * [showError 显示错误信息]
     */
    showError: function showError(msg) {
        var $siblings = this.$error;
        // show
        $siblings.removeClass('none').css({ opacity: 0 });
        $siblings.html(msg).stop(true, true).animate({ opacity: 1 }, function () {
            if ($siblings.timer) {
                clearTimeout($siblings.timer);
                $siblings.timer = null;
            }
            // hide
            $siblings.timer = setTimeout(function () {
                $siblings.stop(true, true).animate({ opacity: 0 }, function () {
                    $(this).addClass('none').html('');
                });
            }, 2000);
        });
    },
    selectPlan: function selectPlan() {
        var $cur = this.wrap.find('.chooseHead__btn.' + this.curTabName);
        this.plan = $cur.attr('type');

        /**
         * [if 自己装]
         */
        if (this.plan == 1) {
            this.planHue.addClass('none');
            this.planLabel.text('方案标签：');
            this.title.text('自己装');
        }

        /**
         * [if 智能装]
         */
        if (this.plan == 2) {
            this.planHue.removeClass('none');
            this.planLabel.text('选择风格：');
            this.title.text('智能装');
        }

        this.wrap.find('.jsPlanValue').val('');
        this.wrap.find('.jsMainHue').val('');
        this.wrap.find('.stylesTag--active').removeClass('stylesTag--active');
        this.wrap.find('.color--active').removeClass('color--active');
        this.wrap.find('.jsPlanType').val(this.plan);
    },
    changePlan: function changePlan(e) {
        var $button = $(e.target);
        $button.addClass(this.curTabName).siblings('a').removeClass(this.curTabName);
        this.selectPlan();
    },

    /**
     * [selectTagFunc 选择方案标签]
     */
    selectTagFunc: function selectTagFunc(e) {
        var $button = $(e.target),
            cname = 'stylesTag--active',
            $value = $button.attr('value');
        $button.addClass(cname).siblings('a').removeClass(cname);
        $button.siblings('input[type=hidden]').val($value);
    },

    /**
     * [selectMainHue 选择主色调]
     */
    selectMainHue: function selectMainHue(e) {
        var $button = $(e.target),
            cname = 'color--active',
            $value = $button.attr('value');
        $button.addClass(cname).siblings('a').removeClass(cname);
        $button.siblings('input[type=hidden]').val($value);
    },

    /**
     * [checkPlanParams 校验方案所需要参数]
     */
    checkPlanParams: function checkPlanParams() {
        var $planName = this.wrap.find('.jsPlanName').val(),
            $planValue = this.wrap.find('.jsPlanValue').val(),
            $planHue = this.wrap.find('.jsMainHue').val(),
            $planCustom = this.wrap.find('.jsCustomName').val(),
            $planPhone = this.wrap.find('.jsCustomPhone').val();

        if ($planName == '') {
            this.showError('请输入方案名称');
            return false;
        }

        if ($planValue == '') {
            if (this.plan == 1) {
                this.showError('请选择方案标签');
            }
            if (this.plan == 2) {
                this.showError('请选择风格');
            }
            return false;
        }

        if (this.plan == 2 && $planHue == '') {
            this.showError('请选择主色调');
            return false;
        }

        if ($planCustom == '') {
            this.showError('请输入客户姓名');
            return false;
        }

        if ($planPhone == '') {
            this.showError('请输入客户电话');
            return false;
        } else {
            if (!/^\d{11}$/.test($planPhone)) {
                this.showError('请输入正确的电话号码');
                return false;
            }
        }

        return true;
    },

    /**
     * [submitPlan 提交方案]
     */
    submitPlan: function submitPlan() {
        var _this = this;

        if (!this.checkPlanParams()) return false;

        if (!this.submitReady) return false;
        this.submitReady = false;
        console.log(this.form.serializeArray());
        $.post('/UserHouse/doaddplan', this.form.serializeArray(), function (response) {
            _this.submitReady = true;
            if (response.res == 1) {
                _unit2.default.callue4();
                window.location.href = '/';
            } else {
                _this.showError(response.msg);
            }
        }, 'json');
    },
    init: function init() {
        this.form = $('#cForm');
        this.wrap = $('#choose');

        /**
         * [title 标题]
         */
        this.title = this.wrap.find('.pubPopHead__tit');

        /**
         * [$error 错误提示]
         */
        this.$error = $('#errorTips');

        /**
         * [submitBtn 确认按钮]
         */
        this.submitBtn = $('#submitBtn');

        /**
         * [planHue 方案色调]
         */
        this.planHue = this.wrap.find('.jsHue');

        /**
         * [planLabel 方案标签]
         */
        this.planLabel = this.wrap.find('.jsPlanLab');

        /**
         * [curTabName 切换的类型]
         * @type {String}
         */
        this.curTabName = 'chooseHead__btn--active';

        /**
         * [plan 方案 1: 自己装 2: 智能装]
         * @type {Number}
         */
        this.plan = 0;
        this.selectPlan();
        this.wrap.on('click', '.chooseHead__btn', this.changePlan.bind(this));

        /**
         * 选择方案标签
         */
        this.wrap.on('click', '.stylesTag', this.selectTagFunc.bind(this));

        /**
         * 选择主色调
         */
        this.wrap.on('click', '.color__item', this.selectMainHue.bind(this));

        /**
         * 提交方案
         */
        this.submitReady = true;
        this.submitBtn.on('click', this.submitPlan.bind(this));
    }
};
Z.init();

/***/ })
/******/ ]);
});
//# sourceMappingURL=addPlan.js.map