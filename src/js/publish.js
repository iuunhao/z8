require(['showTips'], function(showTips, LoadMore) {
    var Publish = {
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
                $prev = $('<div class="fileImgBox"><a href="javascript:;" class="del">✕</a><a href="javascript:;" class="imgItem" style="background:url(../images/temp/img1.jpg); background-size: cover"><img class="imgItem__img" src="../images/publics/43.png" alt=""/></a></div>');

            if (this.imgLists.children().length == 4) {
                showTips('最多上传三张图片');
                $input.val('');
                return false;
            }

            if ($input.val() == '') return false;

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
                success: function(response) //服务器成功响应处理函数
                {
                    that.hideLoading();
                    if (response.res == 1) {
                        var data = response.data;
                        $parent.prev().attr('_id', data.id);
                        that.addImageInput(data.id);
                    } else {
                        showTips(response.msg);
                    }
                },
                error: function(data, status, e) //服务器响应失败处理函数
                {
                    alert(e);
                }
            })
            return false;
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
                if (id == item) {
                    file_ids.splice(index, 1);
                }
            })
            this.input_file_ids.val(file_ids.join(','));
        },
        /**
         * [removeImage 删除图片]
         */
        removeImage: function(e) {
            var $button = $(e.target),
                that = this,
                $parent = $button.parents('.fileImgBox');
            $id = $parent.attr('_id');
            $parent.animate({ opacity: 0 }, function() {
                $(this).remove();
                that.removeImageInput($id);
            })
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
         * [getFileIds 获取图片id]
         */
        getFileIds: function() {
            var $val = this.input_file_ids.val().trim();
            return $val == '' ? [] : $val.split(',');
        },
        checkForm: function() {
            var proName = $.trim(this.proName.val()),
                proDesc = $.trim(this.proDesc.val()),
                proDate = $.trim(this.proDate.val()),
                proLabel = $.trim(this.proLabel.val()),
                proCategory = $.trim(this.proCategory.val());

            if (proName == '') {
                showTips('请输入产品名称');
                return false;
            }

            if (proDesc == '') {
                showTips('请输入产品描述');
                return false;
            }

            if (proLabel == 0) {
                showTips('请选择产品标签');
                return false;
            }

            if (proCategory == 0) {
                showTips('请选择产品分类');
                return false;
            }

            if (proDate == '') {
                showTips('请选择交货日期');
                return false;
            }

            if (this.imgLists.children().length == 1) {
                showTips('请添加照片');
                return false;
            }

            return true;
        },
        proTotalHandler: function(e) {
            var $num = $(e.target),
                $val = $num.val();

            if ($val < 0) {
                $val = 0;
            }

            $num.val($val);
        },
        submitHandler: function() {
            if (!this.checkForm()) return false;
        },
        selectProTypeHandler: function(e) {
            var $button = $(e.target),
                str = '',
                that = this;
            this.proCategory.find('option:gt(0)').remove();
            $.post('/Sku/getchildcate', {
                parent_id: $button.val()
            }, function(response) {
                if (response.res == 1) {
                    var info = response.info;
                    $.each(info, function(index, item) {
                        str += '<option value="' + item.id + '">' + item.name + '</option>';
                    });
                    this.proCategory.append(str);
                } else {
                    s.alert(response.msg);
                }
            }, 'json');
        },
        init: function() {

            this.loading = $('#loading');

            /** @type {[Object]} [产品名称] */
            this.proName = $('#proName');

            /** @type {[Object]} [产品描述] */
            this.proDesc = $('#proDesc');

            /** @type {[Object]} [产品标签] */
            this.proLabel = $('#proLabel');
            this.proLabel.on('change', this.selectProTypeHandler.bind(this))

            /** @type {[Object]} [产品分类] */
            this.proCategory = $('#proCategory');


            /** @type {[Object]} [交货日期] */
            this.proDate = $('#proDate');

            /** @type {[Object]} [求购数量] */
            this.proTotal = $('#proTotal');
            this.proTotal.on('input', this.proTotalHandler.bind(this));


            /** @type {[Object]} [发布] */
            this.pubBtn = $('#pubBtn');
            this.pubBtn.on('click', this.submitHandler.bind(this));


            /**
             * [upLoadImg 上传图片]
             */
            this.upLoadImg = $('#addImage');
            this.upLoadImg.on('change', this.upLoadImgHandler.bind(this));

            /**
             * [imgLists 上传图片]
             */
            this.imgLists = $('#imgFiles');


            /**
             * 删除图片
             */
            this.imgLists.on('click', '.del', this.removeImage.bind(this));


        }
    };

    Publish.init();

    jQuery.handleError = function() {}
});