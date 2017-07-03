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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showTips = showTips;
function showTips(str) {
    alert(str);
}

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _unit = __webpack_require__(0);

var u = _interopRequireWildcard(_unit);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Mark = {
    /**
     * [editing 注释添加中]
     */
    editing: function editing() {
        var $mark = this.currentMark(),
            $text = $mark.data('intro'),
            $replay = $mark.data('replay') || 0;

        this.dotEditing = true;
        this.replayShow = true;
        this.textarea.val($text ? $text : '');
        this.replyWrap.removeClass('none');
        this.replyStataWrap.attr('data-active', $replay);
    },

    /**
     * [editend 完成注释添加]
     */
    editend: function editend() {
        this.dotEditing = false;
        this.replayShow = false;
        this.textarea.val('');
        this.replyWrap.addClass('none');
    },

    /**
     * [createMark 创建mark]
     * @param  {[Object]} options [设置]
     * @return {[Object]}         [mark]
     */
    createMark: function createMark(options) {
        options = options || {};
        var $mark = $('<a href="javascript:;" class="dot dot--active"></a>');
        $mark.css({
            left: options.x + '%',
            top: options.y + '%'
        });
        return $mark;
    },

    /**
     * [addMark 添加mark]
     * @param {[Object]} e    [event]
     * @param {[Object]} $img [点击的图片]
     */
    addMark: function addMark(e, $img) {
        if (!this.checkCurrentMark()) {
            return false;
        }
        this.wrap.find('.dot').removeClass('dot--active');
        this.editing();
        var x = e.offsetX / $img.width() * 100,
            y = e.offsetY / $img.height() * 100,
            $mark = this.createMark({
            x: x,
            y: y
        });
        this.params.x = x.toFixed(4);
        this.params.y = y.toFixed(4);
        this.wrap.append($mark);
        this.scrollToEdit();
    },

    /**
     * [currentMark 当前编辑的mark]
     * @return {[Object]} [当前编辑的mark]
     */
    currentMark: function currentMark() {
        return this.wrap.find('.dot--active');
    },

    /**
     * [setCurrentMark 提交信息成功后回调添加mark信息]
     * @param {[string]} anchor_id [锚点id]
     */
    setCurrentMark: function setCurrentMark(anchor_id) {
        var $mark = this.currentMark();
        $mark.removeClass('dot--active');
        $mark.data({
            ready: false,
            anchor_id: anchor_id,
            intro: this.params.intro,
            replay: 0
        });
    },

    /**
     * [deleteMark 删除mark]
     */
    deleteMark: function deleteMark() {
        var $mark = this.currentMark(),
            anchor_id = $mark.data('anchor_id'),
            delMark = function () {
            $mark.remove();
            this.editend();
        }.bind(this);

        if (!anchor_id) {
            delMark();
            return false;
        }

        $.ajax({
            url: '/Plan/doaddanchor',
            type: 'POST',
            dataType: 'json',
            data: {
                anchor_id: anchor_id
            },
            success: function success(response) {
                if (response.res == 1) {
                    delMark();
                } else {
                    u.showTips(data.msg);
                }
            }
        });
    },

    /**
     * [checkTextArea 检测输入框是为空]
     * @return {[Boolean]} [检测结果]
     */
    checkTextArea: function checkTextArea() {
        var $val = this.textarea.val(),
            $val = $val.trim();
        if ($val == '') {
            u.showTips('请输入当前锚点表达信息');
            return false;
        }
        return true;
    },

    /**
     * [checkCurrentMark 提交的时候检测当前锚点]
     * @return {[Boolean]} [是否要以编辑其他锚点]
     */
    checkCurrentMark: function checkCurrentMark() {
        var $mark = this.currentMark(),
            $val = this.textarea.val().trim();

        if ($mark.length > 0) {
            // 有当前编辑的mark
            // 如果已提交过，比较当前编辑mark内容是否变动 
            if ($mark.data('intro') != $val) {
                u.showTips('当前锚点处于编辑状态，请提交或者删除此锚点！');
                return false;
            }
        }
        return true;
    },

    /**
     * [showMarkInfo 展示锚点信息]
     * @param  {[Object]} $dot [锚点]
     */
    showMarkInfo: function showMarkInfo($dot) {
        if (!this.checkCurrentMark()) return false;

        $dot.siblings('.dot').removeClass('dot--active').data('ready', false);
        if ($dot.data('ready')) return false;
        $dot.removeClass('dot--unread').addClass('dot--active').data('ready', true);

        this.editing();
    },

    /**
     * [submitHandler 提交锚点信息]
     */
    submitHandler: function submitHandler() {
        var that = this;
        if (!this.checkTextArea()) {
            return false;
        }

        if (!this.subReady) {
            return false;
        }

        this.subReady = false;

        this.params.intro = this.textarea.val();

        // this.setCurrentMark(Math.random());
        // this.editend();
        // this.subReady = true;
        // return false;

        $.ajax({
            url: '/Plan/doaddanchor',
            type: 'POST',
            dataType: 'json',
            data: this.params,
            success: function success(response) {
                that.subReady = true;
                if (response.res == 1) {
                    that.setCurrentMark(response.data.anchor_id);
                    that.editend();
                } else {
                    u.showTips(response.msg);
                }
            }
        });
    },

    /**
     * [scrollToEdit 滚动到编辑]
     */
    scrollToEdit: function scrollToEdit() {
        $(window).scrollTop(this.replyStataWrap.offset().top);
    },
    init: function init() {
        var that = this;

        /**
         * [replyWrap 注释框]
         * @type {[Object]}
         */
        this.replyWrap = $('#replyWrap');
        this.replyStataWrap = $('#replyStataWrap');

        /**
         * [btnSubmit 提交mark点]
         * @type {[Object]}
         */
        this.btnSubmit = $('#btnSubmit');

        /**
         * [btnDelete 删除mark点]
         * @type {[Object]}
         */
        this.btnDelete = $('#btnDelete');

        /**
         * [textarea 输入框]
         * @type {[Object]}
         */
        this.textarea = this.replyWrap.find('textarea');

        /**
         * [wrap 图片外框]
         * @type {[Object]}
         */
        this.wrap = $('#imgWrap');

        /**
         * [img 需要标点的图片]
         * @type {[Object]}
         */
        this.img = this.wrap.find('img');

        /**
         * [dotEditing 正在编辑中]
         * @type {Boolean}
         */
        this.dotEditing = false;

        /**
         * [params 提交的参数]
         * @type {Object}
         */
        this.params = {
            x: 0,
            y: 0,
            intro: '', // 描述
            plan_file_id: '' // 效果图id
        };

        /**
         * [replayIsShow 是否显示输入框]
         * @type {[type]}
         */
        this.replayShow = !this.replyWrap.hasClass('none');

        /**
         * [subReady 是否可以提交]
         * @type {Boolean}
         */
        this.subReady = true;

        /**
         * [点击图片添加mark]
         */
        this.img.on('mousedown', function (e) {
            that.addMark(e, $(this));
        });

        /**
         * [删除mark]
         */
        this.btnDelete.on('click', this.deleteMark.bind(this));

        /**
         * [提交加点信息]
         */
        this.btnSubmit.on('click', this.submitHandler.bind(this));

        /**
         * [点击显示点的信息]
         */
        this.wrap.on('click', '.dot', function () {
            var $this = $(this);
            that.showMarkInfo($this);
            that.scrollToEdit();
        });

        /**
         * [初始化所有点]
         */
        this.wrap.find('.dot').each(function (item) {
            var $this = $(this);
            $this.data({
                ready: false,
                anchor_id: $this.attr('anchor_id'), // 锚点id
                intro: $this.attr('intro'), // 锚点描述
                replay: $this.attr('replay') // 锚点回复
            });
        });
    }
};
Mark.init();

/***/ })

/******/ });
});
//# sourceMappingURL=mangerTwoStepLook.js.map