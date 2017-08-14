require(['zepto'], function($) {

    var Tabs = {
        requestData: function(e) {
            var $button = $(e.target),
                sname = this.btnName,
                cname = this.conName,
                index = $button.index();
            $button.addClass(sname).siblings('a').removeClass(sname);
            this.cons.addClass(cname).eq(index).removeClass(cname);
        },
        init: function() {
            this.conName = 'none';
            this.btnName = 'active';
            this.wrap = $('#ctabs');
            this.btns = this.wrap.find('.classTabs__left');
            this.cons = this.wrap.find('.classTabs__right');

            this.btns.on('click', this.requestData.bind(this));
        }
    };
    Tabs.init();
})