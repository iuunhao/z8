;
~(function() {
    $(document).ready(function() {
        $('#z8').fullpage({
            continuousVertical: true
        });
    });
    $('.btn__page3').on('click', function() {
        $.fn.fullpage.moveTo(4);
    })
}());

;
~(function(log) {
    var register = ({
        els: function() {
            this.root = $('#form');
            this.name = this.root.find('.form__input--name');
            this.tel = this.root.find('.form__input--tel');
            this.typePer = this.root.find('.radio--personal');
            this.typeInc = this.root.find('.radio--inc');
            this.inc = this.root.find('.form__input--inc');
            this.incWrap = this.root.find('.inc');
            this.submitBtn = this.root.find('.btn__page4');
            this.submitBtn = this.root.find('.btn__page4');
        },
        init: function() {
            this.els();
            this.data = {};
            this.setRadio();
            this.submitFun();
        },
        setRadio: function() {
            var _this = this;
            this.getRadioVal();
            this.data.type = 'personal';
            $('.radio').on('change', function() {
                _this.getRadioVal();
                if (_this.radio === 'inc') {
                    _this.incWrap.toggleClass('none');
                    _this.data.type = 'inc';
                } else {
                    _this.incWrap.toggleClass('none');
                    _this.data.type = 'personal';
                }
            });
        },
        getRadioVal: function() {
            this.radio = this.root.find("input[type='radio']:checked").val();
        },
        validator: function(opts) {
            switch (opts.type) {
                case 'name':
                    var reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        alert('请输入姓名');
                        return false;
                    }
                    return true;
                case 'tel':
                    var reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        alert('请输入正确的电话号码');
                        return false;
                    }
                    return true;
                case 'inc':
                    var reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        alert('检查公司名称');
                        return false;
                    }
                    return true;
                default:
                    if (opts.val === '') {
                        alert('内容不能为空');
                        return false;
                    }
                    return true;
                    break;
            }
        },
        nameFun: function() {
            if (this.validator({
                    type: 'name',
                    val: this.name.val()
                })) {
                this.data.name = this.name.val();
                return true;
            }
            return false;
        },
        telFun: function() {
            if (this.validator({
                    type: 'tel',
                    val: this.tel.val()
                })) {
                this.data.tel = this.tel.val();
                return true;
            }
            return false;
        },
        incFun: function() {
            if (this.validator({
                    type: 'inc',
                    val: this.inc.val()
                })) {
                this.data.inc = this.inc.val();
                return true;
            }
            return false;
        },
        submitFun: function() {
            var _this = this;
            this.submitBtn.on('click', function() {
                if (_this.data.type === 'inc') {
                    if (_this.nameFun() && _this.telFun() && _this.incFun()) _this.ajaxFun();
                } else {
                    if (_this.nameFun() && _this.telFun()) _this.ajaxFun();
                }
            })
        },
        ajaxFun: function() {
            var _this = this;
            $.ajax({
                type: 'GET',
                url: window.location.href,
                data: _this.data,
                success: function(data) {
                    $.fn.fullpage.moveTo(5);
                }
            });
        }
    }).init();
}(console.log));
