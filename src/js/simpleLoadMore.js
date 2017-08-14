define(['simpleLoadMore'], function() {
    var $ = require('zepto');

    $.loadmore = function(wrap, options) {
        if (!wrap) return null;

        if (options) {
            options.wrap = wrap;
        } else {
            options = typeof wrap === 'string' ? { wrap: wrap } : wrap;
        }

        $.extend(this, {
            wrap: null,
            url: '',
            page: 1,
            label: 'li',
            params: {},
            loading: '#loading',
            noMore: '#noMore',
            onscroll: function(){},
            onScrollBottom: function() {},
            onEnd: function() {},
            onError: function(msg) {
                alert(msg);
            }
        }, options);
        this.findElement() && this.init();
    }

    $.extend($.loadmore.prototype, {
        /** [findElement 查找元素] */
        findElement: function() {
            var wrap = this.wrap = $(this.wrap);
            if (!wrap.length) return null;

            this.loading = $(this.loading) || this.loading;
            if (!this.loading.length) return null;

            this.noMore = $(this.noMore) || this.noMore;
            if (!this.noMore.length) return null;

            return this;
        },
        /** [showLoading 显示loading] */
        showLoading: function() {
            this.loading.removeClass('none');
        },
        /** [hideLoading 隐藏loading] */
        hideLoading: function() {
            this.loading.addClass('none');
        },
        /** [isEnterScreen 是否滚动到底部] */
        isEnterScreen: function() {
            var $w = $(window),
                wh = $w.height(),
                st = $w.scrollTop(),
                sh = document.body.scrollHeight - 10;
            return wh + st >= sh;
        },
        /** [scrollHandler 滚动事件] */
        scrollHandler: function(e) {
            /** 如果没有滚动的底部 */
            if (!this.isEnterScreen()) return false;

            /** 如果没有更多数据了 */
            if(this.end) return false;

            this.onscroll();

            /** 如果上个请求未结束 */
            if (!this.ready) return false;
            this.ready = true;

            this.page++;
            this.showLoading();
            /** [开始请求数据] */
            $.post(this.url, this._params, function(response) {
                this.ready = true;
                this.hideLoading();
                if (response.res == 1) {
                    /** [if 没有更多数据] */
                    if (!response.list || !response.list.length) {
                        this.end = true;
                        this.onEnd(response);
                    } else {
                        this.onScrollBottom(response);
                    }
                } else {
                    this.onError(response.msg);
                }
            }.bind(this), 'json')
        },
        init: function() {
            this.ready = true;
            this.end = false;
            this._params = $.extend({}, {
                page: this.page,
            }, this.params);

            $(window).on('scroll', this.scrollHandler.bind(this))
        }
    });

    $.loadmore.cache = [];

    $.fn.simpleLoadMore = function(options) {
        return this.each(function(n, item) {
            if (!item.getAttribute('loadmore')) {
                item.setAttribute('loadmore', true);
                $.loadmore.cache.push(new $.loadmore(item, options));
            }
        });
    }

    $.loadmore.destroy = function() {
        var cache = $.loadmore.cache,
            len = cache.length;
        if (len < 1) { return; }
        for (var i = 0; i < len; i++) {
            cache[i].destroy();
        }
        $.loadmore.cache = [];
    }

    return $.tabs;
});