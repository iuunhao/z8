import './_addNewPlan.js'
import * as u from './_unit.js'
import SYS from './_qySystem.js'

const RecForeman = {
    /**
     * [checkForms 校验表单]
     * @return {[Object]} [结果]
     */
    checkForms() {
        var foremanName = this.foremanName.val().trim(),
            foremanMobile = this.foremanMobile.val().trim();

        if (foremanName == '') {
            u.showTips('请您输入工长姓名');
            return false;
        }

        if (foremanMobile == '') {
            u.showTips('请您输入工长电话号码');
            return false;
        }

        if (!/^\d{11}$/.test(foremanMobile)) {
            u.showTips('请您输入正确的电话号码');
            return false;
        }

        return true;
    },
    /**
     * [recommendedFunc 推荐工长]
     * @param  {[Object]} e [$event]
     */
    recommendedFunc(e) {
        var $button = $(e.target),
            $userId = $button.attr('user_hourse_customer_id');

        if (this.pop) this.pop = null;

        this.resetParams();
        this.userId.val($userId);

        this.pop = new SYS.Alert(this.alert, {
            confirmCallback: function (next) {
                if (!this.checkForms()) return false;

                /**
                 * 防止多次点击
                 */
                if (!this.ready) return false;
                this.ready = false;

                $.post('/Customer/bindmanger', this.form.serializeArray(), (response) => {
                    if (response.res == 1) {
                        next();
                    }
                    u.showTips(response.msg);
                }, 'json');
                return false;
            }.bind(this)
        })
    },
    /**
     * [resetParams 重置参数]
     */
    resetParams() {
        this.userId.val('');
        this.foremanName.val('');
        this.foremanMobile.val('');
    },

    /**
     * [init 初始化]
     */
    init() {
        this.pop = null;
        /**
         * [alert 弹窗]
         */
        this.alert = $('#recommendedPop');
        /**
         * [wrap 列表外框]
         */
        this.wrap = $('#cList');
        /**
         * [form 表单]
         */
        this.form = $('#cForm');

        /**
         * [userId 客户id]
         */
        this.userId = $('#userId');

        /**
         * [foremanName 工长名称]
         */
        this.foremanName = $('#foremanName');

        /**
         * [foremanMobile 工长电话]
         */
        this.foremanMobile = $('#foremanMobile');

        /**
         * [ready 防止连击]
         */
        this.ready = true;

        /**
         * 推荐工长
         */
        this.wrap.on('click', '.recommended', this.recommendedFunc.bind(this));
    }
};
RecForeman.init();
