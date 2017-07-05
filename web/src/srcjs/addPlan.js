import u from './_unit.js'

const Z = {
    /**
     * [showError 显示错误信息]
     */
    showError: function(msg) {
        var $siblings = this.$error;
        // show
        $siblings.removeClass('none').css({ opacity: 0 });
        $siblings.html(msg).stop(true, true).animate({ opacity: 1 }, function() {
            if ($siblings.timer) {
                clearTimeout($siblings.timer);
                $siblings.timer = null;
            }
            // hide
            $siblings.timer = setTimeout(function() {
                $siblings.stop(true, true).animate({ opacity: 0 }, function() {
                    $(this).addClass('none').html('');
                })
            }, 2000)
        })

    },
    selectPlan() {
        var $cur = this.wrap.find(`.chooseHead__btn.${this.curTabName}`);
        this.plan = $cur.attr('type');

        /**
         * [if 自己装]
         */
        if (this.plan == 1) {
            this.planHue.addClass('none');
            this.planLabel.text('方案标签：');
        }

        /**
         * [if 智能装]
         */
        if (this.plan == 2) {
            this.planHue.removeClass('none');
            this.planLabel.text('选择风格：');
        }


        this.wrap.find('.jsPlanValue').val('')
        this.wrap.find('.jsMainHue').val('')
        this.wrap.find('.stylesTag--active').removeClass('stylesTag--active');
        this.wrap.find('.color--active').removeClass('color--active');

    },
    changePlan(e) {
        var $button = $(e.target);
        $button.addClass(this.curTabName).siblings('a').removeClass(this.curTabName);
        this.selectPlan();


    },
    /**
     * [selectTagFunc 选择方案标签]
     */
    selectTagFunc(e) {
        var $button = $(e.target),
            cname = 'stylesTag--active',
            $value = $button.attr('value');
        $button.addClass(cname).siblings('a').removeClass(cname);
        $button.siblings('input[type=hidden]').val($value);
    },
    /**
     * [selectMainHue 选择主色调]
     */
    selectMainHue(e) {
        var $button = $(e.target),
            cname = 'color--active',
            $value = $button.attr('value');
        $button.addClass(cname).siblings('a').removeClass(cname);
        $button.siblings('input[type=hidden]').val($value);
    },
    /**
     * [checkPlanParams 校验方案所需要参数]
     */
    checkPlanParams() {
        var $planName = this.wrap.find('.jsPlanName').val(),
            $planValue = this.wrap.find('.jsPlanValue').val(),
            $planHue = this.wrap.find('.jsMainHue').val(),
            $planCustom = this.wrap.find('.jsCustomName').val(),
            $planPhone = this.wrap.find('.jsCustomPhone').val();

        if ($planName == '') {
            this.showError('请输入方案名称');
            return false;
        }

        if ($planValue == '') {
            if (this.plan == 1) {
                this.showError('请选择方案标签');
            }
            if (this.plan == 2) {
                this.showError('请选择风格');
            }
            return false;
        }

        if (this.plan == 2 && $planHue == '') {
            this.showError('请选择主色调');
            return false;
        }

        if ($planCustom == '') {
            this.showError('请输入客户姓名');
            return false;
        }

        if ($planPhone == '') {
            this.showError('请输入客户电话');
            return false;
        } else {
            if (!/^\d{11}$/.test($planPhone)) {
                this.showError('请输入正确的电话号码');
                return false;
            }
        }

        if(this.canBuy == 0) {
            this.showError('额度不足请充值');
            return false;
        }
        
        return true;
    },
    /**
     * [submitPlan 提交方案]
     */
    submitPlan() {
        if (!this.checkPlanParams()) return false;

        if (!this.submitReady) return false;
        this.submitReady = false;
        $.post('/', this.form.serializeArray(), (response) => {
            this.submitReady = true;
            if (response.res == 1) {

            } else {
                this.showError(response.msg);
            }
        }, 'json');
    },
    init() {
        this.form = $('#cForm');
        this.wrap = $('#choose');

        
        this.canBuy = $('#canBuy').val();

        /**
         * [$error 错误提示]
         */
        this.$error = $('#errorTips');

        /**
         * [submitBtn 确认按钮]
         */
        this.submitBtn = $('#submitBtn');

        /**
         * [planHue 方案色调]
         */
        this.planHue = this.wrap.find('.jsHue');

        /**
         * [planLabel 方案标签]
         */
        this.planLabel = this.wrap.find('.jsPlanLab');

        /**
         * [curTabName 切换的类型]
         * @type {String}
         */
        this.curTabName = 'chooseHead__btn--active';

        /**
         * [plan 方案 1: 自己装 2: 智能装]
         * @type {Number}
         */
        this.plan = 0;
        this.selectPlan();
        this.wrap.on('click', '.chooseHead__btn', this.changePlan.bind(this));

        /**
         * 选择方案标签
         */
        this.wrap.on('click', '.stylesTag', this.selectTagFunc.bind(this));

        /**
         * 选择主色调
         */
        this.wrap.on('click', '.color__item', this.selectMainHue.bind(this));

        /**
         * 提交方案
         */
        this.submitReady = true;
        this.submitBtn.on('click', this.submitPlan.bind(this));
    }
};
Z.init();
