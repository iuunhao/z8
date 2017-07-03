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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
                    var res = that.confirmCallback.call(that, function () {
                        that.hide();
                    });

                    if (res === false) {
                        return false;
                    }
                });
            },
            addCancelBtn: function addCancelBtn() {
                var that = this;
                if (this.wrap.length == 0) return false;
                this.DOM.cancel = this.wrap.find('[cancel]') || this.wrap.find('[cancel=true]');
                if (!this.hasObject(this.DOM.cancel)) return false;
                this.DOM.cancel.html(this.cancel || this.DOM.cancel.html() || '取消');
                this.wrap.on('click', '[cancel], [cancel=true]', function () {
                    var res = that.cancelCallback.call(that, function () {
                        that.hide();
                    });

                    if (res === false) {
                        return false;
                    }
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(e,t,n){var r;(function(e){typeof n!="undefined"&&n.exports?n.exports=e: true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):r=e})(function(){function u(e,t){return RegExp.prototype.test.call(e,t)}function a(e){return!u(r,e)}function l(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function h(e){return String(e).replace(/[&<>"'\/]/g,function(e){return c[e]})}function p(e){this.string=e,this.tail=e,this.pos=0}function d(e,t){this.view=e,this.parent=t,this.clearCache()}function v(){this.clearCache()}function m(e){var t=e[3],n=t,r;while((r=e[4])&&r.length)e=r[r.length-1],n=e[3];return[t,n]}function g(e){function n(e,n,r){if(!t[e]){var i=g(n);t[e]=function(e,t){return i(e,t,r)}}return t[e]}function r(t,r,i){var s="",o,u;for(var a=0,f=e.length;a<f;++a){o=e[a];switch(o[0]){case"#":u=i.slice.apply(i,m(o)),s+=t._section(o[1],r,u,n(a,o[4],i));break;case"^":s+=t._inverted(o[1],r,n(a,o[4],i));break;case">":s+=t._partial(o[1],r);break;case"&":s+=t._name(o[1],r);break;case"name":s+=t._escaped(o[1],r);break;case"text":s+=o[1]}}return s}var t={};return r}function y(e){var t=[],n=t,r=[],i,s;for(var o=0;o<e.length;++o){i=e[o];switch(i[0]){case"#":case"^":i[4]=[],r.push(i),n.push(i),n=i[4];break;case"/":if(r.length===0)throw new Error("Unopened section: "+i[1]);s=r.pop();if(s[1]!==i[1])throw new Error("Unclosed section: "+s[1]);r.length>0?n=r[r.length-1][4]:n=t;break;default:n.push(i)}}s=r.pop();if(s)throw new Error("Unclosed section: "+s[1]);return t}function b(e){var t,n;for(var r=0;r<e.length;++r)t=e[r],n&&n[0]==="text"&&t[0]==="text"?(n[1]+=t[1],n[3]=t[3],e.splice(r--,1)):n=t}function w(e){if(e.length!==2)throw new Error("Invalid tags: "+e.join(" "));return[new RegExp(l(e[0])+"\\s*"),new RegExp("\\s*"+l(e[1]))]}var e={};e.name="mustache.js",e.version="0.7.0",e.tags=["{{","}}"],e.Scanner=p,e.Context=d,e.Writer=v;var t=/\s*/,n=/\s+/,r=/\S/,i=/\s*=/,s=/\s*\}/,o=/#|\^|\/|>|\{|&|=|!/,f=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};e.escape=h,p.prototype.eos=function(){return this.tail===""},p.prototype.scan=function(e){var t=this.tail.match(e);return t&&t.index===0?(this.tail=this.tail.substring(t[0].length),this.pos+=t[0].length,t[0]):""},p.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.pos+=this.tail.length,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n),this.pos+=n}return t},d.make=function(e){return e instanceof d?e:new d(e)},d.prototype.clearCache=function(){this._cache={}},d.prototype.push=function(e){return new d(e,this)},d.prototype.lookup=function(e){var t=this._cache[e];if(!t){if(e===".")t=this.view;else{var n=this;while(n){if(e.indexOf(".")>0){var r=e.split("."),i=0;t=n.view;while(t&&i<r.length)t=t[r[i++]]}else t=n.view[e];if(t!=null)break;n=n.parent}}this._cache[e]=t}return typeof t=="function"&&(t=t.call(this.view)),t},v.prototype.clearCache=function(){this._cache={},this._partialCache={}},v.prototype.compile=function(e,t){return this._compile(this._cache,e,e,t)},v.prototype.compilePartial=function(e,t,n){return this._compile(this._partialCache,e,t,n)},v.prototype.render=function(e,t,n){return this.compile(e)(t,n)},v.prototype._compile=function(t,n,r,i){if(!t[n]){var s=e.parse(r,i),o=g(s),u=this;t[n]=function(e,t){if(t)if(typeof t=="function")u._loadPartial=t;else for(var n in t)u.compilePartial(n,t[n]);return o(u,d.make(e),r)}}return t[n]},v.prototype._section=function(e,t,n,r){var i=t.lookup(e);switch(typeof i){case"object":if(f(i)){var s="";for(var o=0,u=i.length;o<u;++o)s+=r(this,t.push(i[o]));return s}return i?r(this,t.push(i)):"";case"function":var a=this,l=function(e){return a.render(e,t)};return i.call(t.view,n,l)||"";default:if(i)return r(this,t)}return""},v.prototype._inverted=function(e,t,n){var r=t.lookup(e);return!r||f(r)&&r.length===0?n(this,t):""},v.prototype._partial=function(e,t){!(e in this._partialCache)&&this._loadPartial&&this.compilePartial(e,this._loadPartial(e));var n=this._partialCache[e];return n?n(t):""},v.prototype._name=function(e,t){var n=t.lookup(e);return typeof n=="function"&&(n=n.call(t.view)),n==null?"":String(n)},v.prototype._escaped=function(t,n){return e.escape(this._name(t,n))},e.parse=function(r,u){function g(){if(v&&!m)while(d.length)h.splice(d.pop(),1);else d=[];v=!1,m=!1}u=u||e.tags;var f=w(u),c=new p(r),h=[],d=[],v=!1,m=!1,E,S,x,T;while(!c.eos()){E=c.pos,x=c.scanUntil(f[0]);if(x)for(var N=0,C=x.length;N<C;++N)T=x.charAt(N),a(T)?d.push(h.length):m=!0,h.push(["text",T,E,E+1]),E+=1,T==="\n"&&g();E=c.pos;if(!c.scan(f[0]))break;v=!0,S=c.scan(o)||"name",c.scan(t);if(S==="=")x=c.scanUntil(i),c.scan(i),c.scanUntil(f[1]);else if(S==="{"){var k=new RegExp("\\s*"+l("}"+u[1]));x=c.scanUntil(k),c.scan(s),c.scanUntil(f[1]),S="&"}else x=c.scanUntil(f[1]);if(!c.scan(f[1]))throw new Error("Unclosed tag at "+c.pos);h.push([S,x,E,c.pos]);if(S==="name"||S==="{"||S==="&")m=!0;S==="="&&(u=x.split(n),f=w(u))}return b(h),y(h)};var E=new v;return e.clearCache=function(){return E.clearCache()},e.compile=function(e,t){return E.compile(e,t)},e.compilePartial=function(e,t,n){return E.compilePartial(e,t,n)},e.render=function(e,t,n){return E.render(e,t,n)},e.to_html=function(t,n,r,i){var s=e.render(t,n,r);if(typeof i!="function")return s;i(s)},e}())}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _qySystem = __webpack_require__(1);

var _qySystem2 = _interopRequireDefault(_qySystem);

__webpack_require__(4);

var _unit = __webpack_require__(0);

var u = _interopRequireWildcard(_unit);

var _mustache = __webpack_require__(2);

var _mustache2 = _interopRequireDefault(_mustache);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addNewPlan = {
    checkNewName: function checkNewName() {
        var $val = this.newName.val();
        if ($val.trim() == '') {
            u.showTips('请输入户型名称');
            return false;
        }
        return true;
    },
    checkNewRoom: function checkNewRoom() {
        var $val = this.newRoom.val().trim();
        if ($val == '') {
            u.showTips('请输入房间为几室');
            return false;
        } else {
            if (!/^\d+$/.test($val)) {
                u.showTips('几室请入数字');
                return false;
            }
        }
        return true;
    },
    checkNewHall: function checkNewHall() {
        var $val = this.newHall.val().trim();
        if ($val == '') {
            u.showTips('请输入房间为几厅');
            return false;
        } else {
            if (!/^\d+$/.test($val)) {
                u.showTips('客厅请入数字');
                return false;
            }
        }
        return true;
    },
    checkNewToilet: function checkNewToilet() {
        var $val = this.newToilet.val().trim();
        if ($val == '') {
            u.showTips('请输入房间为几卫');
            return false;
        } else {
            if (!/^\d+$/.test($val)) {
                u.showTips('卫生间请入数字');
                return false;
            }
        }
        return true;
    },
    checkNewKitchen: function checkNewKitchen() {
        var $val = this.newKitchen.val().trim();
        if ($val == '') {
            u.showTips('请输入房间为几厨');
            return false;
        } else {
            if (!/^\d+$/.test($val)) {
                u.showTips('厨房请入数字');
                return false;
            }
        }
        return true;
    },
    checkNewRoomSize: function checkNewRoomSize() {
        var $val = this.newRoomSize.val().trim();
        if ($val == '') {
            u.showTips('请输入房间平方数');
            return false;
        } else {
            if (!/^\d+$/.test($val)) {
                u.showTips('平方数请入数字');
                return false;
            }
        }
        return true;
    },
    setPopHeight: function setPopHeight() {
        var $height = $(window).height(),
            $heightAlert = this.alertId.find('.pubPopContent').height();
        if ($height < $heightAlert) {
            this.body.addClass('hidden');
            this.alertId.find('.pubPopMain').addClass('pubPopMain--ov');
        }
    },
    resetBodyClass: function resetBodyClass() {
        this.body.removeClass('hidden');
    },
    addNewPlanHandler: function addNewPlanHandler($button) {
        if (this.pop) {
            this.pop = null;
        }

        var data = {
            info: {
                title: '添加用户信息',
                name: '',
                room: 3,
                hall: 3,
                toilet: 3,
                showType: true,
                kitchen: 3,
                size: 150
            }
        };

        this.addNewPlanPopInner.html(_mustache2.default.to_html(this.editHouseTemp, data));

        this.pop = new _qySystem2.default.Alert(this.alertId, {
            closeCallback: function () {
                this.resetBodyClass();
            }.bind(this),
            confirmCallback: function (next) {
                next();
            }.bind(this)
        });
        this.setPopHeight();

        this.linkage();
    },
    linkage: function linkage() {
        this.provincial = this.alertId.find('.provincial');
        this.city = this.alertId.find('.city');
        this.county = this.alertId.find('.county');
        this.village = this.alertId.find('.village');

        this.provincial.zelect().on('change', function () {
            console.log($(this).val());
        });

        this.city.zelect().on('change', function () {
            console.log($(this).val());
        });

        this.county.zelect().on('change', function () {
            console.log($(this).val());
        });

        this.village.zelect().on('change', function () {
            console.log($(this).val());
        });
    },
    init: function init() {
        var that = this;
        /**
         * [houseTypeTmp 户型图模板]
         * @type {[type]}
         */
        this.addNewPlanPopInner = $('#addNewPlanPopInner');
        /**
         * [editHouseTemp 户型模板]
         * @type {[type]}
         */
        this.editHouseTemp = $('#editHouseTemp').html();

        /**
         * [addPlan 添加新设计方案]
         * @type {[Object]}
         */
        this.addPlan = $('#addNewPlan');
        /**
         * [alertId 弹窗id]
         * @type {[Object]}
         */
        this.alertId = $('#addNewPlanPop');
        /**
         * [body body]
         * @type {[Object]}
         */
        this.body = $('body');
        /**
         * [pop 弹窗]
         * @type {[Object]}
         */
        this.pop = null;

        /**
         * [cname 请输入户型名称]
         * @type {[Object]}
         */
        this.newName = $('.newName');
        this.newRoomSize = $('.newRoomSize');
        this.newRoom = $('.newRoom');
        this.newHall = $('.newHall');
        this.newToilet = $('.newToilet');
        this.newKitchen = $('.newKitchen');

        this.addPlan.on('click', function () {
            var $this = $(this);
            that.addNewPlanHandler($this);
        });
    }
};
addNewPlan.init();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  zelect-0.0.9

  opts:
    throttle:       ms: delay to throttle filtering of results when search term updated, 0 means synchronous
    loader:         function(term, page, callback): load more items
                      callback expects an array of items
    renderItem:     function(item, term): render the content of a single item
    initial:        "item": arbitrary item to set the initial selection to
                      placeholder is not required if initial item is provided
    placeholder:    String/DOM/jQuery: placeholder text/html before anything is selected
                      zelect automatically selects first item if not provided
    noResults:      function(term?): function to create no results text
    regexpMatcher:  function(term): override regexp creation when filtering options
*/
(function ($) {
  var keys = { tab: 9, enter: 13, esc: 27, left: 37, up: 38, right: 39, down: 40 };
  var defaults = {
    throttle: 300,
    renderItem: defaultRenderItem,
    noResults: defaultNoResults,
    regexpMatcher: defaultRegexpMatcher
  };

  $.fn.zelect = function (opts) {
    opts = $.extend({}, defaults, opts);

    return this.each(function () {
      if ($(this).parent().length === 0) throw new Error('<select> element must have a parent');
      var $select = $(this).hide().data('zelectItem', selectItem).data('refreshItem', refreshItem).data('reset', reset);

      var $zelect = $('<div>').addClass('zelect');
      var $selected = $('<div>').addClass('zelected');
      var $dropdown = $('<div>').addClass('dropdown').hide();
      var $noResults = $('<div>').addClass('no-results');
      var $search = $('<input>').addClass('zearch');
      var $list = $('<ol>');
      var listNavigator = navigable($list);

      var itemHandler = opts.loader ? infiniteScroll($list, opts.loader, appendItem) : selectBased($select, $list, opts.regexpMatcher, appendItem);

      var filter = throttled(opts.throttle, function () {
        var term = searchTerm();
        itemHandler.load(term, function () {
          checkResults(term);
        });
      });

      $search.keyup(function (e) {
        switch (e.which) {
          case keys.esc:
            hide();return;
          case keys.up:
            return;
          case keys.down:
            return;
          case keys.enter:
            var curr = listNavigator.current().data('zelect-item');
            if (curr) selectItem(curr);
            return;
          default:
            filter();
        }
      });
      $search.keydown(function (e) {
        switch (e.which) {
          case keys.tab:
            e.preventDefault();hide();return;
          case keys.up:
            e.preventDefault();listNavigator.prev();return;
          case keys.down:
            e.preventDefault();listNavigator.next();return;
        }
      });

      $list.on('click', 'li', function () {
        selectItem($(this).data('zelect-item'));
      });
      $zelect.mouseenter(function () {
        $zelect.addClass('hover');
      });
      $zelect.mouseleave(function () {
        $zelect.removeClass('hover');
      });
      $zelect.attr("tabindex", $select.attr("tabindex"));
      $zelect.blur(function () {
        if (!$zelect.hasClass('hover')) hide();
      });
      $search.blur(function () {
        if (!$zelect.hasClass('hover')) hide();
      });

      $selected.click(toggle);

      $zelect.insertAfter($select).append($selected).append($dropdown.append($('<div>').addClass('zearch-container').append($search).append($noResults)).append($list));

      itemHandler.load($search.val(), function () {
        initialSelection(true);
        $select.trigger('ready');
      });

      function selectItem(item, triggerChange) {
        renderContent($selected, opts.renderItem(item)).removeClass('placeholder');
        hide();
        if (item && item.value !== undefined) $select.val(item.value);
        $select.data('zelected', item);
        if (triggerChange == null || triggerChange === true) $select.trigger('change', item);
      }

      function refreshItem(item, identityCheckFn) {
        var eq = function eq(a, b) {
          return identityCheckFn(a) === identityCheckFn(b);
        };
        if (eq($select.data('zelected'), item)) {
          renderContent($selected, opts.renderItem(item));
          $select.data('zelected', item);
        }
        var term = searchTerm();
        $list.find('li').each(function () {
          if (eq($(this).data('zelect-item'), item)) {
            renderContent($(this), opts.renderItem(item, term)).data('zelect-item', item);
          }
        });
      }

      function reset() {
        $search.val('');
        itemHandler.load('', function () {
          initialSelection(false);
        });
      }

      function toggle() {
        $dropdown.toggle();
        $zelect.toggleClass('open');
        if ($dropdown.is(':visible')) {
          $search.focus().select();
          itemHandler.check();
          listNavigator.ensure();
        }
      }

      function hide() {
        $dropdown.hide();
        $zelect.removeClass('open');
      }

      function renderContent($obj, content) {
        $obj[htmlOrText(content)](content);
        return $obj;
        function htmlOrText(x) {
          return x instanceof jQuery || x.nodeType != null ? 'html' : 'text';
        }
      }

      function appendItem(item, term) {
        $list.append(renderContent($('<li>').data('zelect-item', item), opts.renderItem(item, term)));
      }

      function checkResults(term) {
        if ($list.children().size() === 0) {
          $noResults.html(opts.noResults(term)).show();
        } else {
          $noResults.hide();
          listNavigator.ensure();
        }
      }
      function searchTerm() {
        return $.trim($search.val());
      }

      function initialSelection(useOptsInitial) {
        var $s = $select.find('option[selected="selected"]');
        if (useOptsInitial && opts.initial) {
          selectItem(opts.initial);
        } else if (!opts.loader && $s.size() > 0) {
          selectItem($list.children().eq($s.index()).data('zelect-item'));
        } else if (opts.placeholder) {
          $selected.html(opts.placeholder).addClass('placeholder');
        } else {
          var first = $list.find(':first').data('zelect-item');
          first !== undefined ? selectItem(first) : $selected.html(opts.noResults()).addClass('placeholder');
        }
        checkResults();
      }
    });
  };

  function selectBased($select, $list, regexpMatcher, appendItemFn) {
    var dummyRegexp = { test: function test() {
        return true;
      } };
    var options = $select.find('option').map(function () {
      return itemFromOption($(this));
    }).get();

    function filter(term) {
      var regexp = term === '' ? dummyRegexp : regexpMatcher(term);
      $list.empty();
      $.each(options, function (ii, item) {
        if (regexp.test(item.label)) appendItemFn(item, term);
      });
    }
    function itemFromOption($option) {
      return { value: $option.attr('value'), label: $option.text() };
    }
    function newTerm(term, callback) {
      filter(term);
      if (callback) callback();
    }
    return { load: newTerm, check: function check() {} };
  }

  function infiniteScroll($list, loadFn, appendItemFn) {
    var state = { id: 0, term: '', page: 0, loading: false, exhausted: false, callback: undefined };

    $list.scroll(maybeLoadMore);

    function load() {
      if (state.loading || state.exhausted) return;
      state.loading = true;
      $list.addClass('loading');
      var stateId = state.id;
      loadFn(state.term, state.page, function (items) {
        if (stateId !== state.id) return;
        if (state.page == 0) $list.empty();
        state.page++;
        if (!items || items.length === 0) state.exhausted = true;
        $.each(items, function (ii, item) {
          appendItemFn(item, state.term);
        });
        state.loading = false;
        if (!maybeLoadMore()) {
          if (state.callback) state.callback();
          state.callback = undefined;
          $list.removeClass('loading');
        }
      });
    }

    function maybeLoadMore() {
      if (state.exhausted) return false;
      var $lastChild = $list.children(':last');
      if ($lastChild.size() === 0) {
        load();
        return true;
      } else {
        var lastChildTop = $lastChild.offset().top - $list.offset().top;
        var lastChildVisible = lastChildTop < $list.outerHeight();
        if (lastChildVisible) load();
        return lastChildVisible;
      }
    }

    function newTerm(term, callback) {
      state = { id: state.id + 1, term: term, page: 0, loading: false, exhausted: false, callback: callback };
      load();
    }
    return { load: newTerm, check: maybeLoadMore };
  }

  $.fn.zelectItem = callInstance('zelectItem');
  $.fn.refreshZelectItem = callInstance('refreshItem');
  $.fn.resetZelect = callInstance('reset');

  function callInstance(fnName) {
    return function () {
      var args = [].slice.call(arguments);
      return this.each(function () {
        var fn = $(this).data(fnName);
        fn && fn.apply(undefined, args);
      });
    };
  }

  function throttled(ms, callback) {
    if (ms <= 0) return callback;
    var timeout = undefined;
    return function () {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(callback, ms);
    };
  }

  function defaultRenderItem(item, term) {
    if (item == undefined || item == null) {
      return '';
    } else if ($.type(item) === 'string') {
      return item;
    } else if (item.label) {
      return item.label;
    } else if (item.toString) {
      return item.toString();
    } else {
      return item;
    }
  }

  function defaultNoResults(term) {
    return "No results for '" + (term || '') + "'";
  }

  function defaultRegexpMatcher(term) {
    return new RegExp('(^|\\s)' + term, 'i');
  }

  function navigable($list) {
    var skipMouseEvent = false;
    $list.on('mouseenter', 'li', onMouseEnter);

    function next() {
      var $next = current().next('li');
      if (set($next)) ensureBottomVisible($next);
    }
    function prev() {
      var $prev = current().prev('li');
      if (set($prev)) ensureTopVisible($prev);
    }
    function current() {
      return $list.find('.current');
    }
    function ensure() {
      if (current().size() === 0) {
        $list.find('li:first').addClass('current');
      }
    }
    function set($item) {
      if ($item.size() === 0) return false;
      current().removeClass('current');
      $item.addClass('current');
      return true;
    }
    function onMouseEnter() {
      if (skipMouseEvent) {
        skipMouseEvent = false;
        return;
      }
      set($(this));
    }
    function itemTop($item) {
      return $item.offset().top - $list.offset().top;
    }
    function ensureTopVisible($item) {
      var scrollTop = $list.scrollTop();
      var offset = itemTop($item) + scrollTop;
      if (scrollTop > offset) {
        moveScroll(offset);
      }
    }
    function ensureBottomVisible($item) {
      var scrollBottom = $list.height();
      var itemBottom = itemTop($item) + $item.outerHeight();
      if (scrollBottom < itemBottom) {
        moveScroll($list.scrollTop() + itemBottom - scrollBottom);
      }
    }
    function moveScroll(offset) {
      $list.scrollTop(offset);
      skipMouseEvent = true;
    }
    return { next: next, prev: prev, current: current, ensure: ensure };
  }
})(jQuery);

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _qySystem = __webpack_require__(1);

var _qySystem2 = _interopRequireDefault(_qySystem);

var _unit = __webpack_require__(0);

var u = _interopRequireWildcard(_unit);

var _mustache = __webpack_require__(2);

var _mustache2 = _interopRequireDefault(_mustache);

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
        this.cEditHouseType = $('#cEditHouseType');
        /**
         * [houseTypeTmp 户型图模板]
         * @type {[type]}
         */
        this.houseTypeTmp = $('#houseTypeTmp').html();
        /**
         * [editHouseTemp 户型模板]
         * @type {[type]}
         */
        this.editHouseTemp = $('#editHouseTemp').html();
        this.pop = null;

        this.wrap.on('click', '.editDoorModel', function () {
            var $this = $(this);
            that.setEditHousrType($this);
            if (that.pop) {
                that.pop = null;
            }
            var data = {
                info: {
                    title: '编辑户型信息',
                    name: '新湖家园3号楼201',
                    room: 3,
                    hall: 3,
                    toilet: 3,
                    kitchen: 3,
                    size: 150
                }
            };
            var $parent = $this.parents('.infoSimple__txtBox');
            that.cEditHouseType.html(_mustache2.default.to_html(that.editHouseTemp, data));
            that.pop = new _qySystem2.default.Alert(that.alert, {
                confirmCallback: function confirmCallback(next) {
                    next();
                    $parent.html(_mustache2.default.to_html(that.houseTypeTmp, data));
                    return false;
                }
            });
        });
    }
};
editHousrType.init();

/**
 * [editPlan 编辑方案]
 * @type {Object}
 */
// const editPlan = {
//     setEditHousrType($btn) {
//         this.params.title = $btn.siblings('span').text();
//     },
//     init() {
//         var that = this;
//         this.wrap = $('#schemeList');
//         this.alert = $('#editPlan');
//         this.pop = null;
//         this.params = {};

//         this.wrap.on('click', '.addPlan', function() {
//             that.setEditHousrType($(this));
//             if (that.pop) {
//                 that.pop = null;
//             }

//             that.pop = new SYS.Alert(that.alert, {
//                 confirmCallback() {

//                 }
//             })
//         })
//     }
// };
// editPlan.init();

/***/ })
/******/ ]);
});
//# sourceMappingURL=mangerTwoStep.js.map