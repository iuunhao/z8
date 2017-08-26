define(['zepto'], function($) {
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
    return card;
});