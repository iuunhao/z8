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
})