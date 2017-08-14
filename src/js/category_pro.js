require(['zepto', 'showTips', 'simpleLoadMore'], function($, showTips, LoadMore) {
    var $wrap = $('#findProductList');
    var more = new LoadMore($wrap, {
        url: '/',
        params: {
            all: 1,
            sort: 2
        },
        onScrollBottom: function(response) {
            var $html = this.wrap.html();
            $html += response.data.list;
            this.wrap.html($html);
        }
    });

    $(document).on('change', '.select', function() {
        var params = {},
            $this = $(this),
            name = $this.attr('name');
        $wrap.html('');
        params[name] = $this.val();
        more.setParams(params);
    })
});