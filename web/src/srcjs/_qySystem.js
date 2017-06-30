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
define(function(require, exports, module) {
    var QIANYI = (function() {
        var QIANYI = {};
        /** [Base 是alert与confirm的基类] */
        QIANYI.Base = function(wrap, options) {
            options = options || {};
            this.wrap = wrap; // 弹窗id
            this.desc = options.desc; // 弹窗描述
            this.desc2 = options.desc2; // 弹窗描述2
            this.desc3 = options.desc3; // 弹窗描述3
            this.desc4 = options.desc4; // 弹窗描述4
            this.desc5 = options.desc5; // 弹窗描述5
            this.caption = options.caption; // 弹窗标题
            this.animate = options.animate || false; // 显示/隐藏弹窗是否使用动画
            this.closeCallback = options.closeCallback || function() {}; // 关闭按钮回调
            this.clickDocumentHide = options.clickDocumentHide || false; // 是否点击docment 关闭弹窗
            this.mask = options.mask || null; // 遮罩
            this.__display = false;
            this.init();
        }
        QIANYI.Base.prototype = {
            constructor: 'QIANYI.Base',
            hasObject: function(object) { // 是否有某个对象
                return (object && object.length != 0)
            },
            hide: function() { // 隐藏弹窗 
                if (!this.hasObject(this.DOM.wrap)) return false;
                if (this.animate) {
                    this.DOM.wrap.animate({
                        opacity: 0
                    }, function() {
                        $(this).addClass('none').hide().css('opacity', 1);
                    })
                } else {
                    this.DOM.wrap.addClass('none').hide();
                }
                if (this.mask) {
                    this.mask.addClass('none').hide();
                }
                this.__display = false;
                return false;
            },
            show: function() { // 显示弹窗  
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
            setDesc: function(desc) { // 设置弹窗描述
                this.desc = desc || this.desc;
                if (this.hasObject(this.DOM.desc)) {
                    this.DOM.desc.html(this.desc || this.DOM.desc.html() || '');
                }
                return this;
            },
            setDesc2: function(desc) { // 设置弹窗描述
                this.desc2 = desc || this.desc2;
                if (this.hasObject(this.DOM.desc2)) {
                    this.DOM.desc2.html(this.desc2 || this.DOM.desc2.html() || '');
                }
                return this;
            },
            setDesc3: function(desc) { // 设置弹窗描述
                this.desc3 = desc || this.desc3;
                if (this.hasObject(this.DOM.desc3)) {
                    this.DOM.desc3.html(this.desc3 || this.DOM.desc3.html() || '');
                }
                return this;
            },
            setDesc4: function(desc) { // 设置弹窗描述
                this.desc4 = desc || this.desc4;
                if (this.hasObject(this.DOM.desc4)) {
                    this.DOM.desc4.html(this.desc4 || this.DOM.desc4.html() || '');
                }
                return this;
            },
            setDesc5: function(desc) { // 设置弹窗描述
                this.desc5 = desc || this.desc5;
                if (this.hasObject(this.DOM.desc5)) {
                    this.DOM.desc5.html(this.desc5 || this.DOM.desc5.html() || '');
                }
                return this;
            },
            setCaption: function(caption) { // 设置弹窗标题
                this.caption = caption || this.caption;
                if (this.hasObject(this.DOM.caption)) {
                    this.DOM.caption.html(this.caption || this.DOM.caption.html() || '温馨提示');
                }
                return this;
            },
            saveDOM: function() { // 保存弹窗元素
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
            addCloseBtn: function() { // 添加关闭按钮
                var that = this;
                if (!this.hasObject(this.DOM.close)) return false;
                this.wrap.on('click', '[close], [close=true]', function() {
                    that.closeCallback.call(that);
                    that.hide();
                })
                return this;
            },
            addDocumentEvent: function() { // 是否document 关闭
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
            destory: function() {
                this.wrap.off('click');
            },
            init: function() {
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
        }

        /** [Extend 继承] */
        QIANYI.Extend = function(parent, childConstructor, fn) {
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
        }

        /** [description alert 弹窗] */
        QIANYI.Alert = QIANYI.Extend(QIANYI.Base, function(wrap, options) {
            options = options || {};
            this.confirm = options.confirm;
            this.cancel = options.cancel;
            this.confirmCallback = options.confirmCallback || function() {};
            this.cancelCallback = options.cancelCallback || function() {};
            this.init();
        }, {
            constructor: 'QIANYI.Alert',
            addConfirmBtn: function() {
                var that = this;
                if (this.wrap.length == 0) return false;
                this.DOM.confirm = this.wrap.find('[confirm]') || this.wrap.find('[confirm=true]');
                if (!this.hasObject(this.DOM.confirm)) return false;
                this.DOM.confirm.html(this.confirm || this.DOM.confirm.html() || '确定');
                this.wrap.on('click', '[confirm], [confirm=true]', function() {
                    that.confirmCallback.call(that);
                    that.hide();
                })
            },
            addCancelBtn: function() {
                var that = this;
                if (this.wrap.length == 0) return false;
                this.DOM.cancel = this.wrap.find('[cancel]') || this.wrap.find('[cancel=true]');
                if (!this.hasObject(this.DOM.cancel)) return false;
                this.DOM.cancel.html(this.cancel || this.DOM.cancel.html() || '取消');
                this.wrap.on('click', '[cancel], [cancel=true]', function() {
                    that.cancelCallback.call(that);
                    that.hide();
                })
            },
            init: function() {
                this._parent.init.call(this);
                this.addConfirmBtn();
                this.addCancelBtn();
            }
        });

        /** [description 错误提示] */
        QIANYI.ErrorTips = QIANYI.Extend(QIANYI.Base, function(wrap, options) {
            options = options || {};
            this.time = options.time || 2000; // 自动关闭时间
            this.autoHide = options.autoHide || false; // 是否自动关闭
            this.autoHideCallback = options.autoHideCallback || function() {}; // 自动关闭回调
            this.init();
        }, {
            constructor: 'QIANYI.ErrorTips',
            setHideTimeOut: function() { // 自动关闭
                var that = this;
                if (!this.autoHide) return false;

                function autoHide() {
                    if (that.__display) { // 如果没有手动关闭则执行以下
                        that.autoHideCallback.call(that);
                        that.hide();
                    }
                    t = null;
                }
                var t = setTimeout(autoHide, this.time);
            },
            init: function() {
                this._parent.init.call(this);
                this.setHideTimeOut();
            }
        });
        return QIANYI;
    })();
    module.exports = QIANYI;
})
