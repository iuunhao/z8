/**
 * [showDetail 查看详情]
 * @type {Object}
 */
const Viewer = require('../libs/viewer.min.js');

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
    },
    lookPic() {
        if (this.viewer) {
            this.viewer = null;
        }
        this.viewer = new Viewer(document.getElementById('schemeList'), {
            toolbar: false,
            navbar: false
        });
    },
    /**
     * [init 初始化]
     */
    init() {
        var that = this;
        this.viewer = null;
        
        
        // 阻止一些图片可预览
        this.wrap.on('click', '.infoSimple__open', function() {
            that.showDetail($(this));
            that.lookPic()
            return false;
        })

    }
};
showDetail.init();
