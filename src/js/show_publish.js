require(['common', 'upload'], function($) {

    var s = $.mine,
        $form = $('#cForm'), // 表单
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

    /** [publishHandler 发布产品] */
    function publishHandler() {
        var $button = $(this);
        if (!checkForms()) return false;

        /** 防止二次点击 */
        if ($button.data('ready') === undefined) $button.data('ready', true);
        if ($button.data('ready') === false) return false;
        $button.data('ready', false);

        $.post('/publish', $form.serializeArray(), function(response) {
            $button.data('ready', true);
            if (response.res == 1) {
                var url = response.data.url;
                if (url) window.location.href = url;
            } else {
                s.alert(response.msg);
            }
        }, 'json');

        return false;
    }

    /** [upProImages 上传产品图片] */
    function upProImages(e) {
        $.ajaxFileUpload({
            url: '/upload.aspx', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'pro_images_btn', //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function(data, status) //服务器成功响应处理函数
            {
                $("#img1").attr("src", data.imgurl);
                if (typeof(data.error) != 'undefined') {
                    if (data.error != '') {
                        alert(data.error);
                    } else {
                        alert(data.msg);
                    }
                }
            },
            error: function(data, status, e) //服务器响应失败处理函数
            {
                alert(e);
            }
        })
        return false;
    }

    /** [upProIntruduction 上传图片介绍] */
    function upProIntruduction() {
        $.ajaxFileUpload({
            url: '/upload.aspx', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'pro_info_img_btn', //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function(data, status) //服务器成功响应处理函数
            {
                $("#img1").attr("src", data.imgurl);
                if (typeof(data.error) != 'undefined') {
                    if (data.error != '') {
                        alert(data.error);
                    } else {
                        alert(data.msg);
                    }
                }
            },
            error: function(data, status, e) //服务器响应失败处理函数
            {
                alert(e);
            }
        })
        return false;
    }

    /** [initHandler 初始化] */
    function initHandler() {
        $btnPublish.on('click', publishHandler);

        /** 上传产品图片 */
        $pro_images_btn.on('click', upProImages);

        /** 上传产品介绍 */
        $pro_images_btn.on('click', upProIntruduction);
    }

    jQuery.handleError = function() {}
    initHandler();
})