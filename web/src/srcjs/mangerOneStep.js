/**
 * [showDetail 查看详情]
 * @type {Object}
 */
// .manage--edit
import { showTips } from '../srcjs/_unit.js'

const Edit = {
    btnEdit: $('#btnEdit'),
    btnConfirm: $('#btnConfirm'),
    wrapper: $('#manage'),
    removeUrl: $('#removeURI').val(),
    cname: 'none',
    editName: 'manage--edit',
    /**
     * [showEdit 显示编辑按钮内容可编辑]
     */
    showEdit() {
        this.btnEdit.removeClass(this.cname);
        this.btnConfirm.addClass(this.cname);
        this.wrapper.removeClass(this.editName);
        this.contenteditable = false;
    },
    /**
     * [showConfirm 显示确定按钮内容可编辑]
     */
    showConfirm() {
        this.contenteditable = true;
        this.btnConfirm.removeClass(this.cname);
        this.btnEdit.addClass(this.cname);
        this.wrapper.addClass(this.editName);
    },
    /**
     * [confirmHandler 提交修改]
     * @return {[Boolean]} [阻止默认事件]
     */
    confirmHandler() {
        this.showEdit();
        return false;
    },
    /**
     * [editHandler 编辑]
     * @return {[Boolean]} [阻止默认事件]
     */
    editHandler() {
        this.showConfirm();
        return false;
    },
    /**
     * [removeHandler 删除内容]
     */
    removeHandler() {
        if (!this.contenteditable) return false;
        var $parents = $(this).parents('li');
        $.ajax({
            url: this.removeUrl,
            type: 'POST',
            dataType: 'json',
            data: { proId: $parents.attr('pro_id') },
            success(data) {
                if (data.res == 1) {
                    $parents.animate({ opacity: 0 }, function() {
                        $(this).remove();
                    });
                } else {
                    showTips(data.msg);
                }
            }
        })
    },
    /**
     * [updataNameHandler 修改名称]
     * @param  {[Object]} $name [要修改的对象]
     */
    updataNameHandler($name) {
        if (!this.contenteditable) return false;
        $name.attr('contenteditable', true);
        $name.focus();
    },
    /**
     * [updatedName 修改名称完成]
     * @param  {[Object]} $name [要修改的对象]
     */
    updatedName($name) {
        if ($name.text() == '') {
            var text = $name.siblings('input[type=hidden]').val();
            showTips('名字不能为空！');
            $name.text(text.trim());
            return false;
        } else {
            var text = $name.text().trim();
            $name.text(text);
            $name.siblings('input[type=hidden]').val(text);
            $name.removeAttr('contenteditable');
        }
    },
    /**
     * [init 初始化]
     */
    init() {
        var that = this;
        this.contenteditable = false;
        this.btnEdit.on('click', this.editHandler.bind(this))
        this.btnConfirm.on('click', this.confirmHandler.bind(this))
        this.wrapper.on('click', '.manageList__close', function() {
            that.removeHandler($(this));
        })

        this.wrapper.on('click', '.manageList__desc', function() {
            that.updataNameHandler($(this));
        })

        $('.manageList__desc').on('blur', function() {
            that.updatedName($(this));
        });
    }
};

Edit.init();


/**
 * [图片预览]
 */
$('img[data-original]').viewer({
    navbar: false,
    toolbar: false
});

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
