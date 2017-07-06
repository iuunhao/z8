import * as u from './_unit.js';

/**
 * [Login 登录模块]
 * @type {Object}
 */
const Login = {
    /**
     * [checkUser 检测用户名]
     * @return {[Boolean]} [是否通过检测]
     */
    checkUser: function() {
        var $val = this.user.val().trim();
        if ($val == '') {
            u.showTips('请输入用户名！');
            return false;
        }
        return true;
    },
    /**
     * [checkPass 检测密码]
     * @return {[Boolean]} [是否通过检测]
     */
    checkPass: function() {
        var $val = this.pass.val().trim();
        if ($val == '') {
            u.showTips('请输入密码！');
            return false;
        }
        return true;
    },
    /**
     * [submitFunc 提交表单]
     */
    submitFunc: function() {
        var that = this;
        if (!this.checkUser() || !this.checkPass()) {
            return false;
        }

        if (!this.ready) {
            return false;
        }

        this.ready = false;

        $.ajax({
            url: '/Login/action',
            type: 'POST',
            dataType: 'json',
            data: {
                username: this.user.val().trim(),
                password: this.pass.val().trim()
            },
            success: function(data) {
                if (data.res == 1) {
                    u.showTips(data.msg);
                    if (data.data.url) {
                        window.location.href = data.data.url;
                    }
                } else {
                    u.showTips(data.msg);
                }
                that.ready = true;
            }
        })
    },
    /**
     * [init 初始化]
     */
    init: function() {
        this.ready = true;
        this.wrap = $('#loginForm');
        this.user = $('#user_name');
        this.pass = $('#pass_word');
        this.subm = $('#loginSubmit');

        this.subm.on('click', this.submitFunc.bind(this));
    }
};

Login.init();
