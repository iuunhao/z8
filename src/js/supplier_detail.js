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

    $('#sort').on('change', function() {
        var params = {},
            $this = $(this),
            name = $this.attr('name');
        params[name] = $this.val();
        more.setParams(params);
    })

    $('#selectCate').on('click', 'a', function() {
        var params = {},
            $this = $(this),
            name = $this.attr('name');
        $this.addClass('active').siblings('a').removeClass('active');
        params[name] = $this.val();
        more.setParams(params);
    })
});