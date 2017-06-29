import * as u from './_unit.js';
/**
 * [Register 注册模块]
 * @type {Object}
 */
const Register = {
    /**
     * [showError 显示错误信息]
     */
    showError: function($object, msg) {
        var $siblings = $object.siblings('.input__error');
        // show
        $siblings.removeClass('none').css({ opacity: 0 });
        $siblings.html(msg).stop(true, true).animate({ opacity: 1 }, function() {
            if ($object.timer) {
                clearTimeout($object.timer);
                $object.timer = null;
            }
            // hide
            $object.timer = setTimeout(function() {
                $siblings.stop(true, true).animate({ opacity: 0 }, function() {
                    $(this).addClass('none').html('');
                })
            }, 2000)
        })

    },
    /**
     * [checkUser 检测用户名]
     * @return {[Boolean]} [是否通过检测]
     */
    checkUser: function() {
        var $val = this.user.val().trim();
        if ($val == '') {
            this.showError(this.user, '请输入姓名！');
            return false;
        }
        this.showError(this.user, '');
        return true;
    },
    /**
     * [checkSexy 检测用户名性别]
     * @return {[Boolean]} [是否通过检测]
     */
    checkSexy: function() {
        var $val = this.getSexy().val();
        if (!$val) {
            this.showError(this.sexy.find('label'), '请选择性别！');
            return false;
        }
        return true;
    },
    /**
     * [getSexy 获取性别]
     * @return {[Object]} []
     */
    getSexy: function() {
        return this.sexy.find('input[type=radio]:checked')
    },
    /**
     * [checkBirtyday 检测出生日期]
     * @return {[Boolean]} [是否通过检测]
     */
    checkBirtyday: function() {
        var $val = this.birthday.val();
        if ($val == '') {
            this.showError(this.birthday, '请输入出生日期！');
            return false;
        }
        return true;
    },
    /**
     * [checkPassport 检测身份证]
     * @return {[Boolean]} [是否通过检测]
     */
    checkPassport: function() {
        var $val = this.passport.val().trim();
        if ($val == '') {
            this.showError(this.passport, '请输入身份证号！');
            return false;
        } else if (!/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test($val)) {
            this.showError(this.passport, '请输入正确的身份证号！');
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
            this.showError(this.pass, '请输入密码！');
            return false;
        }
        return true;
    },
    /**
     * [checkPass 检测密码]
     * @return {[Boolean]} [是否通过检测]
     */
    checkRePass: function() {
        var $val = this.repass.val().trim();
        if ($val == '') {
            this.showError(this.repass, '请确认密码！');
            return false;
        } else if ($val != this.pass.val().trim()) {
            this.showError(this.repass, '密码不一致！');
            return false;
        }
        return true;
    },
    /**
     * [checkPhone 检测手机号]
     * @return {[Boolean]} [是否通过检测]
     */
    checkPhone: function() {
        var $val = this.phone.val().trim();
        if ($val == '') {
            this.showError(this.phone, '请输入手机号！');
            return false;
        } else if (!/^\d{11}$/.test($val)) {
            this.showError(this.phone, '请输入正确的手机号！');
            return false;
        }
        return true;
    },
    /**
     * [checkCode 检测验证码]
     * @return {[Boolean]} [是否通过检测]
     */
    checkCode: function() {
        var $val = this.code.val().trim();
        if ($val == '') {
            this.showError(this.code, '请输入验证码！');
            return false;
        }
        return true;
    },
    /**
     * [checkIntroduction 检测个人简介]
     * @return {[Boolean]} [是否通过检测]
     */
    checkIntroduction: function() {
        var $val = this.introduction.val().trim();
        if ($val == '') {
            this.showError(this.introduction, '请输入个人简介！');
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
     * [getCode 获取验证码]
     */
    getCode: function() {
        var that = this;
        if (!this.checkUser() || !this.checkSexy() || !this.checkBirtyday() || !this.checkPassport() || !this.checkPass() || !this.checkRePass() || !this.checkPhone()) {
            return false;
        }

        if (!this.readyCode) {
            return false;
        }
        this.readyCode = false;
        $.ajax({
            url: '/Api/Fund/fundmanager',
            type: 'POST',
            dataType: 'json',
            data: {
                phone: this.phone.val()
            },
            success: function(data) {
                if (data.res == 1) {
                    that.codeBtn.addClass('register__btn--line');
                    that.countDown({
                        counting: function(t) {
                            that.codeBtn.html(t + 's');
                        },
                        end: function() {
                            that.codeBtn.removeClass('register__btn--line');
                            that.codeBtn.html('重新获取');
                            that.smsReady = true;
                        }
                    });
                    return false;
                } else {
                    that.showError(that.codeBtn, data.msg);
                }
                that.readyCode = true;
            }
        })

    },
    /**
     * [submitFunc 提交表单]
     */
    submitFunc: function() {
        var that = this;
        if (!this.checkUser() || !this.checkSexy() || !this.checkBirtyday() || !this.checkPassport() || !this.checkPass() || !this.checkRePass() || !this.checkPhone() || !this.checkCode() || !this.checkIntroduction()) {
            return false;
        }

        if (!this.ready) {
            return false;
        }

        this.ready = false;
        $.ajax({
            url: '/Reg/action',
            type: 'POST',
            dataType: 'json',
            data: {
                user_name: this.user.val(),
                sex: this.getSexy().val(),
                birthday: this.birthday.val(),
                phone: this.phone.val(),
                passport: this.passport.val(),
                code: this.code.val(),
                introduction: this.introduction.val()
            },
            success: function(data) {
                if (data.res == 1) {
                    u.showTips(res.msg);
                    if (data.data.url) {
                        window.location.href = data.data.url;
                    }
                } else {
                    u.showTips(res.msg);
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
        this.readyCode = true;
        this.user = $('#user');
        this.sexy = $('#sexy');
        this.birthday = $('#birthday');
        this.phone = $('#phone');
        this.passport = $('#passport');
        this.pass = $('#password');
        this.repass = $('#repassword');
        this.code = $('#code');
        this.codeBtn = $('#codeBtn');
        this.introduction = $('#introduction');
        this.submitBtn = $('#submitBtn');

        // events
        this.codeBtn.on('click', this.getCode.bind(this));
        this.submitBtn.on('click', this.submitFunc.bind(this));
    }
};

Register.init();
