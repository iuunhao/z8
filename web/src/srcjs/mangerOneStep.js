/**
 * [showDetail 查看详情]
 * @type {Object}
 */
// .manage--edit
import './_addNewPlan.js'
import * as u from './_unit.js';

/**
 * [Edit 编辑页面]
 * @type {Object}
 */
const Edit = {
    btnEdit: $('#btnEdit'),
    btnConfirm: $('#btnConfirm'),
    wrapper: $('#manage'),
    cname: 'none',
    editName: 'manage--edit',
    /**
     * [showEdit 显示编辑按钮内容可编辑]
     */
    showEdit: function() {
        this.btnEdit.removeClass(this.cname);
        this.btnConfirm.addClass(this.cname);
        this.wrapper.removeClass(this.editName);
        this.contenteditable = false;
        this.planName.attr('disabled', 'disabled');
        this.planName.siblings('input[type=hidden]').val(this.planName.val());
        this.tags.addClass('none');
        this.tag.removeClass('none');

        var picstr = [];
        this.pic_list_ul.find('li').each(function() {
            var id = $(this).attr('pro_id'),
                name = $(this).find('input[type=hidden]').val();
            picstr.push(`${id}^^^${name}`);
        });

        var videostr = [];
        this.video_list_ul.find('li').each(function() {
            var id = $(this).attr('pro_id'),
                name = $(this).find('input[type=hidden]').val();
            videostr.push(`${id}^^^${name}`);
        });

        this.video_list.val(videostr.join('||'));
        this.pic_list.val(picstr.join('||'));


        $.ajax({
            url: '/UserHouse/doeditplan',
            type: 'POST',
            dataType: 'json',
            data: this.form.serialize(),
            success: function(response) {
                if (response.res == 1) {

                } else {
                    u.showTips(response.msg);
                }
            }
        })

    },
    /**
     * [showConfirm 显示确定按钮内容可编辑]
     */
    showConfirm: function() {
        this.contenteditable = true;
        this.btnConfirm.removeClass(this.cname);
        this.btnEdit.addClass(this.cname);
        this.wrapper.addClass(this.editName);
        this.planName.removeAttr('disabled');
        this.tags.removeClass('none');
        this.tag.addClass('none');
        this.showStyle();
    },
    /**
     * [setStyleClass 设置类型的class]
     * @param {[Object]} $type [选择的风格]
     */
    setStyleClass: function($type) {
        $type.siblings('.manageHead__tag').removeClass('manageHead__tag--active');
        $type.addClass('manageHead__tag--active');
    },
    /**
     * [showStyle 显示风格]
     */
    showStyle: function() {
        var $val = this.tag.find('span').text().trim(),
            that = this;
        this.tags.find('.manageHead__tag').each(function() {
            var $this = $(this),
                $span = $this.text().trim();
            if ($span == $val) {
                that.setStyleClass($this);
            }
        })
    },
    /**
     * [confirmHandler 提交修改]
     * @return {[Boolean]} [阻止默认事件]
     */
    confirmHandler: function() {
        this.showEdit();
        return false;
    },
    /**
     * [editHandler 编辑]
     * @return {[Boolean]} [阻止默认事件]
     */
    editHandler: function() {
        this.showConfirm();
        return false;
    },
    /**
     * [removeHandler 删除内容]
     */
    removeHandler: function($button) {
        if (!this.contenteditable) return false;
        var $parents = $button.parents('li');
        $.ajax({
            url: '/UserHouse/dodelfile',
            type: 'POST',
            dataType: 'json',
            data: { pro_id: $parents.attr('pro_id') },
            success: function(data) {
                if (data.res == 1) {
                    $parents.animate({ opacity: 0 }, function() {
                        $(this).remove();
                    });
                } else {
                    u.showTips(data.msg);
                }
            }
        })
    },
    /**
     * [updataNameHandler 修改名称]
     * @param  {[Object]} $name [要修改的对象]
     */
    updataNameHandler: function($name) {
        if (!this.contenteditable) return false;
        $name.attr('contenteditable', true);
        $name.focus();
    },
    /**
     * [updatedName 修改名称完成]
     * @param  {[Object]} $name [要修改的对象]
     */
    updatedName: function($name) {
        if ($name.text() == '') {
            var text = $name.siblings('input[type=hidden]').val();
            u.showTips('名字不能为空！');
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
    init: function() {
        var that = this;
        this.planName = $('#planName');
        this.tags = $('#ctags');
        this.tag = $('#ctag');
        this.form = $('#cForm');
        this.pic_list = $('#pic_list');
        this.pic_list_ul = $('#pic_list_ul');
        this.video_list = $('#video_list');
        this.video_list_ul = $('#video_list_ul');
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

        this.tags.on('click', '.manageHead__tag', function() {
            var $this = $(this);
            that.setStyleClass($this);
            that.tag.find('span').text($this.text());
            that.tag.find('input[type=hidden]').val($this.attr('value'));
        })
    }
};

Edit.init();

// /**
//  * [图片预览]
//  */
// $('img[data-original]').viewer({
//     navbar: false,
//     toolbar: false
// });

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
    }
};
showPlayVideo.init();
