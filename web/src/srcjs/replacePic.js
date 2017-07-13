/**
 * [showDetail 查看详情]
 * @type {Object}
 */
// .manage--edit
import './_addNewPlan.js'
import * as u from './_unit.js';
import SYS from './_qySystem.js';

/**
 * [Edit 编辑页面]
 * @type {Object}
 */
const Edit = {
    btnEdit: $('#btnEdit'),
    btnConfirm: $('#btnConfirm'),
    wrapper: $('#manage'),
    cname: 'none',
    editName: 'coverMain--edit',
    /**
     * [showEdit 显示编辑按钮内容可编辑]
     */
    showEdit: function() {
        this.btnEdit.removeClass(this.cname);
        this.btnConfirm.addClass(this.cname);
        this.wrapper.find('.coverMain').removeClass(this.editName);
        this.wrapper.find('select').attr('disabled', 'disabled');
        this.contenteditable = false;

        var picstr = [];
        this.pic_list_ul.find('li').each(function() {
            var id = $(this).attr('pro_id'),
                name = $(this).find('input[type=hidden]').val(),
                category = $(this).find('select').val();
            picstr.push(`${id}^^^${name}^^^${category}`);
        });

        var videostr = [];
        this.video_list_ul.find('li').each(function() {
            var id = $(this).attr('pro_id'),
                name = $(this).find('input[type=hidden]').val(),
                category = $(this).find('select').val();
            videostr.push(`${id}^^^${name}^^^${category}`);
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
        this.wrapper.find('.coverMain').addClass(this.editName);
        this.wrapper.find('select').removeAttr('disabled');
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
        var $parents = $button.parents('.coverMainList__item');
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
     * [updatePicture 替换封面]
     */
    updatePicture(e) {
        var $button = $(e.target);
        if (this.updateAlertPop) this.updateAlertPop = null;

        this.updateAlertPop = new SYS.Alert(this.updateAlert, {
            confirmCallback: function(next) {
                $.post('/', {
                    id: this.updateAlert.find('input[type=radio]:checked').val()
                }, (response) => {
                    if (response.res == 1) {
                        next();
                    } else {
                        u.showTips(response.msg);
                    }
                });
                return false;
            }.bind(this)
        })
        return false;
    },
    /**
     * [init 初始化]
     */
    init: function() {
        var that = this;

        /**
         * [updateAlert 更新封面]
         */
        this.updateAlert = $('#updateAlert');
        this.updateAlertPop = null;


        /**
         * [form 表单]
         * @type {[Object]}
         */
        this.form = $('#coverForm');

        /**
         * [pic_list pic name 集合]
         * @type {[Object]}
         */
        this.pic_list = $('#pic_list');

        /**
         * [pic_list_ul pic 外框]
         * @type {[Object]}
         */
        this.pic_list_ul = $('#pic_list_ul');

        /**
         * [video_list video name 集合]
         * @type {[Object]}
         */
        this.video_list = $('#video_list');

        /**
         * [video_list_ul vidoe 外框]
         * @type {[Object]}
         */
        this.video_list_ul = $('#video_list_ul');

        /**
         * [contenteditable 是否可编辑]
         * @type {Boolean}
         */
        this.contenteditable = false;

        /**
         * 编辑
         */
        this.btnEdit.on('click', this.editHandler.bind(this))

        /**
         * 提交修改
         */
        this.btnConfirm.on('click', this.confirmHandler.bind(this))

        /**
         * [删除选项]
         */
        this.wrapper.on('click', '.coverMainListHead__close', function() {
            that.removeHandler($(this));
        })


        /**
         * [更新图片名字]
         */
        this.wrapper.on('click', '.coverItem__name', function() {
            that.updataNameHandler($(this));
        })

        /**
         * [修改名字失焦校验]
         */
        $('.coverItem__name').on('blur', function() {
            that.updatedName($(this));
        });


        /**
         * 替换封面
         */
        this.wrapper.on('click', '.coverHead__btn', this.updatePicture.bind(this));
    }
};

Edit.init();
