/**
 * [showDetail 查看详情]
 * @type {Object}
 */

const showDetail = {
    wrap: $('#schemeList'),
    /**
     * [showDetail 展开详情]
     * @param  {[Object]} $open [点击的哪个按钮]
     */
    showDetail($open) {
        var cname = 'schemeList__item--active',
            $parent = $open.parents('li');
        $parent.toggleClass(cname);
        this.lookPic($parent);
    },
    lookPic($parent) {
        // if (this.viewer) {
        //     this.viewer = null;
        // }
        // var dom = $parent.find('.infoDetail').get(0);
        // this.viewer = new Viewer(dom, {
        //     toolbar: false,
        //     navbar: false
        // });
    },
    /**
     * [init 初始化]
     */
    init() {
        var that = this;
        this.viewer = null;

        // $(document).on('click', 'img', function() {
        //     if(!$(this).data('data-original')) {
        //         return false;
        //     }
        // })
        // 
        console.log($('img[data-original]').length)



        // 阻止一些图片可预览
        this.wrap.on('click', '.infoSimple__txtBox--poa', function() {
            that.showDetail($(this));
            return false;
        })

    }
};
showDetail.init();

$('#schemeList').viewer();
