require(['zepto', 'showTips'], function($, showTips) {
    var updatePassword = {
        /**
         * [showTips alert]
         * @type {[Function]}
         */
        showTips: showTips,
        /**
         * [clearInputs 清空input并获取焦点]
         * @param  {[Object]} e [event]
         */
        clearInputs: function(e) {
            var $button = $(e.target),
                $siblings = $button.siblings('input');
            $siblings.val('').focus();
        },
        /**
         * [checkForms 校验form]
         * @return {[Boolean]} [校验结果]
         */
        checkForms: function() {
            var pass = this.pass.val().trim(),
                repass = this.repass.val().trim();

            if (pass == '') {
                this.showTips('请您输入密码');
                return false;
            }

            if (repass == '') {
                this.showTips('请确认您的密码');
                return false;
            }

            if (pass !== repass) {
                this.showTips('两次密码不一致');
                return false;
            }

            return true;
        },
        /**
         * [submitNewPass 提交新的密码]
         */
        submitNewPass: function() {
            if (!this.checkForms()) return false;

            /**
             * 防止连击
             */
            if (!this.readySubmit) return false;
            this.readySubmit = false;

            $.post('/', this.form.serializeArray(), function(response) {
                if (response.res == 1) {
                    this.readySubmit = true;
                    var url = response.data.url;
                    if (url) window.location.href = url;
                } else {
                    this.showTips(response.msg);
                }
            }.bind(this), 'json');

            return false;
        },
        /**
         * [init 初始化]
         */
        init: function() {

            /**
             * [form 表单]
             */
            this.form = $('#cForm');

            /**
             * [pass 密码]
             */
            this.pass = $('#cPass');

            /**
             * [repass 重复密码]
             */
            this.repass = $('#cRepass');

            /**
             * [submitBtn 提交按钮]
             */
            this.submitBtn = $('#cSubmitBtn');

            /**
             * [readySubmit 防止连击]
             */
            this.readySubmit = true;

            /**
             * 提交新密码
             */
            this.submitBtn.on('click', this.submitNewPass.bind(this));

            /**
             * 清空input
             */
            $(document).on('click', '.clear', this.clearInputs.bind(this));
        }
    };
    updatePassword.init();
});
