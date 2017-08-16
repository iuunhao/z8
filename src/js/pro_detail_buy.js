require(['zepto', 'showTips', 'float_calculater'], function($, showTips, calc) {

    var Buy = {
        /** [getCount 获取数量] */
        getCount: function() {
            return parseInt(this.$count.val(), 10) || 0;
        },
        /** [calcTotal 计算总数] */
        calcTotal: function() {
            this.total.text(calc.mul(this.price, this.getCount()).toFixed(3).replace(/\d$/, ''));
        },
        /** [enterCount 输入购买数量] */
        enterCount: function(e) {
            var $val = this.getCount();
            if ($val < 0) {
                $val = 0;
            }
            this.$count.val($val);
            this.calcTotal();
        },
        /** [orderHandler 下单] */
        orderHandler: function(e) {
            var $button = $(e.target),
                count = this.getCount();
            if ($button.data('ready') === undefined) $button.data('ready', true);

            if (count < this.limit) {
                showTips('至少购买' + this.limit + '个');
                return false;
            }

            if ($button.data('ready') === false) return false;
            $button.data('ready', false);

            $.post('/', {
                count: count
            }, function(response) {
                $button.data('ready', true);
                if (response.res == 1) {
                    var url = response.data.url;
                    if (url) {
                        window.location.href = url;
                    }
                } else {
                    showTips(response.msg);
                }
            }, 'json');
        },
        init: function() {
            this.keyCodeMap = {
                "110": true
            };
            /** @type {[Object]} [单价] */
            this.price = parseFloat($('#unitPrice').text());

            /** @type {[Object]} [数量] */
            this.$count = $('#buyNum');
            this.count = this.getCount();
            /** @type {[Object]} [至少买多少] */
            this.limit = this.$count.attr('limit');

            /** @type {[Object]} [总价] */
            this.total = $('#total');

            this.calcTotal();


            this.$count.on('keydown', function(e) {
                if (this.keyCodeMap[e.keyCode]) return false;
            }.bind(this));
            this.$count.on('input', this.enterCount.bind(this));


            /** @type {[Object]} [下单按钮] */
            this.orderBtn = $('#orderBtn');
            this.orderBtn.on('click', this.orderHandler.bind(this));
        }
    };
    Buy.init();
});