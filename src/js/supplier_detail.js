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



    /** [关注] */
    $('#follow').on('click', function() {
        var $this = $(this);
        if ($this.data('ready') === undefined) $this.data('ready', true);


        /** 防止连击 */
        if ($this.data('ready') == false) return false;
        $this.data('ready', false);

        $this.toggleClass('active');
        var has = $this.hasClass('active'),
            txt = has ? '已关注' : '关注',
            type = has ? 1 : 0;
        $this.find('span').text(txt);

        
        $.post('/fllow', {
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