require(['zepto', 'showTips'], function($, showTips) {
    var Daily = {
        /**
         * [hideMenu 隐藏menu]
         */
        hideMenu: function() {
            this.body.removeClass('hidden');
            this.menu.addClass('none');
        },
        /**
         * [showMeun 显示menu]
         */
        showMeun: function() {
            this.body.addClass('hidden');
            this.menu.removeClass('none');
        },
        /**
         * [init 初始化]
         */
        init: function() {
            this.body = $('body');
            this.menu = $('#cMenu');
            this.menuBtn = $('#cMenuBtn');

            /**
             * 菜单按钮
             */
            this.menuBtn.on('click', this.showMeun.bind(this));
            
            /**
             * 收起菜单
             */
            this.menu.on('click', 'a', this.hideMenu.bind(this));
        }
    };
    Daily.init();
});
