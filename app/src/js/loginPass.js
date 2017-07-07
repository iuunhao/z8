require(['zepto', 'showTips'], function($, showTips) {
    var LoginPass = {
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
        checkPass: function() {
            var $val = this.pass.val().trim();

            if ($val == '') {
                this.showTips('请输入密码');
                return false;
            }

            return true;
        },
        /**
         * [loginFunc 点击登录触发事件]
         */
        loginFunc: function(e) {

            if (!this.checkPhone() || !this.checkPass()) return false;

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
             * [pass 密码]
             */
            this.pass = $('#cPass');

            /**
             * [form 表单]
             */
            this.form = $('#cForm');

            this.readySubmit = true;

            /**
             * 提交登录
             */
            this.button.on('click', this.loginFunc.bind(this));
        }
    };
    LoginPass.init();
});
