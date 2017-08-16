require(['zepto', 'showTips', 'simpleLoadMore'], function($, showTips, LoadMore) {
    var $wrap = $('#cList');
    var more = new LoadMore($wrap, {
        url: '/',
        params: {},
        onScrollBottom: function(response) {
            var $html = this.wrap.html();
            $html += response.data.list;
            this.wrap.html($html);
        }
    });


    $('#select').on('change', function() {
        var params = {},
            $this = $(this),
            name = $this.attr('name');
        $wrap.html('');
        params[name] = $this.val();
        more.setParams(params);
    })

});