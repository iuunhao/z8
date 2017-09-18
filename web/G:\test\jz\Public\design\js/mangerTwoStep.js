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
var showTips = exports.showTips = function showTips(str) {
    alert(str);
};

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

"use strict";


var _qySystem = __webpack_require__(1);

var _qySystem2 = _interopRequireDefault(_qySystem);

var _unit = __webpack_require__(0);

var u = _interopRequireWildcard(_unit);

var _mustache = __webpack_require__(3);

var _mustache2 = _interopRequireDefault(_mustache);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addNewPlan = {
    /**
     * [setPopPosition 根据弹窗大小判断弹窗是顶部或者垂直居中]
     */
    setPopPosition: function setPopPosition() {
        var $height = $(window).height(),
            $heightAlert = this.alertId.find('.pubPopContent').outerHeight();
        if ($height < $heightAlert) {
            this.body.addClass('hidden');
            this.alertId.find('.pubPopMain').addClass('pubPopMain--ov');
        }
    },

    /**
     * [showBodyScrollBar 显示body的滚动条]
     */
    showBodyScrollBar: function showBodyScrollBar() {
        this.body.removeClass('hidden');
    },

    /**
     * [addNewPlanFunc 添加计划方案]
     * @param {[type]} e [description]
     */
    addNewPlanFunc: function addNewPlanFunc(e) {
        var _this = this;

        var $button = $(e.target);
        /**
         * 防止多次点击
         */
        if (!this.addReady) return false;
        this.addReady = false;

        /**
         * [house_id description]
         * @type {[type]}
         */
        this.house_id = $button.attr('house_id') || '';

        /**
         * [status 保存当前状态编辑or添加]
         * @type {[String]}
         */
        this.status = this.house_id ? 'EDIT' : 'ADD';

        $.post('/UserHouse/gethouseinfo', {
            house_id: this.house_id
        }, function (response) {
            if (response.res == 1) {
                var info = response.info;

                _this.draw_img_url = info.draw_img_url;
                _this.uid = info.uid;
                _this.callback_url = info.callback_url;
                /**
                 * [if 返回有id为编辑户型无id为添加户型]
                 * @param  {[String]} info.id [唯一id]
                 */
                if (info.id == undefined) {
                    info._title = '添加户型';
                    info._showHouseType = true;
                } else {
                    info._title = '编辑户型';
                    info._showHouseType = false;
                    info._checked1 = function () {
                        return this.id == info.first_city_id;
                    };
                    info._checked2 = function () {
                        return this.id == info.second_city_id;
                    };
                    info._checked3 = function () {
                        return this.id == info.city_id;
                    };
                    info._checked4 = function () {
                        return this.id == info.city_estate_id;
                    };
                }

                _this.showAddHouseType(response);
            }
            _this.addReady = true;
        }, 'json');
        return false;
    },

    /**
     * [showAddHouseType description]
     * @param  {[type]} response [description]
     * @param  {[type]} house_id [description]
     */
    showAddHouseType: function showAddHouseType(response) {
        if (this.pop) this.pop = null;
        var render = _mustache2.default.to_html(this.editHouseTemp, response);
        this.alertId.html(render);
        this.alertId.find('input[name=id]').val(response.info.id || '');
        this.pop = new _qySystem2.default.Alert(this.alertId, {
            closeCallback: function () {
                this.showBodyScrollBar();
            }.bind(this),
            confirmCallback: function (next) {
                if (!this.checkForms()) {
                    return false;
                }
                var datas = this.alertId.find('form').serializeArray();
                $.post('/UserHouse/doHouseEditor', datas, function (response) {
                    u.showTips(response.msg);
                    if (response.res == 1) {
                        next();
                        window.location.reload();
                    }
                });
            }.bind(this)
        });
        this.setPopPosition();
    },

    /**
     * [selects 处理select四级联动]
     */
    selects: function selects() {
        var that = this,

        /**
         * [findChild 查找下拉关联的子下拉]
         * @param  {[Object]} $select [下拉]
         * @return {[Object]}         [子元素]
         */
        findChild = function findChild($select) {
            var childClass = $select.attr('childClass'),
                $child = that.alertId.find('.' + childClass);
            return $child;
        },

        /**
         * [getSelect 获取下拉类型]
         * @param  {[Object]} $select [下拉]
         * @return {[String]}         [下拉类型]
         */
        getSelect = function getSelect($select) {
            if ($select.hasClass('provincial')) {
                return 'PROV';
            }
            if ($select.hasClass('city')) {
                return 'CITY';
            }
            if ($select.hasClass('county')) {
                return 'COUNTY';
            }
            if ($select.hasClass('village')) {
                return 'VILLAGE';
            }
            return '';
        },

        /**
         * [resetOptions 重置select]
         * @param  {[Object]} $select [需要重置的下拉]
         */
        resetOptions = function resetOptions($select) {
            $select.find('option:gt(0)').remove();
        },

        /**
         * [renderHouseType 渲染户型图]
         * @param  {[Object]} response [接收到的数据]
         */
        renderHouseType = function renderHouseType(response) {
            var $ul = that.alertId.find('.chooseFamily'),
                render = _mustache2.default.to_html(that.editHouseInnerTemp, response);
            $ul.html(render);
            that.setPopPosition();
        },

        /**
         * [clearSelectHouse 清空选择户型]
         */
        clearSelectHouse = function clearSelectHouse() {
            if (that.status != 'ADD') return false;
            that.alertId.find('.chooseFamily').html('');
            that.alertId.find('.selHouseType').val('');
            that.setHouseParams();
        };

        /**
         * [选择地区]
         * @param  {[Object]} e           [Event]
         */
        this.alertId.on('change', '.selectCity select', function (e) {
            var $select = $(e.target),
                $val = $select.val(),
                $child = findChild($select),
                url = '',
                params = {},
                SELECT = getSelect($select);

            resetOptions($child);
            $child.trigger('change');

            if ($val == '') {
                return false;
            }

            if ($child.length == 0) return false;

            switch (SELECT) {
                case 'COUNTY':
                    url = '/UserHouse/getestate';
                    params = { city_id: $val };
                    break;
                case 'PROV':
                case 'CITY':
                    url = '/UserHouse/getchildcity';
                    params = { parent_id: $val };
                    break;
            }

            $.post(url, params, function (response) {
                resetOptions($child);
                if (response.res == 1) {
                    var arr = [];
                    response.info.forEach(function (item) {
                        arr.push('<option value="' + item.id + '">' + item.name + '</option>');
                    });
                    $child.append(arr.join(''));
                }
                clearSelectHouse();
                that.showHandEnter();
                // if (SELECT == 'COUNTY') {
                //     response.res == 1 ? that.hideHandEnter() : that.showHandEnter();
                // }
            });
            return false;
        });

        this.alertId.on('change', '.village', function () {
            if (that.status == 'EDIT') return false;
            var $val = $(this).val();
            clearSelectHouse();
            if ($val == '') {
                return false;
            }

            $.post('/UserHouse/gethousebyestate', {
                estate_id: $val
            }, function (response) {
                if (response.res == 1) {
                    renderHouseType(response);
                } else {
                    renderHouseType({ info: [] });
                    u.showTips(response.msg);
                }
            });
        });
    },
    showHandEnter: function showHandEnter() {
        var $tips = this.alertId.find('.eidt__tips--link');
        $tips.removeClass('none');
    },
    hideHandEnter: function hideHandEnter() {
        var $tips = this.alertId.find('.eidt__tips--link');
        $tips.addClass('none');
        $tips.parents('li').next().addClass('none');
    },

    /**
     * [checkForms 校验表单]
     * @return {[Boolean]} [是否校验通过]
     */
    checkForms: function checkForms() {
        var $a = this.alertId,
            houseName = $a.find('.houseName').val(),
            houseType = $a.find('.houseType').val(),
            provincial = $a.find('.provincial').val(),
            city = $a.find('.city').val(),
            county = $a.find('.county').val(),
            village = $a.find('.village').val(),
            newHall = $a.find('.newHall').val(),
            newRoom = $a.find('.newRoom').val(),
            newToilet = $a.find('.newToilet').val(),
            newKitchen = $a.find('.newKitchen').val(),
            newRoomSize = $a.find('.newRoomSize').val();

        if (houseName.trim() == '') {
            u.showTips('请输入户型名称！');
            return false;
        }

        if (provincial == '' || city == '' || county == '') {
            u.showTips('请选择所在城市！');
            return false;
        }

        if (village == '' && houseType == '') {
            u.showTips('请选择所在小区！');
            return false;
        }

        if (newRoom == '' || isNaN(newRoom) || newHall == '' || isNaN(newHall) || newKitchen == '' || isNaN(newKitchen) || newKitchen == '' || isNaN(newKitchen)) {
            u.showTips('请填写格局！');
            return false;
        }

        if (newRoomSize == '' || isNaN(newRoomSize)) {
            u.showTips('请填写平方数！');
            return false;
        }

        return true;
    },
    checkParams: function checkParams() {
        var $a = this.alertId,
            houseName = $a.find('.houseName').val(),
            houseType = $a.find('.houseType').val(),
            provincial = $a.find('.provincial').val(),
            city = $a.find('.city').val(),
            county = $a.find('.county').val(),
            village = $a.find('.village').val(),
            newHall = $a.find('.newHall').val(),
            newRoom = $a.find('.newRoom').val(),
            newToilet = $a.find('.newToilet').val(),
            newKitchen = $a.find('.newKitchen').val(),
            newRoomSize = $a.find('.newRoomSize').val();

        if (houseName.trim() == '') {
            u.showTips('请输入户型名称！');
            return false;
        }

        if (provincial == '' || city == '' || county == '') {
            u.showTips('请选择所在城市！');
            return false;
        }

        if (village == '' && houseType == '') {
            u.showTips('请选择所在小区！');
            return false;
        }

        // window.location.href = ''
        window.location.href = this.draw_img_url + '?uid=' + this.uid + '&callback_url=' + this.callback_url + '&' + this.alertId.find('form').serialize();

        return true;
    },

    /**
     * [setHouseParams 设置选择户型参数]
     * @param {[Object]} $link [jquery对象]
     */
    setHouseParams: function setHouseParams($link) {
        if (this.status != 'ADD') return false;
        var Q = $link && $link instanceof $,
            room = Q ? $link.attr('room') : '',
            hall = Q ? $link.attr('hall') : '',
            toilet = Q ? $link.attr('toilet') : '',
            kitchen = Q ? $link.attr('kitchen') : '',
            sumarea = Q ? $link.attr('sumarea') : '';
        this.alertId.find('.newRoom').val(room);
        this.alertId.find('.newHall').val(hall);
        this.alertId.find('.newToilet').val(toilet);
        this.alertId.find('.newKitchen').val(kitchen);
        this.alertId.find('.newRoomSize').val(sumarea);
    },
    init: function init() {
        var _this2 = this;

        var that = this;

        /**
         * [uid description]
         */
        this.uid = '';
        /**
         * [callback_url description]
         */
        this.callback_url = '';
        /**
         * [draw_img_url 画户型图接口]
         */
        this.draw_img_url = '';

        /**
         * [获取mustache模板]
         * @param  {[String]} template [html模板]
         */
        $.get('/Public/design/js/templates/houselist.mst', function (template) {
            _this2.editHouseTemp = template;
        });

        /**
         * [获取mustache模板]
         * @param  {[String]} template [html模板]
         */
        $.get('/Public/design/js/templates/houselistinner.mst', function (template) {
            _this2.editHouseInnerTemp = template;
        });
        /**
         * [addPlanButton 添加新设计方案]
         * @type {[Object]}
         */
        this.addPlanButton = $('#addNewPlan');

        /**
         * [alertId 弹窗id]
         * @type {[Object]}
         */
        this.alertId = $('<div class="pubPopLayout none" id="addNewPlanPop"></div>');
        $('body').append(this.alertId);

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
         * [house_id 户型id]
         * @type {String}
         */
        this.house_id = '';

        /**
         * [status 当前状态编辑(EDIT)or添加(ADD)]
         * @type {String}
         */
        this.status = '';

        this.addReady = true;

        this.addPlanButton.on('click', this.addNewPlanFunc.bind(this));

        /**
         * [显示隐藏手工输入]
         */
        $(document).on('click', '#addNewPlanPop .eidt__tips--link', function () {
            $(this).parents('li').next().toggleClass('none');
        });

        /**
         * [选择户型图]
         */
        $(document).on('click', '#addNewPlanPop .chooseFamily__link', function () {
            var $this = $(this),
                type_id = $this.attr('type_id');
            $this.addClass('chooseFamily__link--active');
            $this.siblings('a').removeClass('chooseFamily__link--active');
            that.alertId.find('.selHouseType').val(type_id);
            that.setHouseParams($this);
        });

        /**
         * 编辑户型
         */
        $(document).on('click', '.editDoorModel', this.addNewPlanFunc.bind(this));

        $(document).on('click', '.blockLink', this.checkParams.bind(this));
        /**
         * 四级联动
         */
        this.selects();
    }
};
addNewPlan.init();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(e,t,n){var r;(function(e){typeof n!="undefined"&&n.exports?n.exports=e: true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):r=e})(function(){function u(e,t){return RegExp.prototype.test.call(e,t)}function a(e){return!u(r,e)}function l(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function h(e){return String(e).replace(/[&<>"'\/]/g,function(e){return c[e]})}function p(e){this.string=e,this.tail=e,this.pos=0}function d(e,t){this.view=e,this.parent=t,this.clearCache()}function v(){this.clearCache()}function m(e){var t=e[3],n=t,r;while((r=e[4])&&r.length)e=r[r.length-1],n=e[3];return[t,n]}function g(e){function n(e,n,r){if(!t[e]){var i=g(n);t[e]=function(e,t){return i(e,t,r)}}return t[e]}function r(t,r,i){var s="",o,u;for(var a=0,f=e.length;a<f;++a){o=e[a];switch(o[0]){case"#":u=i.slice.apply(i,m(o)),s+=t._section(o[1],r,u,n(a,o[4],i));break;case"^":s+=t._inverted(o[1],r,n(a,o[4],i));break;case">":s+=t._partial(o[1],r);break;case"&":s+=t._name(o[1],r);break;case"name":s+=t._escaped(o[1],r);break;case"text":s+=o[1]}}return s}var t={};return r}function y(e){var t=[],n=t,r=[],i,s;for(var o=0;o<e.length;++o){i=e[o];switch(i[0]){case"#":case"^":i[4]=[],r.push(i),n.push(i),n=i[4];break;case"/":if(r.length===0)throw new Error("Unopened section: "+i[1]);s=r.pop();if(s[1]!==i[1])throw new Error("Unclosed section: "+s[1]);r.length>0?n=r[r.length-1][4]:n=t;break;default:n.push(i)}}s=r.pop();if(s)throw new Error("Unclosed section: "+s[1]);return t}function b(e){var t,n;for(var r=0;r<e.length;++r)t=e[r],n&&n[0]==="text"&&t[0]==="text"?(n[1]+=t[1],n[3]=t[3],e.splice(r--,1)):n=t}function w(e){if(e.length!==2)throw new Error("Invalid tags: "+e.join(" "));return[new RegExp(l(e[0])+"\\s*"),new RegExp("\\s*"+l(e[1]))]}var e={};e.name="mustache.js",e.version="0.7.0",e.tags=["{{","}}"],e.Scanner=p,e.Context=d,e.Writer=v;var t=/\s*/,n=/\s+/,r=/\S/,i=/\s*=/,s=/\s*\}/,o=/#|\^|\/|>|\{|&|=|!/,f=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};e.escape=h,p.prototype.eos=function(){return this.tail===""},p.prototype.scan=function(e){var t=this.tail.match(e);return t&&t.index===0?(this.tail=this.tail.substring(t[0].length),this.pos+=t[0].length,t[0]):""},p.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.pos+=this.tail.length,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n),this.pos+=n}return t},d.make=function(e){return e instanceof d?e:new d(e)},d.prototype.clearCache=function(){this._cache={}},d.prototype.push=function(e){return new d(e,this)},d.prototype.lookup=function(e){var t=this._cache[e];if(!t){if(e===".")t=this.view;else{var n=this;while(n){if(e.indexOf(".")>0){var r=e.split("."),i=0;t=n.view;while(t&&i<r.length)t=t[r[i++]]}else t=n.view[e];if(t!=null)break;n=n.parent}}this._cache[e]=t}return typeof t=="function"&&(t=t.call(this.view)),t},v.prototype.clearCache=function(){this._cache={},this._partialCache={}},v.prototype.compile=function(e,t){return this._compile(this._cache,e,e,t)},v.prototype.compilePartial=function(e,t,n){return this._compile(this._partialCache,e,t,n)},v.prototype.render=function(e,t,n){return this.compile(e)(t,n)},v.prototype._compile=function(t,n,r,i){if(!t[n]){var s=e.parse(r,i),o=g(s),u=this;t[n]=function(e,t){if(t)if(typeof t=="function")u._loadPartial=t;else for(var n in t)u.compilePartial(n,t[n]);return o(u,d.make(e),r)}}return t[n]},v.prototype._section=function(e,t,n,r){var i=t.lookup(e);switch(typeof i){case"object":if(f(i)){var s="";for(var o=0,u=i.length;o<u;++o)s+=r(this,t.push(i[o]));return s}return i?r(this,t.push(i)):"";case"function":var a=this,l=function(e){return a.render(e,t)};return i.call(t.view,n,l)||"";default:if(i)return r(this,t)}return""},v.prototype._inverted=function(e,t,n){var r=t.lookup(e);return!r||f(r)&&r.length===0?n(this,t):""},v.prototype._partial=function(e,t){!(e in this._partialCache)&&this._loadPartial&&this.compilePartial(e,this._loadPartial(e));var n=this._partialCache[e];return n?n(t):""},v.prototype._name=function(e,t){var n=t.lookup(e);return typeof n=="function"&&(n=n.call(t.view)),n==null?"":String(n)},v.prototype._escaped=function(t,n){return e.escape(this._name(t,n))},e.parse=function(r,u){function g(){if(v&&!m)while(d.length)h.splice(d.pop(),1);else d=[];v=!1,m=!1}u=u||e.tags;var f=w(u),c=new p(r),h=[],d=[],v=!1,m=!1,E,S,x,T;while(!c.eos()){E=c.pos,x=c.scanUntil(f[0]);if(x)for(var N=0,C=x.length;N<C;++N)T=x.charAt(N),a(T)?d.push(h.length):m=!0,h.push(["text",T,E,E+1]),E+=1,T==="\n"&&g();E=c.pos;if(!c.scan(f[0]))break;v=!0,S=c.scan(o)||"name",c.scan(t);if(S==="=")x=c.scanUntil(i),c.scan(i),c.scanUntil(f[1]);else if(S==="{"){var k=new RegExp("\\s*"+l("}"+u[1]));x=c.scanUntil(k),c.scan(s),c.scanUntil(f[1]),S="&"}else x=c.scanUntil(f[1]);if(!c.scan(f[1]))throw new Error("Unclosed tag at "+c.pos);h.push([S,x,E,c.pos]);if(S==="name"||S==="{"||S==="&")m=!0;S==="="&&(u=x.split(n),f=w(u))}return b(h),y(h)};var E=new v;return e.clearCache=function(){return E.clearCache()},e.compile=function(e,t){return E.compile(e,t)},e.compilePartial=function(e,t,n){return E.compilePartial(e,t,n)},e.render=function(e,t,n){return E.render(e,t,n)},e.to_html=function(t,n,r,i){var s=e.render(t,n,r);if(typeof i!="function")return s;i(s)},e}())}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

var _qySystem = __webpack_require__(1);

var _qySystem2 = _interopRequireDefault(_qySystem);

var _unit = __webpack_require__(0);

var u = _interopRequireWildcard(_unit);

var _mustache = __webpack_require__(3);

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

/**
 * [editPlanLog 记录编辑日志]
 */
var editPlanLog = {
    /**
     * [sendAjax 发送日志请求]
     * @param  {[Object]} e [event]
     */
    sendAjax: function sendAjax(e) {
        var $button = $(e.target),
            plan_id = $button.attr('plan_id');

        $.post('/UserHouse/addlog', {
            plan_id: plan_id,
            type: 1
        }, function (response) {
            if (response.res == 1) {
                googleBrower.CallUE4();
            } else {
                u.showTips(response.msg);
            }
        }.bind(this), 'json');
    },
    init: function init() {
        this.wrap = $('#schemeList');
        this.wrap.on('click', '.jsEditPlan', this.sendAjax.bind(this));
    }
};

editPlanLog.init();

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
    page: 1,
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
            url: '/Index/gethouselist',
            type: 'POST',
            dataType: 'json',
            data: {
                page: ++this.page
            },
            success: function success(response) {
                if (response.res == 1) {
                    if (that.page >= response.pages) {
                        that.button.remove();
                    }
                    that.wrapper.append(response.html);
                } else {
                    u.showTips(response.msg);
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

var selectHouse = {
    gethouselist: function gethouselist() {
        var time = this.time.val(),
            city = this.city.val(),
            village = this.village.val();
        window.location.href = '/Index.html?reg_year=' + time + '&city_id=' + city + '&estate_id=' + village;
    },
    init: function init() {
        this.time = $('#reg_year');
        this.city = $('#city_id');
        this.village = $('#estate_id');
        this.time.on('change', this.gethouselist.bind(this));
        this.city.on('change', this.gethouselist.bind(this));
        this.village.on('change', this.gethouselist.bind(this));
    }
};

selectHouse.init();

/**
 * [图片预览]
 */
$('img[data-original]').viewer({
    navbar: false,
    toolbar: false
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=mangerTwoStep.js.map