/**
 * [showDetail 查看详情]
 * @type {Object}
 */
import './_addNewPlan.js'
import SYS from './_qySystem.js'
import * as u from '../srcjs/_unit.js'
import Mustache from '../libs/js/mustache.js'


const showDetail = {
    wrap: $('#schemeList'),
    /**
     * [showDetail 展开详情]
     * @param  {[Object]} $open [点击的哪个按钮]
     */
    showDetail: function($open) {
        var cname = 'schemeList__item--active',
            $parent = $open.parents('li');
        $parent.toggleClass(cname);
    },
    /**
     * [init 初始化]
     */
    init: function() {
        var that = this;

        /**
         * [阻止一些图片可预览]
         */
        this.wrap.on('click', '.infoSimple__open', function() {
            that.showDetail($(this));
            return false;
        })
    }
};
showDetail.init();



// /**
//  * [图片预览]
//  */
// $('img[data-original]').viewer({
//     navbar: false,
//     toolbar: false
// });

/**
 * [LoadMore 加载更多]
 * @type {Object}
 */
const LoadMore = {
    /**
     * [url 接口地址]
     * @type {[String]}
     */
    url: $('#loadMoreURI').val(),
    page: 1,
    button: $('#loadMore'),
    wrapper: $('#schemeList'),
    loadMoreData: function() {
        var that = this;
        if (!this.ready) {
            return false;
        }
        this.ready = false;

        // this.wrapper.append(this.wrapper.find('li').eq(0))

        $.ajax({
            url: '/Index/gethouselist',
            type: 'POST',
            dataType: 'json',
            data: {
                page: ++this.page
            },
            success: function(response) {
                if (response.res == 1) {
                    if (that.page >= response.pages) {
                        that.button.remove();
                    }
                    that.wrapper.append(response.html);
                } else {
                    u.showTips(response.msg);
                }
                that.ready = true;
            }
        })
    },
    init: function() {
        this.ready = true;
        this.button.on('click', this.loadMoreData.bind(this));
    }
};

LoadMore.init();





/**
 * [showPlayVideo 播放视频]
 * @type {Object}
 */
const showPlayVideo = {
    /**
     * [showPop 显示视频弹窗]
     */
    showPop: function() {
        this.pop.removeClass('none');
    },
    /**
     * [hidePop 关闭视频弹窗]
     */
    hidePop: function() {
        this.pop.addClass('none');
    },
    /**
     * [closePopHandler 关闭视频]
     */
    closePopHandler: function() {
        this.hidePop();
        var $video = this.pop.find('video');
        $video.attr('src', '');
    },
    /**
     * [showVideoHandler 显示视频]
     * @param  {[Object]} $video [要播放的视频]
     */
    showVideoHandler: function($video) {
        var $src = $video.attr('src');
        if (!$src) return false;
        this.pop.find('video').attr('src', $src);
        this.showPop();
    },
    /**
     * [init 初始化]
     * @return {[type]} [description]
     */
    init: function() {
        var that = this;
        this.pop = $('#pubPop');
        this.close = this.pop.find('.pubPop__close');
        $(document).on('click', '.vedioIcon', function() {
            that.showVideoHandler($(this))
        })
        this.close.on('click', this.closePopHandler.bind(this));
    },
};
showPlayVideo.init();


/**
 * [editHousrType 编辑户型图]
 * @type {Object}
 */
const editHousrType = {
    setEditHousrType($btn) {

    },
    init() {
        var that = this;
        /**
         * [获取mustache模板]
         * @param  {[String]} template [html模板]
         */
        $.get('/Public/design/js/templates/houselist.mst', (template) => {
            this.template = template;
        });

        this.wrap = $('#schemeList');
        this.alert = $('#editHouseType');
        /**
         * [houseTypeTmp 户型图模板]
         * @type {[type]}
         */
        this.houseTypeTmp = $('#houseTypeTmp').html();
        /**
         * [editHouseTemp 户型模板]
         * @type {[type]}
         */
        this.editHouseTemp = $('#editHouseTemp').html();
        this.pop = null;


        this.wrap.on('click', '.editDoorModel', function() {
            var $this = $(this);
            that.setEditHousrType($this);
            if (that.pop) {
                that.pop = null;
            }
            var data = {
                info: {
                    title: '编辑户型信息',
                    name: '新湖家园3号楼201',
                    room: 3,
                    hall: 3,
                    toilet: 3,
                    kitchen: 3,
                    size: 150
                }
            };
            that.alert.html(Mustache.render(that.template, data));
            var $parent = $this.parents('.infoSimple__txtBox')
            that.pop = new SYS.Alert(that.alert, {
                confirmCallback: function(next) {
                    next();
                    $parent.html(Mustache.to_html(that.houseTypeTmp, data));
                    return false;
                }
            });
        })
    }
};
// editHousrType.init();


/**
 * [editPlan 编辑方案]
 * @type {Object}
 */
// const editPlan = {
//     setEditHousrType($btn) {
//         this.params.title = $btn.siblings('span').text();
//     },
//     init() {
//         var that = this;
//         this.wrap = $('#schemeList');
//         this.alert = $('#editPlan');
//         this.pop = null;
//         this.params = {};

//         this.wrap.on('click', '.addPlan', function() {
//             that.setEditHousrType($(this));
//             if (that.pop) {
//                 that.pop = null;
//             }

//             that.pop = new SYS.Alert(that.alert, {
//                 confirmCallback() {

//                 }
//             })
//         })
//     }
// };
// editPlan.init();
// 

const selectHouse = {
    gethouselist() {
        var time = this.time.val(),
            city = this.city.val(),
            village = this.village.val();
        window.location.href = `/Index.html?reg_year=${time}&city_id=${city}&estate_id=${village}`;
    },
    init() {
        this.time = $('#reg_year');
        this.city = $('#city_id');
        this.village = $('#estate_id');
        this.time.on('change', this.gethouselist.bind(this));
        this.city.on('change', this.gethouselist.bind(this));
        this.village.on('change', this.gethouselist.bind(this));
    }
};

selectHouse.init();
