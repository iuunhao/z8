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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * @description:      [description 一个按钮的弹窗和两个按钮的弹窗]
 * @Author:           jxchen
 * @Email:            jinxiaochen@qianyilc.com
 * @DateTime:         2016-01-26 14:05:15
 * @version:          1.0
 *
 * QIANYI.Base
 * QIANYI.Alert
 * QIANYI.Confirm
 * QIANYI.ErrorTips
 * QIANYI.Base是QIANYI.Alert，QIANYI.Confirm，QIANYI.ErrorTips的基类
 * 
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
    var QIANYI = function () {
        var QIANYI = {};
        /** [Base 是alert与confirm的基类] */
        QIANYI.Base = function (wrap, options) {
            options = options || {};
            this.wrap = wrap; // 弹窗id
            this.desc = options.desc; // 弹窗描述
            this.desc2 = options.desc2; // 弹窗描述2
            this.desc3 = options.desc3; // 弹窗描述3
            this.desc4 = options.desc4; // 弹窗描述4
            this.desc5 = options.desc5; // 弹窗描述5
            this.caption = options.caption; // 弹窗标题
            this.animate = options.animate || false; // 显示/隐藏弹窗是否使用动画
            this.closeCallback = options.closeCallback || function () {}; // 关闭按钮回调
            this.clickDocumentHide = options.clickDocumentHide || false; // 是否点击docment 关闭弹窗
            this.mask = options.mask || null; // 遮罩
            this.__display = false;
            this.init();
        };
        QIANYI.Base.prototype = {
            constructor: 'QIANYI.Base',
            hasObject: function hasObject(object) {
                // 是否有某个对象
                return object && object.length != 0;
            },
            hide: function hide() {
                // 隐藏弹窗 
                if (!this.hasObject(this.DOM.wrap)) return false;
                if (this.animate) {
                    this.DOM.wrap.animate({
                        opacity: 0
                    }, function () {
                        $(this).addClass('none').hide().css('opacity', 1);
                    });
                } else {
                    this.DOM.wrap.addClass('none').hide();
                }
                if (this.mask) {
                    this.mask.addClass('none').hide();
                }
                this.__display = false;
                return false;
            },
            show: function show() {
                // 显示弹窗  
                if (!this.hasObject(this.DOM.wrap)) return false;
                if (this.animate) {
                    this.DOM.wrap.removeClass('none').show();
                    this.DOM.wrap.css('opacity', 0).animate({
                        opacity: 1
                    });
                } else {
                    this.DOM.wrap.removeClass('none').show();
                }
                if (this.mask) {
                    this.mask.removeClass('none').show();
                }
                this.__display = true;
                return false;
            },
            setDesc: function setDesc(desc) {
                // 设置弹窗描述
                this.desc = desc || this.desc;
                if (this.hasObject(this.DOM.desc)) {
                    this.DOM.desc.html(this.desc || this.DOM.desc.html() || '');
                }
                return this;
            },
            setDesc2: function setDesc2(desc) {
                // 设置弹窗描述
                this.desc2 = desc || this.desc2;
                if (this.hasObject(this.DOM.desc2)) {
                    this.DOM.desc2.html(this.desc2 || this.DOM.desc2.html() || '');
                }
                return this;
            },
            setDesc3: function setDesc3(desc) {
                // 设置弹窗描述
                this.desc3 = desc || this.desc3;
                if (this.hasObject(this.DOM.desc3)) {
                    this.DOM.desc3.html(this.desc3 || this.DOM.desc3.html() || '');
                }
                return this;
            },
            setDesc4: function setDesc4(desc) {
                // 设置弹窗描述
                this.desc4 = desc || this.desc4;
                if (this.hasObject(this.DOM.desc4)) {
                    this.DOM.desc4.html(this.desc4 || this.DOM.desc4.html() || '');
                }
                return this;
            },
            setDesc5: function setDesc5(desc) {
                // 设置弹窗描述
                this.desc5 = desc || this.desc5;
                if (this.hasObject(this.DOM.desc5)) {
                    this.DOM.desc5.html(this.desc5 || this.DOM.desc5.html() || '');
                }
                return this;
            },
            setCaption: function setCaption(caption) {
                // 设置弹窗标题
                this.caption = caption || this.caption;
                if (this.hasObject(this.DOM.caption)) {
                    this.DOM.caption.html(this.caption || this.DOM.caption.html() || '温馨提示');
                }
                return this;
            },
            saveDOM: function saveDOM() {
                // 保存弹窗元素
                this.DOM = {
                    wrap: this.wrap,
                    desc: this.wrap.find('[desc]') || this.wrap.find('[desc=true]'),
                    desc2: this.wrap.find('[desc2]') || this.wrap.find('[desc2=true]'),
                    desc3: this.wrap.find('[desc3]') || this.wrap.find('[desc3=true]'),
                    desc4: this.wrap.find('[desc4]') || this.wrap.find('[desc4=true]'),
                    desc5: this.wrap.find('[desc5]') || this.wrap.find('[desc5=true]'),
                    caption: this.wrap.find('[caption]') || this.wrap.find('[caption=true]'),
                    close: this.wrap.find('[close]') || this.wrap.find('[close=true]')
                };
                return this;
            },
            addCloseBtn: function addCloseBtn() {
                // 添加关闭按钮
                var that = this;
                if (!this.hasObject(this.DOM.close)) return false;
                this.wrap.on('click', '[close], [close=true]', function () {
                    that.closeCallback.call(that);
                    that.hide();
                });
                return this;
            },
            addDocumentEvent: function addDocumentEvent() {
                // 是否document 关闭
                var that = this;
                if (!this.clickDocumentHide) return false;

                function DocClick() {
                    that.hide();
                }

                function wrapClick() {
                    return false;
                }
                $(document).on('click', DocClick);
                this.wrap.on('click', wrapClick);
            },
            destory: function destory() {
                this.wrap.off('click');
            },
            init: function init() {
                if (this.wrap.length == 0) return false;
                this.destory();
                this.saveDOM();
                this.setDesc();
                this.setDesc2();
                this.setDesc3();
                this.setDesc4();
                this.setDesc5();
                this.setCaption();
                this.addCloseBtn();
                this.addDocumentEvent();
                this.show();
            }

            /** [Extend 继承] */
        };QIANYI.Extend = function (parent, childConstructor, fn) {
            function Child() {
                parent.apply(this, arguments);
                childConstructor.apply(this, arguments);
            }
            for (var i in parent.prototype) {
                Child.prototype[i] = parent.prototype[i];
            }
            for (var i in fn) {
                Child.prototype[i] = fn[i];
            }
            Child.prototype._parent = parent.prototype;
            return Child;
        };

        /** [description alert 弹窗] */
        QIANYI.Alert = QIANYI.Extend(QIANYI.Base, function (wrap, options) {
            options = options || {};
            this.confirm = options.confirm;
            this.cancel = options.cancel;
            this.confirmCallback = options.confirmCallback || function () {};
            this.cancelCallback = options.cancelCallback || function () {};
            this.init();
        }, {
            constructor: 'QIANYI.Alert',
            addConfirmBtn: function addConfirmBtn() {
                var that = this;
                if (this.wrap.length == 0) return false;
                this.DOM.confirm = this.wrap.find('[confirm]') || this.wrap.find('[confirm=true]');
                if (!this.hasObject(this.DOM.confirm)) return false;
                this.DOM.confirm.html(this.confirm || this.DOM.confirm.html() || '确定');
                this.wrap.on('click', '[confirm], [confirm=true]', function () {
                    that.confirmCallback.call(that);
                    that.hide();
                });
            },
            addCancelBtn: function addCancelBtn() {
                var that = this;
                if (this.wrap.length == 0) return false;
                this.DOM.cancel = this.wrap.find('[cancel]') || this.wrap.find('[cancel=true]');
                if (!this.hasObject(this.DOM.cancel)) return false;
                this.DOM.cancel.html(this.cancel || this.DOM.cancel.html() || '取消');
                this.wrap.on('click', '[cancel], [cancel=true]', function () {
                    that.cancelCallback.call(that);
                    that.hide();
                });
            },
            init: function init() {
                this._parent.init.call(this);
                this.addConfirmBtn();
                this.addCancelBtn();
            }
        });

        /** [description 错误提示] */
        QIANYI.ErrorTips = QIANYI.Extend(QIANYI.Base, function (wrap, options) {
            options = options || {};
            this.time = options.time || 2000; // 自动关闭时间
            this.autoHide = options.autoHide || false; // 是否自动关闭
            this.autoHideCallback = options.autoHideCallback || function () {}; // 自动关闭回调
            this.init();
        }, {
            constructor: 'QIANYI.ErrorTips',
            setHideTimeOut: function setHideTimeOut() {
                // 自动关闭
                var that = this;
                if (!this.autoHide) return false;

                function autoHide() {
                    if (that.__display) {
                        // 如果没有手动关闭则执行以下
                        that.autoHideCallback.call(that);
                        that.hide();
                    }
                    t = null;
                }
                var t = setTimeout(autoHide, this.time);
            },
            init: function init() {
                this._parent.init.call(this);
                this.setHideTimeOut();
            }
        });
        return QIANYI;
    }();
    module.exports = QIANYI;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _qySystem = __webpack_require__(1);

