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
        elsFun:function(){
            this.root = $('#form');
            this.els = {};
            this.els.name = this.root.find('.form__input--name');
            this.els.tel= this.root.find('.form__input--tel');
            this.els.typePer= this.root.find('.radio--personal');
            this.els.typeInc = this.root.find('.radio--inc');
            this.els.inc = this.root.find('.form__input--inc');
            this.els.incWrap = this.root.find('.inc');
            this.els.submitBtn = this.root.find('.btn__page4');
        },
        init: function() {
            this.elsFun();
            this.data = {};
            this.setRadio();
            this.getRadioVal();
            this.submitFun();
        },
        setRadio: function() {
            $('.radio').on('change', function() {
                this.getRadioVal();
                this.els.incWrap.toggleClass('none');
            }.bind(this));
        },
        getRadioVal: function() {
            this.els.radios = this.root.find(".radio:checked").val();
            switch (this.els.radios) {
                case 'inc':
                    this.data.type = 'inc';
                    break;
                case 'personal':
                    this.data.type = 'personal';
                    break;
            }
        },
        validator: function(opts) {
            switch (opts.type) {
                case 'name':
                    var reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        this.errorFun({
                            type: opts.err.type,
                            msg: opts.err.msg,
                            callback: opts.err.callback
                        });
                        return false;
                    }
                    return true;
                case 'tel':
                    var reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        this.errorFun({
                            type: opts.err.type,
                            msg: opts.err.msg,
                            callback: opts.err.callback
                        });
                        return false;
                    }
                    return true;
                case 'inc':
                    var reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/;
                    if (!reg.test(opts.val) || opts.val === '') {
                        this.errorFun({
                            type: opts.err.type,
                            msg: opts.err.msg,
                            callback: opts.err.callback
                        });
                        return false;
                    }
                    return true;
                default:
                    if (opts.val === '') {
                        this.errorFun({
                            type: opts.err.type,
                            msg: opts.err.msg,
                            callback: opts.err.callback
                        });
                        return false;
                    }
                    return true;
                    break;
            }
        },
        errorFun: function(set) {
            switch (set.type) {
                case 'alert':
                    alert(set.msg)
                    break;
                default:
                    set.callback.call(this);
                    break;
            }
        },
        nameFun: function() {
            if (this.validator({
                    type: 'name',
                    val: this.els.name.val(),
                    err: {
                        type: 'alert',
                        msg: '请输入姓名',
                        callback: function() {}
                    }
                })) {
                this.data.name = this.els.name.val();
                return true;
            }
            return false;
        },
        telFun: function() {
            if (this.validator({
                    type: 'tel',
                    val: this.els.tel.val(),
                    err: {
                        type: 'alert',
                        msg: '请输入正确的电话号码',
                        callback: function() {}
                    }
                })) {
                this.data.tel = this.els.tel.val();
                return true;
            }
            return false;
        },
        incFun: function() {
            if (this.validator({
                    type: 'inc',
                    val: this.els.inc.val(),
                    err: {
                        type: 'alert',
                        msg: '检查公司名称',
                        callback: function() {}
                    }
                })) {
                this.data.inc = this.els.inc.val();
                return true;
            }
            return false;
        },
        submitFun: function() {
            this.els.submitBtn.on('click', function() {
                if (this.data.type === 'inc') {
                    if (this.nameFun() && this.telFun() && this.incFun()) this.ajaxFun();
                } else {
                    if (this.nameFun() && this.telFun()) this.ajaxFun();
                }
            }.bind(this))
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
