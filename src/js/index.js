require(['zepto', 'slider'], function($, Slider) {

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

})