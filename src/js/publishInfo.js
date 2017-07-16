require(['zepto', 'showTips'], function($, showTips) {
    var publishInfo = {
        /**
         * [showTips alert]
         * @type {[Funciton]}
         */
        showTips: showTips,
        /**
         * [selectProcess 选择进度]
         * @return {[type]} [description]
         */
        selectProcess: function(e) {
            var $select = $(e.target),
                $text = $select.find('option').not(function() {
                return !this.selected
            }).text();
            $select.siblings('.textBox').text($text);
        },
        /**
         * [upLoadImgHandler 上传图片]
         * @return {[type]} [description]
         */
        upLoadImgHandler: function(e) {
            var $input = $(e.target),
                $parent = $input.parents('li'),
                $ul = $parent.parents('ul'),
                $len = $ul.find('li').length,
                files = e.target.files,
                reader = new FileReader();

            if($input.val()=='') return false;

            reader.onload = function() {
                var $li = $('<li class="imgList__item "><img class="imgList__img" src="'+this.result+'" alt=""><input type="file" class="none" value="'+$input.val()+'" name="img_'+$len+'" /></li>');
                $parent.before($li);
                $input.val('');
            }
            reader.readAsDataURL(files.item(0));
        },
        /**
         * [checkForms 验证表单]
         */
        checkForms: function() {
            var $textareaVal = this.textarea.val().trim();

            if(this.process.val() == 0) {
                this.showTips('请选择装修进度');
                return false;
            }

            if($textareaVal == ''){
                this.showTips('请编辑文章内容');
                return false;
            }

            return true;
        },
        removeImage: function(e) {
            var $button = $(e.target),
                $parent = $button.parents('li');

            $parent.animate({opacity: 0}, function(){
                $(this).remove();
            })
        },
        /**
         * [publishInfoHandler 发布信息]
         */
        publishInfoHandler: function() {
            var that = this;
            if(!this.checkForms()) return false;

            /**
             * 防止连击
             */
            if(!this.ready) return false;
            this.ready = false;

            $.post('/', this.form.serializeArray(), function(response) {
                if(response.res == 1) {
                    that.ready = true;
                    var url = response.data.url;
                    if(url) window.location.href = url;
                } else {
                    this.showTips(response.msg);
                }
            }, 'json');
        },
        init: function() {
            /**
             * [form 表单]
             */
            this.form = $('#cForm');

            /**
             * [ready 防止连击]
             */
            this.ready = true;

            /**
             * [textarea 编辑内容]
             */
            this.textarea = this.form.find('.management__textarea');

            /**
             * [btnPublish 发布按钮]
             */
            this.btnPublish = $('#btnPublish');
            this.btnPublish.on('click', this.publishInfoHandler.bind(this));
            /**
             * [process 装修进度]
             */
            this.process = $('#cSelect');
            this.process.on('change', this.selectProcess.bind(this));

            /**
             * [upLoadImg 上传图片]
             */
            this.upLoadImg = $('#upLoadImg');
            this.upLoadImg.on('change', this.upLoadImgHandler.bind(this));

            /**
             * [imgLists 上传图片]
             */
            this.imgLists = this.form.find('.imgList');

            /**
             * 删除图片
             */
            this.imgLists.on('click', '.close', this.removeImage.bind(this));
        }
    };
    publishInfo.init();
});
