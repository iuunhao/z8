require(['zepto', 'showTips'], function($, showTips) {

    var Home = {
        showTips: showTips,
        /**
         * [confirmUserThisPlan 确认使用方案]
         * @param  {[Object]} e [event]
         */
        confirmUserThisPlan: function(e) {
            var $button = $(e.target),
                plan_id = $button.attr('plan_id');

            /**
             * 防止多次点击
             */
            if (!this.ready) return false;
            this.ready = false;

            $.post('/', {
                plan_id: plan_id
            }, function(response) {
                this.ready = true;
                if (response.res == 1) {
                    var url = response.data.url;
                    if (url) window.location.href = url;
                } else {
                    this.showTips(response.msg);
                }
            }.bind(this), 'json');
        },
        /**
         * [init 初始化]
         */
        init: function() {
            /**
             * [confirm 确认按钮]
             */
            this.confirm = $('#comfirmPlan');

            this.ready = true;

            /**
             * 点击确认
             */
            this.confirm.on('click', this.confirmUserThisPlan.bind(this));
        }
    };

    Home.init();
});
