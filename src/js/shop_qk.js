require(['common'], function($) {
    var s = $.mine, // 系统弹窗
        $selectAll = $('#cSelectAll'), // 全选
        $list = $('#cList'), // 列表
        $cBtnDown = $('#cBtnDown'), // 删除
        $cBtnDele = $('#cBtnDele'), // 删除
        $cBtnUp = $('#cBtnUp'), // 上架
        $checkboxs = $list.find('input[type=checkbox]'), // inputs
        $checkboxs_length = $checkboxs.length;

    /** [全选] */
    $selectAll.on('click', function() {
        var checked = $(this).prop('checked');
        $checkboxs.prop('checked', checked);
    });

    /** [单选] */
    $checkboxs.on('click', function() {
        var checked = $(this).prop('checked'),
            length = $list.find('input:checked').length;
        $selectAll.prop('checked', $checkboxs_length == length);
    });

    /** [getCheckedValues 获取选中的value值] */
    function getCheckedValues() {
        var values = [];
        $list.find('input:checked').each(function() {
            var value = $(this).val();
            values.push(value);
        })
        return values.join(',');
    }


    /** [删除] */
    $cBtnDele.on('click', function() {
        var $this = $(this),
            values = getCheckedValues(),
            $checkeds = $list.find('input:checked').parents('li');

        if (values.length == 0) {
            s.alert('请选择要删除的商品');
            return false;
        }

        if (!s.confirm('您确认要删除此商品么')) return false;

        $.post('/Sku/dodelsku', {
            ids: values
        }, function(response) {
            $this.data('ready', true);
            if (response.res == 1) {
                $checkeds.animate({opacity: 0}, function() {
                    $(this).remove();
                })
            } else {
                s.alert(response.msg);
            }
        }, 'json');

        return false;

    });

    function goodsUpAndDown(sale_status) {
        var $this = $(this),
            tips = '', // 删除提示
            errorTips = '', // 选择提示
            ids = getCheckedValues(),
            $checkeds = $list.find('input:checked').parents('li');
        sale_status = sale_status || 0;

        switch (sale_status) {
            case 0:
                errorTips = '请选择要下架的商品';
                tips = '您确认要下架此商品么';
                break;
            case 1:
                errorTips = '请选择要上架的商品';
                tips = '您确认要上架此商品么';
                break;
        }

        if (ids.length == 0) {
            s.alert(errorTips);
            return false;
        }

        if (!s.confirm(tips)) return false;

        $.post('/Sku/changesalestatus', {
            sale_status: sale_status, // 0下，1上
            ids: ids
        }, function(response) {
            if (response.res == 1) {
                $checkeds.animate({opacity: 0}, function() {
                    $(this).remove();
                })
            } else {
                s.alert(response.msg);
            }
        }, 'json');
    }

    /** [上架] */
    $cBtnDown.on('click', function() {
        goodsUpAndDown.call($(this), 0);
    })

    $cBtnUp.on('click', function() {
        goodsUpAndDown.call($(this), 1);
    })

})