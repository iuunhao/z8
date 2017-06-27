/**
 * [showDetail 查看详情]
 * @type {Object}
 */
import { showTips } from '../srcjs/_unit.js'
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
    /**
     * [init 初始化]
     */
    init() {
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
 * [图片预览]
 */
$('img[data-original]').viewer({
    navbar: false,
    toolbar: false
});

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
    loadMoreData() {
        if (!this.ready) {
            return false;
        }
        this.ready = false;

        // this.wrapper.append(this.wrapper.find('li').eq(0))

        $.ajax({
                url: this.url,
                type: 'POST',
                dataType: 'json'
            })
            .done((res) => {
                if (res == 1) {
                    this.wrapper.append(res.data);
                } else {
                    showTips(res.msg);
                }
                this.ready = true;
            })
            .fail(() => {
                this.ready = true;
                console.log("error");
            })
            .always(() => {
                this.ready = true;
                console.log("complete");
            });

    },
    init() {
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
    showPop() {
        this.pop.removeClass('none');
    },
    /**
     * [hidePop 关闭视频弹窗]
     */
    hidePop() {
        this.pop.addClass('none');
    },
    /**
     * [closePopHandler 关闭视频]
     */
    closePopHandler() {
        this.hidePop();
        var $video = this.pop.find('video');
        $video.attr('src', '');
    },
    /**
     * [showVideoHandler 显示视频]
     * @param  {[Object]} $video [要播放的视频]
     */
    showVideoHandler($video) {
        var $src = $video.attr('src');
        if(!$src) return false;
        this.pop.find('video').attr('src', $src);
        this.showPop();
    },
    /**
     * [init 初始化]
     * @return {[type]} [description]
     */
    init() {
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

