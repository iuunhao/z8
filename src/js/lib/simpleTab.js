define(['simpleTab'], function() {
    var $ = require('zepto');

    $.tabs = function(wrap, options) {
        if (!wrap) return null;

        if (options) {
            options.wrap = wrap;
        } else {
            options = typeof wrap === 'string' ? { wrap: wrap } : wrap;
        }

        $.extend(this, {
            btnCurrent: 'active',
            conCurrent: 'none',
            wrap: null,
            btns: null,
            cons: null,
            callback: function() {}
        }, options);
        this.findElement() && this.init();
    }

    $.extend($.tabs.prototype, {
        findElement: function() {
            var wrap = this.wrap = $(this.wrap);
            if (!wrap.length) return null;

            this.$btns = this.wrap.find(this.btns) || $(this.btns);
            if (!this.$btns.length) return null;

            this.$cons = this.wrap.find(this.cons) || $(this.cons);
            if (!this.$cons.length) return null;

            return this;
        },
        requestData: function(e) {
            var $button = $(e.target),
                sname = this.btnCurrent,
                cname = this.conCurrent,
                index = $button.index();
            this.callback();
            $button.addClass(sname).siblings().removeClass(sname);
            this.$cons.addClass(cname).eq(index).removeClass(cname);
        },
        init: function() {
            this.$btns.on('click', this.requestData.bind(this));
        }
    });

    $.tabs.cache = [];


    $.fn.simpleTab = function(options) {
        return this.each(function(n, item) {
            if (!item.getAttribute('t')) {
                item.setAttribute('t', true);
                $.tabs.cache.push(new $.tabs(item, options));
            }
        });
    }

    $.tabs.destroy = function() {
        var cache = $.tabs.cache,
            len = cache.length;
        if (len < 1) { return; }
        for (var i = 0; i < len; i++) {
            cache[i].destroy();
        }
        $.tabs.cache = [];
    }

    return $.tabs;
});