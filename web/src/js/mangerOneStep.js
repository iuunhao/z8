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
function showTips(str) {
    alert(str);
}

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _unit = __webpack_require__(0);

var u = _interopRequireWildcard(_unit);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Edit = {
    btnEdit: $('#btnEdit'),
    btnConfirm: $('#btnConfirm'),
    wrapper: $('#manage'),
    removeUrl: $('#removeURI').val(),
    cname: 'none',
    editName: 'manage--edit',
    /**
     * [showEdit 显示编辑按钮内容可编辑]
     */
    showEdit: function showEdit() {
        this.btnEdit.removeClass(this.cname);
        this.btnConfirm.addClass(this.cname);
        this.wrapper.removeClass(this.editName);
        this.contenteditable = false;
    },
    /**
     * [showConfirm 显示确定按钮内容可编辑]
     */
    showConfirm: function showConfirm() {
        this.contenteditable = true;
        this.btnConfirm.removeClass(this.cname);
        this.btnEdit.addClass(this.cname);
        this.wrapper.addClass(this.editName);
    },
    /**
     * [confirmHandler 提交修改]
     * @return {[Boolean]} [阻止默认事件]
     */
    confirmHandler: function confirmHandler() {
        this.showEdit();
        return false;
    },
    /**
     * [editHandler 编辑]
     * @return {[Boolean]} [阻止默认事件]
     */
    editHandler: function editHandler() {
        this.showConfirm();
        return false;
    },
    /**
     * [removeHandler 删除内容]
     */
    removeHandler: function removeHandler() {
        if (!this.contenteditable) return false;
        var $parents = $(this).parents('li');
        $.ajax({
            url: this.removeUrl,
            type: 'POST',
            dataType: 'json',
            data: { proId: $parents.attr('pro_id') },
            success: function success(data) {
                if (data.res == 1) {
                    $parents.animate({ opacity: 0 }, function () {
                        $(this).remove();
                    });
                } else {
                    u.showTips(data.msg);
                }
            }
        });
    },
    /**
     * [updataNameHandler 修改名称]
     * @param  {[Object]} $name [要修改的对象]
     */
    updataNameHandler: function updataNameHandler($name) {
        if (!this.contenteditable) return false;
        $name.attr('contenteditable', true);
        $name.focus();
    },
    /**
     * [updatedName 修改名称完成]
     * @param  {[Object]} $name [要修改的对象]
     */
    updatedName: function updatedName($name) {
        if ($name.text() == '') {
            var text = $name.siblings('input[type=hidden]').val();
            u.showTips('名字不能为空！');
            $name.text(text.trim());
            return false;
        } else {
            var text = $name.text().trim();
            $name.text(text);
            $name.siblings('input[type=hidden]').val(text);
            $name.removeAttr('contenteditable');
        }
    },
    /**
     * [init 初始化]
     */
    init: function init() {
        var that = this;
        this.contenteditable = false;
        this.btnEdit.on('click', this.editHandler.bind(this));
        this.btnConfirm.on('click', this.confirmHandler.bind(this));
        this.wrapper.on('click', '.manageList__close', function () {
            that.removeHandler($(this));
        });

        this.wrapper.on('click', '.manageList__desc', function () {
            that.updataNameHandler($(this));
        });

        $('.manageList__desc').on('blur', function () {
            that.updatedName($(this));
        });
    }
}; /**
    * [showDetail 查看详情]
    * @type {Object}
    */
// .manage--edit


Edit.init();

/**
 * [图片预览]
 */
$('img[data-original]').viewer({
    navbar: false,
    toolbar: false
});

/**
 * [showPlayVideo 播放视频]
 * @type {Object}
 */
var showPlayVideo = {
    /**
     * [showPop 显示视频弹窗]
     */
    showPop: function showPop() {
        this.pop.removeClass('none');
    },
    /**
     * [hidePop 关闭视频弹窗]
     */
    hidePop: function hidePop() {
        this.pop.addClass('none');
    },
    /**
     * [closePopHandler 关闭视频]
     */
    closePopHandler: function closePopHandler() {
        this.hidePop();
        var $video = this.pop.find('video');
        $video.attr('src', '');
    },
    /**
     * [showVideoHandler 显示视频]
     * @param  {[Object]} $video [要播放的视频]
     */
    showVideoHandler: function showVideoHandler($video) {
        var $src = $video.attr('src');
        if (!$src) return false;
        this.pop.find('video').attr('src', $src);
        this.showPop();
    },
    /**
     * [init 初始化]
     * @return {[type]} [description]
     */
    init: function init() {
        var that = this;
        this.pop = $('#pubPop');
        this.close = this.pop.find('.pubPop__close');
        $(document).on('click', '.vedioIcon', function () {
            that.showVideoHandler($(this));
        });
        this.close.on('click', this.closePopHandler.bind(this));
    }
};
showPlayVideo.init();

/***/ })
/******/ ]);
});
//# sourceMappingURL=mangerOneStep.js.map