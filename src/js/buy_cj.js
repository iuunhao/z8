require(['common', 'countTime', 'simpleTab'], function($, countTime, simpleTab) {
    var s = $.mine;
    /** [callback 倒计时] */
    countTime('.jsCountTime', {
        type: 2,
        callback: function($this) {
            var $parent = $this.parents('.buys__item'),
                pid = $parent.attr('pid');

            $.post('/delete', {
                pid: pid
            }, function(response) {
                if (response.res == 1) {
                    $parent.animate({ opacity: 0 }, function() {
                        $(this).remove();
                    })
                } else {
                    s.alert(response.msg);
                }
            }, 'json');
        }
    })

    /** 筛选 */
    var sx = {
        hidePop: function() {
            this.$shaixuanpop.addClass('none');
            return false;
        },
        showPop: function() {
            this.$shaixuanpop.removeClass('none');
            return false;
        },
        /** [shaixuanHandler 筛选] */
        shaixuanHandler: function() {
            this.$shaixuanpop.find('.screening__tag').removeClass('active');
            this.showPop();
            return false;
        },
        /** [clickTagsHandler 选择标签] */
        clickTagsHandler: function(e) {
            var $button = $(e.target);
            $button.toggleClass('active');
            this.hidePop();
        },
        closePopHandler: function() {
            this.hidePop();
        },
        init: function() {
            /** [输入框] */
            this.$searchInput = $('#searchInput');

            /** 筛选 */
            this.$shaixuan = $('#shaixuan');
            this.$shaixuan.on('click', this.shaixuanHandler.bind(this));

            /** 筛选弹窗 */
            this.$shaixuanpop = $('#shaixuanpop');
            this.$shaixuanpop.on('click', '.pop__close', this.closePopHandler.bind(this));
            this.$shaixuanpop.on('click', '.screening__tag', this.clickTagsHandler.bind(this));

            /** 弹窗内切换 */
            new simpleTab('#shaixuanpop', {
                btnCurrent: 'active',
                conCurrent: 'none',
                btns: '.screening__link',
                cons: '.screening__item',
            });
        }
    };
    sx.init();



})