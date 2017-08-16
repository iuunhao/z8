require(['zepto', 'slider', 'showTips'], function($, Slider, showTips) {
    /** [滚动视图] */
    var $handler = $('#handler'),
        $dot = $handler.find('a'),
        slider = new Slider({
            container: "#slider", //大容器，包含面板元素、触发元素、上下页等
            play: true,
            wrap: '#scroller',
            callback: function(index) {
                $dot.removeClass('active').eq(index).addClass('active');
            }
        });


    /** [收藏] */
    $('#collectionBtn').on('click', function() {
        var $this = $(this);
        if ($this.data('ready') === undefined) $this.data('ready', true);

        /** 防止连击 */
        if ($this.data('ready') == false) return false;
        $this.data('ready', false);
        
        $this.toggleClass('active');
        var has = $this.hasClass('active'),
            txt = has ? '已收藏' : '收藏',
            type = has ? 1 : 0;
        $this.find('span').text(txt);

        $.post('/', {
            type: type
        }, function(response) {
            if (response.res == 1) {
                $this.data('ready', true);
            } else {
                showTips(response.msg);
            }
        }, 'json');
    })
});