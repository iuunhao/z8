require(['showTips'], function(showTips) {
    var s = $.mine,
        $form = $('#cForm'), // 表单
        $icon = $form.find('[name=back_pic_id]'), // 表单
        $btnPublish = $('#btnPublish'), // 发布
        $uploadHead = $('#uploadHead'), // 上传头像
        $imgHead = $('#imgHead'), // 头像
        $relName = $('#relName'), // 商家地址
        $address = $('#address'), // 商家地址
        $shopName = $('#shopName'), // 商家地址
        $mobile = $('#mobile'); // 商家手机

    /** [checkForms 表单校验] */
    function checkForms() {
        var relName = $.trim($relName.val()),
            shopName = $.trim($shopName.val()),
            address = $.trim($address.val()),
            mobile = $.trim($mobile.val());

        if (relName == '') {
            s.alert('请输入用户名');
            return false;
        }

        if (shopName == '') {
            s.alert('请输入店铺名称');
            return false;
        }

        if (mobile == '') {
            s.alert('请输入商家手机');
            return false;
        }
        
        if(!/^\d{11}$/.test(mobile)) {
            s.alert('请输入正确的商家手机');
            return false;
        }

        if (address == '') {
            s.alert('请输入收件地址');
            return false;
        }

        return true;
    }


    /** [publishHandler 名片] */
    function publishHandler() {
        var $button = $(this);
        if (!checkForms()) return false;

        /** 防止二次点击 */
        if ($button.data('ready') === undefined) $button.data('ready', true);
        if ($button.data('ready') === false) return false;
        $button.data('ready', false);

        $.post('/my/profileedit', $form.serializeArray(), function(response) {
            $button.data('ready', true);
            if (response.res == 1) {
                s.alert(response.msg);
            } else {
                s.alert(response.msg);
            }
        }, 'json');

        return false;
    }


    /** [addHeadHandler 上传头像] */
    function addHeadHandler(e) {
        var $button = $(e.target);
        $.ajaxFileUpload({
            url: '/Upload/doupload', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            data: {
                imageFile: 'imageFile'
            },
            fileElementId: 'uploadHead', //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function(data, status) { //服务器成功响应处理函数
                if (data.res == 1) {
                    var info = data.info;
                    $icon.val(info.file_id);
                    $imgHead.attr('src', info.file_src);
                } else {
                    s.alert(data.msg);
                }
            },
            error: function(data, status, e) { //服务器响应失败处理函数
                alert(e);
            }
        })
    }

    /** [initHandler 初始化] */
    function initHandler() {
        $btnPublish.on('click', publishHandler);


        /** 上传头像 */
        $form.on('change', '.formRegist__file', addHeadHandler)

    }
    
    initHandler();

})