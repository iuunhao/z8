require(['common', 'upload'], function($) {

    var s = $.mine,
        $form = $('#cForm'), // 表单
        $file_ids = $form.find('[name=file_ids]'),
        $btnPublish = $('#btnPublish'), // 发布
        $seller_info = $('#seller_info'), // 产品信息
        $pro_images = $('#pro_images'), // 产品图片
        $pro_images_btn = $('#pro_images_btn'); // 产品图片



    /** [checkForms 表单校验] */
    function checkForms() {
        var seller_info = $.trim($seller_info.val()),
            pro_images = $.trim($pro_images.children().length),
            seller_info_img = $.trim($seller_info_img.find('.upfile__num').length);

        if (seller_info == '') {
            s.alert('请输入商家简介');
            return false;
        }

        if (pro_images < 1) {
            s.alert('请上传产品图片')
            return false;
        }

        return true;
    }

    /** [setUploadImagesInfo  上传图片集合] */
    function setUploadImagesInfo() {
        var file_ids = [];
        $pro_images.find('.upfile__del').each(function() {
            var picid = $(this).attr('picid');
            if (picid) {
                file_ids.push(picid);
            }
        })
        $file_ids.val(file_ids.join(','));
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
        $.post('/dfdsfdsfdsfds', $form.serializeArray(), function(response) {
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
                        case 'seller_info_img_btn':
                            $seller_info_img.prepend(str);
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

        /** 上传产品介绍 */
        $(document).on('change', '.upfile__inp', function() {
            var $this = $(this),
                id = $this.attr('id');

            if ($this.data('sid') === undefined) $this.data('sid', id);


            if ($this.data('sid') === 'pro_images_btn') {
                if ($pro_images.find('.upfile__num').length == 3) {
                    s.alert('最多上传三张图片');
                    return false;
                }
            }

            upProImages.call($this, id)
        });

        $(document).on('click', '.upfile__del', deleteUpLoadImage)
    }

    jQuery.handleError = function() {}
    initHandler();
})