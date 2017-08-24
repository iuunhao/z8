require(['common', 'upload'], function($) {

    var s = $.mine,
        $form = $('#cForm'), // 表单
        $file_ids = $form.find('[name=file_ids]'),
        $intro_file = $form.find('[name=intro_file]'),
        $btnPublish = $('#btnPublish'), // 发布
        $pro_prop = $('#pro_prop'), // 产品性质
        $pro_title = $('#pro_title'), // 产品标题
        $pro_info = $('#pro_info'), // 产品信息
        $pro_price = $('#pro_price'), // 产品单价
        $pro_total = $('#pro_total'), // 起够数量
        $pro_type = $('#pro_type'), // 产品类别
        $pro_subType = $('#pro_subType'), // 产品类别
        $pro_name = $('#pro_name'), // 产品名称
        $pro_norms = $('#pro_norms'), // 产品规格
        $pro_add = $('#pro_add'), // 产品产地
        $pro_images = $('#pro_images'), // 产品图片
        $pro_images_btn = $('#pro_images_btn'), // 产品图片
        $pro_info_img = $('#pro_info_img'), // 产品介绍
        $pro_info_img_btn = $('#pro_info_img_btn'); // 产品介绍上传按钮



    /** [checkForms 表单校验] */
    function checkForms() {
        var pro_prop = $.trim($pro_prop.val()),
            pro_title = $.trim($pro_title.val()),
            pro_info = $.trim($pro_info.val()),
            pro_price = $.trim($pro_price.val()),
            pro_total = $.trim($pro_total.val()),
            pro_type = $.trim($pro_type.val()),
            pro_subType = $.trim($pro_subType.val()),
            pro_name = $.trim($pro_name.val()),
            pro_norms = $.trim($pro_norms.val()),
            pro_add = $.trim($pro_add.val()),
            pro_images = $.trim($pro_images.children().length),
            pro_info_img = $.trim($pro_info_img.children().length);

        if (pro_prop == -1) {
            s.alert('请选择产品性质');
            return false;
        }

        if (pro_title == '') {
            s.alert('请输入产品标题');
            return false;
        }

        if (pro_info == '') {
            s.alert('请输入产品描述');
            return false;
        }

        if (!/^\d+(\.\d+)?$/.test(pro_price)) {
            s.alert('请输入产品单价');
            return false;
        }

        if (!/^\d+$/.test(pro_total)) {
            s.alert('请输入起购数量');
            return false;
        }

        if (pro_type == -1) {
            s.alert('请选择产品类别');
            return false;
        }

        if (pro_subType == -1) {
            s.alert('请选择产品类别');
            return false;
        }

        if (pro_name == '') {
            s.alert('请输入产品名称');
            return false;
        }

        if (pro_norms == '') {
            s.alert('请输入产品规格');
            return false;
        }

        if (pro_add == '') {
            s.alert('请输入产品产地');
            return false;
        }

        if (pro_images <= 1) {
            s.alert('请上传产品图片')
            return false;
        }

        return true;
    }

    /** [setUploadImagesInfo  上传图片集合] */
    function setUploadImagesInfo() {
        var file_ids = [],
            intro_file = [];
        $pro_images.find('.upfile__del').each(function() {
            var picid = $(this).attr('picid');
            if (picid) {
                file_ids.push(picid);
            }
        })

        $pro_info_img.find('.upfile__del').each(function() {
            var picid = $(this).attr('picid');
            if (picid) {
                intro_file.push(picid);
            }
        });

        $file_ids.val(file_ids.join(','));
        $intro_file.val(intro_file.join(','));
    }

    /** [publishHandler 发布产品] */
    function publishHandler() {
        var $button = $(this);
        if (!checkForms()) return false;

        /** 防止二次点击 */
        if ($button.data('ready') === undefined) $button.data('ready', true);
        if ($button.data('ready') === false) return false;
        $button.data('ready', false);

        setUploadImagesInfo();
        $.post('/Sku/doskueditor', $form.serializeArray(), function(response) {
            $button.data('ready', true);
            if (response.res == 1) {

                if (response.info && response.info.url) {
                    window.location.href = response.info.url;
                }
            } else {
                s.alert(response.msg);
            }
        }, 'json');

        return false;
    }

    /** [upProImages 上传产品图片] */
    function upProImages(e) {
        var $this = $(this),
            fileElementId = $this.data('sid'),
            imageFile = $(this).attr('name');
        $.ajaxFileUpload({
            url: '/Upload/doupload', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            data: {
                imageFile: 'imageFile'
            },
            fileElementId: $this.data('sid'), //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function(data, status) { //服务器成功响应处理函数
                if (data.res == 1) {
                    var info = data.info,
                        str = '<div class="upfile__item upfile__num"><a picid="' + info.file_id + '" href="javascript:;" class="upfile__del">✕</a><img class="upfile__img" src="' + info.file_src + '" alt=""></div>';

                    switch (fileElementId) {
                        case 'pro_info_img_btn':
                            $pro_info_img.prepend(str);
                            break;
                        case 'pro_images_btn':
                            $pro_images.prepend(str);
                            break;
                    }
                    $this.val('');
                } else {
                    s.alert(data.msg);
                }
            },
            error: function(data, status, e) //服务器响应失败处理函数
            {
                alert(e);
            }
        })
        return false;
    }


    /** [selectProType 选择产品类型] */
    function selectProType() {
        $pro_subType.find('option:gt(2)').remove();
        var str = '';
        $.post('/Sku/getchildcate', {
            parent_id: $(this).val()
        }, function(response) {
            if (response.res == 1) {
                var info = response.info;
                $.each(info, function(index, item) {
                    str += '<option value="' + item.id + '">' + item.name + '</option>';
                });
                $pro_subType.append(str);
            } else {
                s.alert(response.msg);
            }
        }, 'json');
    }

    /** [deleteUpLoadImage 删除上传后的图片] */
    function deleteUpLoadImage() {
        var $this = $(this);
        $this.parents('.upfile__num').animate({ opacity: 0 }, function() {
            $(this).remove();
        })
    }


    /** [initHandler 初始化] */
    function initHandler() {
        $btnPublish.on('click', publishHandler);

        /** 上传产品图片 */
        // $pro_images_btn.on('change', upProImages);

        $(document).on('change', '.upfile__inp', function() {
            var $this = $(this),
                id = $this.attr('id');

            if ($this.data('sid') === undefined) $this.data('sid', id);


            if ($this.data('sid') === 'pro_images_btn') {
                if ($pro_images.find('.upfile__num').length == 3) {
                    s.alert('最多上传三张商品图片');
                    return false;
                }
            }

            if ($this.data('sid') === 'pro_info_img_btn') {
                if ($pro_info_img.find('.upfile__num').length == 1) {
                    s.alert('只能上传一张商品介绍图片');
                    return false;
                }
            }

            upProImages.call($this, id)
        });

        /** 上传产品介绍 */
        // $pro_info_img_btn.on('change', upProIntruduction);

        /** 产品类型二级联动 */
        $pro_type.on('change', selectProType)


        $(document).on('click', '.upfile__del', deleteUpLoadImage)
    }

    jQuery.handleError = function() {}
    initHandler();
})