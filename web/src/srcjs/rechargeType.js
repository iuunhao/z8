import './_addNewPlan.js'
import SYS from './_qySystem.js'

const rechargeType = {
    switchTab(e) {
        var $tab = $(e.target),
            $index = $tab.index();
        this.$con.eq($index).removeClass('none').siblings().addClass('none');
    },
    init() {
        this.wrap = $('#cTab');
        this.$con = this.wrap.find('.payEwmWrapBox');
        this.wrap.on('click', '.payTypeHead__item', this.switchTab.bind(this));
    }
};
rechargeType.init();
