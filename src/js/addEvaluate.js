require(['zepto', 'showTips'], function($, showTips) {
    var addEvaluate = {
        /**
         * [showTips alert]
         * @type {[Function]}
         */
        showTips: showTips,
        /**
         * [changeStatus 评价星级]
         * @param  {[Object]} e [event]
         */
        changeStatus: function(e) {
            var $button = $(e.target),
                $index = $button.index() + 1,
                $parent = $button.parent(),
                cname = 'stars__item--active',
                $stars = $parent.find('.stars__item');
            $stars.removeClass(cname);
            for (var i = $index; i--;) {
                $stars.eq(i).addClass(cname);
            }
            $button.siblings('input[type=hidden]').val($index);
            return false;
        },
        /**
         * [checkForms 校验评价选项]
         * @return {[Boolean]} [是否通过]
         */
        checkForms: function() {
            var design = this.design.val(),
                server = this.server.val(),
                textarea = this.textarea.val();

            if (design == '') {
                this.showTips('请对设计服务评价');
                return false;
            }

            if (server == '') {
                this.showTips('请对装修服务评价')
                return false;
            }

            if (textarea == '') {
                this.showTips('请输入评价内容');
                return false;
            }

            return true;
        },
        /**
         * [submitEvaluate 提交评论]
         */
        submitEvaluate: function() {
            if (!this.checkForms()) return false;
            /**
             * 防止连击
             */
            if (!this.readySubmit) return false;
            this.readySubmit = false;

            $.post('/sumit', this.form.serializeArray(), function(response) {
                this.readySubmit = true;
                if (response.res == 1) {
                    var url = response.data.url;
                    if (url) window.location.href = url;
                } else {
                    this.showTips(response.msg);
                }
            }.bind(this), 'json');
        },
        init: function() {
            /**
             * [wrap 外框]
             */
            this.wrap = $('#wrap');

            /**
             * [design 设计评价]
             */
            this.design = this.wrap.find('.jsDesign');

            /**
             * [server 服务评价]
             */
            this.server = this.wrap.find('.jsSever');

            /**
             * [textarea 评价内容]
             */
            this.textarea = this.wrap.find('.comment__textarea');

            /**
             * [form 表单]
             */
            this.form = $('#cForm');

            /**
             * [submitBtn 提交按钮]
             */
            this.submitBtn = $('#submitBtn');

            this.readySubmit = true;

            /**
             * 评价分数
             */
            this.wrap.on('click', '.stars__item', this.changeStatus.bind(this));

            /**
             * 提交评论
             */
            this.submitBtn.on('click', this.submitEvaluate.bind(this));
        }
    };

    addEvaluate.init();
});
