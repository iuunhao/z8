require(['showTips'], function(showTips) {

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
         * [enterDate 输入日期]
         */
        enterDate: function(e) {
            var $input = $(e.target),
                $val = $input.val().trim();
            $input.siblings('.textBox').text($val);
        },
        /**
         * [upLoadImgHandler 上传图片]
         * @return {[type]} [description]
         */
        upLoadImgHandler: function(e) {
            var that = this,
                $input = $(e.target),
                $parent = $input.parents('li'),
                $ul = $parent.parents('ul'),
                $len = $ul.find('li').length,
                files = e.target.files,
                reader = new FileReader(),
                $prev = $('<li class="imgList__item "><img class="imgList__img" src="" alt=""></li>');

            if($input.val()=='') return false;

            reader.onload = function() {
                $prev.find('img').attr('src', this.result);
                $parent.before($prev);
            }
            reader.readAsDataURL(files.item(0));

            this.showLoading();

            $.ajaxFileUpload({
                url: '/upload.aspx', //用于文件上传的服务器端请求地址
                secureuri: false, //是否需要安全协议，一般设置为false
                fileElementId: 'upLoadImg', //文件上传域的ID
                dataType: 'json', //返回值类型 一般设置为json
                success: function (response)  //服务器成功响应处理函数
                {
                    that.hideLoading();
                    if(response.res == 1) {
                        var data = response.data;
                        $parent.prev().attr('_id', data.id);
                        that.addImageInput(data.id);
                    } else {
                        that.showTips(response.msg);
                    }
                },
                 error: function (data, status, e)//服务器响应失败处理函数
                    {
                        alert(e);
                    }
            })
            return false;

            /**
             * [上传图片]
             */
            // $.post('/', this.form2.serializeArray(), function(response) {
            //     that.hideLoading();
            //     if(response.res == 1) {
            //         var data = response.data;
            //         $parent.prev().attr('_id', data.id);
            //         that.addImageInput(data.id);
            //     } else {
            //         that.showTips(response.msg);
            //     }
            // }, 'json');
        },
        /**
         * [addImageInput 添加图片id到form下的file_ids]
         */
        addImageInput: function(id) {
            var file_ids = this.getFileIds();
            file_ids.push(id);
            this.input_file_ids.val(file_ids.join(','));
        },
        /**
         * [removeImageInput 删除图片id]
         */
        removeImageInput: function(id) {
            var file_ids = this.getFileIds();
            file_ids.forEach(function(item, index) {
                if(id == item) {
                    file_ids.splice(index, 1);
                }
            })
            this.input_file_ids.val(file_ids.join(','));
        },
        /**
         * [getFileIds 获取图片id]
         */
        getFileIds: function() {
            var $val = this.input_file_ids.val().trim();
            return $val == '' ? [] : $val.split(',');
        },
        /**
         * [showLoading 显示loading]
         */
        showLoading: function() {
            this.loading.removeClass('none');
        },
        /**
         * [hideLoading 隐藏loading]
         */
        hideLoading: function() {
            this.loading.addClass('none');
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
        /**
         * [removeImage 删除图片]
         */
        removeImage: function(e) {
            return false;
            var $button = $(e.target),
                that = this,
                $parent = $button.parents('li');
                $id = $parent.attr('_id');

            $parent.animate({opacity: 0}, function(){
                $(this).remove();
                that.removeImageInput($id);
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
            this.form2 = $('#cForm2');
            /**
             * [input_file_ids 保存图片id]
             */
            this.input_file_ids = this.form.find('input[name=file_ids]');

            /**
             * [loading 加载中]
             */
            this.loading = $('#loading');

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
             * [date 输入日期]
             */
            this.date = $('#cDate');
            this.date.on('change', this.enterDate.bind(this));

            /**
             * [process 装修进度]
             */
            this.process = $('#cSelect');
            this.process.on('change', this.selectProcess.bind(this));

            /**
             * [upLoadImg 上传图片]
             */
            this.upLoadImg = $('#upLoadImg');
            $(document).on('change', '.fileBtn__input', this.upLoadImgHandler.bind(this));

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
