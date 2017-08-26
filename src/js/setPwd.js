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
            var $val = $.trim(this.phone.val());
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
            var $val = $.trim(this.keyCode.val());

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
        checkPass: function() {
            var newPass = $.trim(this.newPass.val()),
                reNewPass = $.trim(this.reNewPass.val());

            if (newPass == '') {
                this.showTips('请输入密码');
                return false;
            }
            if (reNewPass == '') {
                this.showTips('请再输入密码');
                return false;
            }

            if (newPass !== reNewPass) {
                this.showTips('两次密码不一致');
                return false;
            }
            return true;
        },

        checkShop: function() {
            var shopName = $.trim(this.shopName.val()),
                shopType = $.trim(this.shopType.val()),
                shopTags = $.trim(this.shopTags.val());

            if (shopName == '') {
                this.showTips('请输入商家名称');
                return false;
            }

            if (shopType == '') {
                this.showTips('请输入商家性质');
                return false;
            }

            if (shopTags == '') {
                this.showTips('请选择商家标签');
                return false;
            }
            return true;
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
                    $button.addClass('gray');
                    this.countDown({
                        counting: function(t) {
                            $button.html(t + 's');
                        },
                        end: function() {
                            $button.removeClass('gray');
                            $button.html('重新获取');
                            this.readyCode = true;
                        }.bind(this)
                    });
                    return false;
                } else {
                    this.readyCode = true;
                    this.showTips(response.msg);
                }
            }.bind(this), 'json');
        },
        /**
         * [loginFunc 点击注册触发事件]
         */
        loginFunc: function(e) {
            if (!this.checkPhone() || !this.checkKeyCode() || !this.checkPass() || !this.checkShop()) return false;

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
        collTags: function() {
            var $tags = this.tags.find('.active'),
                arr = [];
            $tags.each(function() {
                arr.push($(this).attr('cate_id'))
            })
            this.shopTags.val(arr.join(','));
        },
        selectTags: function(e) {
            var $button = $(e.target);
            $button.toggleClass('active');
            this.collTags();
        },
        clearInputHandler: function(e) {
            var $button = $(e.target);
            $button.parents('.formRegist__item').find('input').val('');
        },
        init: function() {
            /**
             * [button 注册按钮]
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


            this.newPass = $('#newPass');
            this.reNewPass = $('#reNewPass');
            this.shopName = $('#shopName');
            this.shopType = $('#shopType');


            /**
             * [form 表单]
             */
            this.form = $('#cForm');
            this.form.on('click', '.clearBtn', this.clearInputHandler.bind(this))
            this.shopTags = this.form.find('[name=shopTags]'); // 商家标签

            this.tags = $('#tags');
            this.tags.on('click', '.formRegist__tagItem', this.selectTags.bind(this));
            this.collTags();


            this.readyCode = true;
            this.readySubmit = true;

            /**
             * 提交注册
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