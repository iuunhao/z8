import './_addNewPlan.js'
import SYS from './_qySystem.js'

const recharge = {
    checkBuyNumber() {
        var $val = this.totalBuy.val().trim();
        if ($val == '' || isNaN($val)) {
            alert('请输入购买钢镚数量')
            return false;
        }
        return true;
    },
    rechargeFunc() {
        var that = this;
        if (this.pop) this.pop = null;
        this.pop = new SYS.Alert(this.alert, {
            confirmCallback(next) {
                if (!that.checkBuyNumber()) return false;
                next();
                $.post('/', {
                    number: that.totalBuy.val()
                }, (response) => {
                    if (response.info.url) {
                        window.location.href = response.info.url;
                    }
                });
                return false;
            }
        })

    },
    init() {
        this.pop = null;
        this.alert = $('#rechargePop');
        this.totalBuy = $('#totalBuy');
        this.btn = $('#rechargeBtn');
        this.btn.on('click', this.rechargeFunc.bind(this));
    }
};
recharge.init();
