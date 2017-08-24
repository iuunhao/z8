require(['common', 'countTime'], function($, countTime) {
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
        shaixuanHandler: function() {
            this.showPop();
            return false;
        },
        init: function() {
            this.$shaixuan = $('#shaixuan'),
            this.$shaixuan.on('click', this.shaixuanHandler.bind(this));


            this.$shaixuanpop = $('#shaixuanpop');
            this.$shaixuanpop.on('click', '.pop__close', this.hidePop.bind(this))
        }
    };
    sx.init();



})