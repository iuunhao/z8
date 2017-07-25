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
    showLoading: function() {
        this.loading.removeClass('none').show();
    },
    hideLoading: function() {
        this.loading.addClass('none').hide();
    },
    /**
     * [showEdit 显示编辑按钮内容可编辑]
     */
    showEdit: function() {
        this.btnEdit.removeClass(this.cname);
        this.btnConfirm.addClass(this.cname);
        this.wrapper.find('.coverMain').removeClass(this.editName);
        this.contenteditable = false;

        var picstr = [];
        this.picList.find('.coverMainList__item').each(function() {
            var id = $(this).attr('pro_id'),
                name = $(this).find('input[type=hidden]').val();
            picstr.push(`${id}^^^${name}`);
        });
        this.pic_list_input.val(picstr.join('||'));

        $.ajax({
            url: '/UserHouse/doeditroampic',
            type: 'POST',
            dataType: 'json',
            data: {
                pic_list: $('#pic_list').val(),
                plan_id: this.plan_id
            },
            success: function(response) {
                if (response.res == 1) {
                    u.showTips(response.msg);
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
        var $button = $(e.target),
            that = this;
        if (this.updateAlertPop) this.updateAlertPop = null;


        this.updateAlertPop = new SYS.Alert(this.updateAlert, {
            confirmCallback: function(next) {
                var $checked = this.updateAlert.find('input[type=radio]:checked');
                var $src = $checked.parents('.checkboxBox').siblings('img').attr('src');

                if ($checked.length == 0) {
                    u.showTips('请选择替换的封面');
                    return false;
                }

                if (!that.updateReady) return false;
                that.updateReady = false;

                $.post('/UserHouse/setroamdiscover', {
                    plan_id: that.plan_id,
                    plan_file_id: $checked.val()
                }, (response) => {
                    that.updateReady = true;

                    if (response.res == 1) {
                        that.wrapper.find('.coverHead__img').attr('src', $src);
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
    create720: function(e) {
        var $checked = this.picList.find('input[type=checkbox]:checked'),
            that = this;
        if ($checked.length == 0) {
            u.showTips('请选择要生成720的图片');
            return false;
        }

        if (this.timer) {
            u.showTips('生成中，请稍等');
            return false;
        }

        var checkList = [];
        var index = 0;
        var id = '';
        var i = null;
        
        $checked.each(function(item) {
            checkList.push($(this).val());
        })
        this.showLoading();
        $.post('/UserHouse/domakeroam', {
            plan_id: that.plan_id,
            plan_file_id: checkList.join(',')
        }, (response) => {
            if (response.res == 1) {
                id = response.info.id;
                nextFrame();
                this.timer = setInterval(nextFrame, 5000);
            } else {
                u.showTips(response.msg);
            }
        });


        function nextFrame() {
            index++;

            if (index >= 20) {
                clearInterval(that.timer);
                that.timer = null;
                that.hideLoading();
                return false;
            }

            $.post('/UserHouse/getroamstatus', {
                id: id
            }, (response) => {
                if (response.res == 1) {
                    that.hideLoading();
                    that.manYou.removeClass('button--gary');
                    that.manYou.attr('href', response.data.url);
                    u.showTips(response.msg);
                    clearInterval(that.timer);
                    that.timer = null;
                }
            });
        }

    },
    /**
     * [init 初始化]
     */
    init: function() {
        var that = this;

        /**
         * [loading 加载中]
         */
        this.loading = $('#loading');

        /**
         * [updateAlert 更新封面]
         */
        this.updateAlert = $('#updateAlert');
        this.updateAlertPop = null;
        this.updateReady = true;

        this.timer = null;

        this.plan_id = this.wrapper.find('.coverHead__btn').attr('plan_id');


        /**
         * [form 表单]
         * @type {[Object]}
         */
        this.form = $('#coverForm');

        /**
         * [pic_list pic name 集合]
         * @type {[Object]}
         */
        this.pic_list_input = $('#pic_list');

        /**
         * [picList pic 外框]
         * @type {[Object]}
         */
        this.picList = this.wrapper.find('.coverMainList');

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
         * [manYou 720漫游按钮]
         */
        this.manYou = $('#manYou');

        /**
         * [description 如果按钮为黑色阻止跳转]
         */
        this.manYou.on('click', function() {
            if ($(this).hasClass('button--gary')) return false;
        })


        /**
         * 替换封面
         */
        this.wrapper.on('click', '.coverHead__btn', this.updatePicture.bind(this));


        /**
         * [createButton 生成720按钮]
         */
        this.createButton = $('#createButton');
        /**
         * 生成720
         */
        this.createButton.on('click', this.create720.bind(this));
    }
};

Edit.init();
