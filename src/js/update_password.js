require(['common'], function($) {
    var s = $.mine,
        updatePassword = {
            /** [showError 显示错误] */
            showError: function($dom, str) {
                var $error = $dom.parents('li').find('.form__error');
                if($error.length == 0) return false;
                $error.html(str);
                $error.show(str);
                $error.css('opacity', 1);
                $error.stop(true, true).delay(3000).animate({ opacity: 0 }, function() {
                    $(this).hide();
                    $(this).html('');
                })
            },
            /** [checkForm 检测表单] */
            checkForm: function() {
                var nowPass = $.trim(this.nowPass.val()),
                    newPass = $.trim(this.newPass.val()),
                    rePass = $.trim(this.rePass.val()),
                    showError = this.showError;

                if (nowPass == '') {
                    // showError(this.nowPass, '请输入原密码');
                    s.alert('请输入原密码');
                    return false;
                }

                if (newPass == '') {
                    // showError(this.nowPass, '请输入新密码');
                    s.alert('请输入新密码');
                    return false;
                }

                if (rePass == '') {
                    // showError(this.nowPass, '请再次输入新密码');
                    s.alert('请再次输入新密码');
                    return false;
                }

                if (rePass !== newPass) {
                    s.alert('两次输入的密码不一致');
                    return false;
                }

                return true;
            },
            /** [updateHandler 更新密码] */
            updateHandler: function() {
                if (!this.checkForm()) return false;

                $.post('/updatePassword', {
                    nowPass: this.nowPass.val(),
                    newPass: this.newPass.val(),
                    rePass: this.rePass.val()
                }, function(response) {
                    if(response == 1) {

                    } else {

                    }
                }, 'json');
            },
            init: function() {
                this.nowPass = $('#nowPass');
                this.newPass = $('#nowPass');
                this.rePass = $('#rePass');

                this.btnConfirm = $('#btnConfirm');
                this.btnConfirm.on('click', this.updateHandler.bind(this));
            }
        };

    updatePassword.init();
})