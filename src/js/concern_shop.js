require(['zepto', 'showTips', 'simpleLoadMore'], function($, showTips, LoadMore) {
    var $wrap = $('#cList');
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
   
});