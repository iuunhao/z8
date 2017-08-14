require(['zepto', 'simpleTab', 'simpleLoadMore'], function($, simpleTab) {

    /** tab切换 */
    $('#ctabs').simpleTab({
        btns: '.classTabs__left',
        cons: '.classTabs__right',
    })

    /** [下拉加载更多] */
    $('#cLoadMore').simpleLoadMore({
        url: '/views/首页热销.html',
        onScrollBottom: function(response) {
            var $html = this.wrap.html();
            $html += response.list.join(' ');
            this.wrap.html($html);
        }
    });

    /** 选择分类  */
    var SellHot = {
        /** [showCategoryPop 显示弹窗] */
        showCategoryPop: function() {
            this.categoryPop.removeClass('none');
        },
        /** [hideCategoryPop 隐藏弹窗] */
        hideCategoryPop: function() {
            this.categoryPop.addClass('none');
        },
        /** [init 初始化] */
        init: function() {
            this.btn = $('#categoryBtn'); // 分类按钮
            this.categoryPop = $('#categoryPop'); // 分类弹层
            this.btn.on('click', this.showCategoryPop.bind(this));
            this.categoryPop.on('click', '.classPop__close, .classTabs__right', this.hideCategoryPop.bind(this));

            this.categoryPop.on('click', function() { return false; })
        }
    };
    SellHot.init();

});