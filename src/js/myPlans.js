require(['zepto', 'showTips', 'iscroll'], function($, showTips, Iscroll) {

    var plans = {
        /**
         * [switchTab 切换标签]
         * @param  {[Object]} e [event]
         */
        switchTab: function(e) {
            var $button = $(e.target),
                $index = $button.index(),
                btnName = 'designNav__item--active';
            $button.addClass(btnName).siblings().removeClass(btnName);
            this.cons.addClass('none').eq($index).removeClass('none');
            this.scrollTo();
        },
        /**
         * [getScrollLeft 获取左侧滚动值]
         */
        getScrollLeft: function() {
            var $btn = this.wrap.find('.designNav__item--active'),
                btnLeft = $btn.position().left + $btn.width() / 2,
                W = $(window).width(),
                L = W / 2 - btnLeft;
            return Math.min(0, Math.max(this.iscroll.maxScrollX, L));
        },
        /**
         * [scrollTo 滚动到切签处]
         */
        scrollTo: function() {
            var l = this.getScrollLeft();
            this.iscroll.scrollTo(l, 0, 400);
        },
        /**
         * [resizeHandler 页面大小改变]
         */
        resizeHandler: function() {
            if (this.iscroll) {
                this.iscroll.destroy();
                this.iscroll = null;
            }

            this.designNav.css({
                width: this.designNav.get(0).scrollWidth - 10
            })

            this.iscroll = new Iscroll('myScroll', {
                y: 0,
                vScroll: false,
                hScroll: true,
                bounce: true,
                bounceLock: false,
                checkDOMChanges: true,
                hScrollbar: false,
                vScrollbar: true,
            });


        },
        init: function() {
            this.wrap = $('#design');
            this.cons = this.wrap.find('.designList');
            this.btns = this.wrap.find('.designNav__item');
            this.designNav = this.wrap.find('.designNav');

            this.iscroll = null;

            this.resizeHandler();
            $(window).on('resize', this.resizeHandler.bind(this));

            $(document).ready(this.scrollTo.bind(this));
            /**
             * 切换标签
             */
            this.btns.on('click', this.switchTab.bind(this));
        }
    };

    plans.init();
});