var _qySystem2 = _interopRequireDefault(_qySystem);

var _unit = __webpack_require__(0);

var u = _interopRequireWildcard(_unit);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [showDetail 查看详情]
 * @type {Object}
 */
var showDetail = {
    wrap: $('#schemeList'),
    /**
     * [showDetail 展开详情]
     * @param  {[Object]} $open [点击的哪个按钮]
     */
    showDetail: function showDetail($open) {
        var cname = 'schemeList__item--active',
            $parent = $open.parents('li');
        $parent.toggleClass(cname);
    },
    /**
     * [init 初始化]
     */
    init: function init() {
        var that = this;

        /**
         * [阻止一些图片可预览]
         */
        this.wrap.on('click', '.infoSimple__open', function () {
            that.showDetail($(this));
            return false;
        });
    }
};
showDetail.init();

// /**
//  * [图片预览]
//  */
// $('img[data-original]').viewer({
//     navbar: false,
//     toolbar: false
// });

/**
 * [LoadMore 加载更多]
 * @type {Object}
 */
var LoadMore = {
    /**
     * [url 接口地址]
     * @type {[String]}
     */
    url: $('#loadMoreURI').val(),
    button: $('#loadMore'),
    wrapper: $('#schemeList'),
    loadMoreData: function loadMoreData() {
        var that = this;
        if (!this.ready) {
            return false;
        }
        this.ready = false;

        // this.wrapper.append(this.wrapper.find('li').eq(0))

        $.ajax({
            url: this.url,
            type: 'POST',
            dataType: 'json',
            success: function success(data) {
                if (data.res == 1) {
                    that.wrapper.append(data.data);
                } else {
                    u.showTips(res.msg);
                }
                that.ready = true;
            }
        });
    },
    init: function init() {
        this.ready = true;
        this.button.on('click', this.loadMoreData.bind(this));
    }
};

