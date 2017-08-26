require(['zepto', 'showTips', 'simpleLoadMore', 'showCard'], function($, showTips, LoadMore, showCard) {
    var $wrap = $('#dynamic');
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


    var card = {
        showPop: function() {
            this.cardPop.removeClass('none')
        },
        hidePop: function() {
            this.cardPop.addClass('none')
        },
        showCardHandler: function() {
            this.showPop();
            return false;
        },
        init: function() {
            this.cardBtn = $('#cardBtn');
            this.cardBtn.on('click', this.showCardHandler.bind(this));
            this.cardPop = $('#cardPop');
            this.cardPop.on('click', '.card__close', this.hidePop.bind(this));
        }
    };
    card.init();
});