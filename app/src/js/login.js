require(['zepto', 'showTips'], function($, showTips) {
    var Login = {
        /**
         * [showTips alert]
         */
        showTips: showTips,
        /**
         * [checkPhone 验证手机号]
         * @return {[Boolean]} [格式是否正确]
         */
        checkPhone: function() {
            var $val = this.phone.val().trim();
            if ($val == '') {
                this.showTips('请输入您的手机号')
                return false;
            }

            if (!/^\d{11}$/.test($val)) {
                this.showTips('请输入正确的手机号码');
                return false;
            }

            return true;
        },
        /**
         * [checkKeyCode 验证码]
         * @return {[Boolean]} [格式是否正确]
         */
        checkKeyCode: function() {
            var $val = this.keyCode.val().trim();

            if ($val == '') {
                this.showTips('请输入验证码');
                return false;
            }

            return true;
        },
        /**
         * 倒计时
         */
        countDown: function(options) {
            options = options || {};
            var time = options.time || 30;
            var counting = options.counting || function() {};
            var end = options.end || function() {};
            var timer = null;
            (function next() {
                if (time == 0) {
                    clearTimeout(timer);
                    timer = null;
                    end(time);
                } else {
                    timer = setTimeout(next, 1000);
                    counting(time);
                }
                time--;
            }());
        },
        /**
         * [sendKeyCodeFunc 发送验证码]
         */
        sendKeyCodeFunc: function(e) {
            var $button = $(e.target);

            if (!this.readyCode) return false;
            this.readyCode = false;

            $.post('/sendKeyCode', {
                phone: this.phone.val()
            }, function(response) {
                if (response.res == 1) {
                    $button.addClass('getCode--gray');
                    this.countDown({
                        counting: function(t) {
                            $button.html(t + 's');
                        },
                        end: function() {
                            $button.removeClass('getCode--gray');
                            $button.html('重新获取');
                            this.readyCode = true;
                        }
                    });
                    return false;
                } else {
                    this.readyCode = true;
                    this.showTips(response.msg);
                }
            }.bind(this), 'json');
        },
        /**
         * [loginFunc 点击登录触发事件]
         */
        loginFunc: function(e) {
            if (!this.checkPhone() || !this.checkKeyCode()) return false;

            /**
             * 防止连击
             */
            if (!this.readySubmit) return false;

            $.post('/login', this.form.serializeArray(), function(response) {
                this.readySubmit = true;
                if (response.res == 1) {
                    var url = response.data.url;
                    if (url) window.location.href = url;
                } else {
                    this.showTips(response.msg);
                }
            }.bind(this), 'json');
        },
        init: function() {
            /**
             * [button 登录按钮]
             */
            this.button = $('#cBtn');

            /**
             * [phone 电话号码]
             */
            this.phone = $('#cPhone');

            /**
             * [keyCode 验证码]
             */
            this.keyCode = $('#cKeyCode');

            /**
             * [btnCode 获取验证码按钮]
             */
            this.btnCode = $('#cBtnCode');

            /**
             * [form 表单]
             */
            this.form = $('#cForm');

            this.readyCode = true;
            this.readySubmit = true;

            /**
             * 提交登录
             */
            this.button.on('click', this.loginFunc.bind(this));

            /**
             * 发送验证码
             */
            this.btnCode.on('click', this.sendKeyCodeFunc.bind(this));
        }
    };
    Login.init();
});
