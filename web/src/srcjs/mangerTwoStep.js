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


/**
 * [editPlanLog 记录编辑日志]
 */
const editPlanLog = {
    /**
     * [sendAjax 发送日志请求]
     * @param  {[Object]} e [event]
     */
    sendAjax: function(e) {
        var $button = $(e.target),
            plan_id = $button.attr('plan_id');

        $.post('/UserHouse/addlog', {
            plan_id: plan_id,
            type: 1
        }, function(response) {
            if (response.res == 1) {
                googleBrower.CallUE4();
            } else {
                u.showTips(response.msg);
            }
        }.bind(this), 'json');
    },
    init: function() {
        this.wrap = $('#schemeList');
        this.wrap.on('click', '.jsEditPlan', this.sendAjax.bind(this));
    }
};

editPlanLog.init();


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
