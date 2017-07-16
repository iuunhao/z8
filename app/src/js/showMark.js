require(['zepto', 'showTips'], function($, showTips) {
    var showMark = {
        /**
         * [showTips alert]
         * @type {[Function]}
         */
        showTips: showTips,
        /**
         * [showMarkInfo 显示点的信息]
         * @param  {[Object]} e [event]
         */
        showMarkInfo: function(e) {
            var $button = $(e.target);
            this.anchor_id = $button.attr('anchor_id');
            $button.siblings('.dotMask').toggleClass('none');
        },
        /**
         * [hideAllMarks 隐藏所有点]
         */
        hideAllMarks: function() {
            this.wrap.find('.dotMask').addClass('none');
        },
        /**
         * [replayFunc 踩点功能]
         * @param  {[type]} e [description]
         */
        replayFunc: function(e) {
            var $button = $(e.target),
                cname = 'praises__link--active';
            if ($button.hasClass(cname)) return false;
            $button.addClass(cname).siblings().removeClass(cname);

            $.post('/zan', {
                anchor_id: this.anchor_id,
                replay: $button.attr('type')
            }, function(response) {
                if (response.res == 1) {

                } else {
                    this.showTips(response.msg);
                }
            }.bind(this), 'json');
            return false;
        },
        /**
         * [init 初始化]
         */
        init: function() {
            /**
             * [wrap 外框]
             */
            this.wrap = $('#markDot');

            /**
             * [anchor_id 记录点的id]
             * @type {[type]}
             */
            this.anchor_id = null;

            /**
             * 显示点信息
             */
            this.wrap.on('click', '.dot', this.showMarkInfo.bind(this));

            /**
             * [阻止事件]
             */
            this.wrap.on('click', '.dotMask', function() {
                return false;
            })

            /**
             * 点，踩
             */
            this.wrap.on('click', '.praises__link', this.replayFunc.bind(this));

            /**
             * 隐藏标点
             */
            $(document).on('click', this.hideAllMarks.bind(this));
        }
    };
    showMark.init();
});
