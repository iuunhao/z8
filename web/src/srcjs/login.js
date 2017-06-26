import { showTips } from './_unit.js';
/**
 * [Login 登录模块]
 * @type {Object}
 */
const Login = {
    /**
     * [checkUser 检测用户名]
     * @return {[Boolean]} [是否通过检测]
     */
    checkUser() {
        var $val = this.user.val().trim();
        if ($val == '') {
            showTips('请输入用户名！');
            return false;
        }
        return true;
    },
    /**
     * [checkPass 检测密码]
     * @return {[Boolean]} [是否通过检测]
     */
    checkPass() {
        var $val = this.pass.val().trim();
        if ($val == '') {
            showTips('请输入密码！');
            return false;
        }
        return true;
    },
    /**
     * [submitFunc 提交表单]
     */
    submitFunc() {
        if (!this.checkUser() || !this.checkPass()) {
            return false;
        }

        if (!this.ready) {
            this.ready = false;
            return false;
        }


        $.ajax({
                url: '/Login/action',
                type: 'POST',
                dataType: 'json',
                data: {
                    username: this.user.val(),
                    smscode: this.pass.val()
                },
            })
            .done((res) => {
                if (res == 1) {
                    showTips(res.msg);
                    if (res.url) {
                        window.location.href = res.url;
                    }
                } else {
                    showTips(res.msg);
                }
            })
            .fail(() => {
                console.log("error");
                this.ready = true;
            })
            .always(() => {
                console.log("complete");
                this.ready = true;
            });
    },
    /**
     * [init 初始化]
     */
    init() {
        this.ready = true;
        this.wrap = $('#loginForm');
        this.user = $('#user_name');
        this.pass = $('#pass_word');
        this.subm = $('#loginSubmit');

        this.subm.on('click', this.submitFunc.bind(this));
    }
};

Login.init();
