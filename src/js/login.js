require(['common'], function($) {
    var s = $.mine;
    var Login = {
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
         * [checkPhone 验证手机号]
         * @return {[Boolean]} [格式是否正确]
         */
        checkPhone: function($object) {
            var $val = $.trim($object.val());
            if ($val == '') {
                s.alert('请输入您的手机号')
                return false;
            }

            if (!/^\d{11}$/.test($val)) {
                s.alert('请输入正确的手机号码');
                return false;
            }

            return true;
        },

        /** [checkForm 检测表单] */
        checkForm: function() {
            var pass = '';

            if (this.isPassLogin) {
                if (!this.checkPhone(this.$passName)) return false;
                pass = $.trim(this.$password.val());
            } else {
                if (!this.checkPhone(this.$phoneName)) return false;
                pass = $.trim(this.$smscode.val());
            }

            if (pass == '') {
                s.alert(this.isPassLogin ? '请输入密码' : '请输入验证码');
                return false;
            }

            return true;
        },
        /** [loginHandler 登录事件] */
        loginHandler: function(e) {
            var $button = $(e.target),
                params = {};

            if (!this.checkForm()) return false;

            if (this.isPassLogin) {
                params.username = this.$passName.val();
                params.password = this.$password.val();
                params.o = 'pwd';
            } else {
                params.username = this.$phoneName.val();
                params.smscode = this.$smscode.val();
                params.o = 'sms';
            }

            if ($button.data('ready') === undefined) $button.data('ready', true);
            if ($button.data('ready') === false) return false;
            $button.data('ready', false);

            $.post('/Login/action', params, function(response) {
                $button.data('ready', true);
                if (response.res == 1) {
                    var url = response.data.url;
                    if (url) window.location.href = url;
                } else {
                    s.alert(response.msg);
                }
            }, 'json');
        },
        /** [sendsmsHandler 短信验证码] */
        sendsmsHandler: function(e) {
            var $button = $(e.target);

            if (!this.checkPhone(this.$phoneName)) return false;

            if ($button.data('ready') === undefined) $button.data('ready', true);
            if ($button.data('ready') === false) return false;
            $button.data('ready', false);
            $.post('/Sendsms/login', {
                username: this.$phoneName.val()
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
                            $button.data('ready', true);
                        }.bind(this)
                    });
                    return false;
                } else {
                    s.alert(response.msg);
                    $button.data('ready', true);
                }
            }.bind(this), 'json');
        },
        /** [switchLoginType 切换登录方式] */
        switchLoginType: function(e) {
            var $button = $(e.target);
            this.$loginPhone.toggleClass('none');
            this.$loginPass.toggleClass('none');
            this.isPassLogin = !this.isPassLogin;
            return false;
        },
        init: function() {
            this.isPassLogin = true;
            this.$loginPhone = $('#loginPhone');
            this.$loginPass = $('#loginPass');
            this.$phoneName = this.$loginPhone.find('[name=username]');
            this.$smscode = this.$loginPhone.find('[name=smscode]');

            this.$passName = this.$loginPass.find('[name=username]');
            this.$password = this.$loginPass.find('[name=password]');

            /** 短信验证码 */
            this.$verif = $('#verif');
            this.$btnVerif = $('#btnVerif');
            this.$btnVerif.on('click', this.sendsmsHandler.bind(this));

            /** @type {[Object]} [登录按钮] */
            this.$btnLogin = $('#btnSubmit');
            this.$btnLogin.on('click', this.loginHandler.bind(this));
            $(document).on('click', '.login__switchLink', this.switchLoginType.bind(this));
        }
    };
    Login.init();
})