LoadMore.init();

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

/**
 * [editHousrType 编辑户型图]
 * @type {Object}
 */
var editHousrType = {
    setEditHousrType: function setEditHousrType($btn) {},
    init: function init() {
        var that = this;
        this.wrap = $('#schemeList');
        this.alert = $('#editHouseType');
        this.pop = null;

        this.wrap.on('click', '.editDoorModel', function () {
            that.setEditHousrType($(this));
            if (that.pop) {
                that.pop = null;
            }

            that.pop = new _qySystem2.default.Alert(that.alert, {
                confirmCallback: function confirmCallback() {}
            });
        });
    }
};
editHousrType.init();

/**
 * [editPlan 编辑方案]
 * @type {Object}
 */
var editPlan = {
    setEditHousrType: function setEditHousrType($btn) {
        this.params.title = $btn.siblings('span').text();
    },
    init: function init() {
        var that = this;
        this.wrap = $('#schemeList');
        this.alert = $('#editPlan');
        this.pop = null;
        this.params = {};

        this.wrap.on('click', '.addPlan', function () {
            that.setEditHousrType($(this));
            if (that.pop) {
                that.pop = null;
            }

            that.pop = new _qySystem2.default.Alert(that.alert, {
                confirmCallback: function confirmCallback() {}
            });
        });
    }
};
editPlan.init();

/***/ })
/******/ ]);
});
//# sourceMappingURL=mangerTwoStep.js.map