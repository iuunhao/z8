/**
 * [showDetail 查看详情]
 * @type {Object}
 */
import * as u from '../srcjs/_unit.js'

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
            url: this.url,
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                if (data.res == 1) {
                    that.wrapper.append(data.data);
                } else {
                    u.showTips(res.msg);
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
