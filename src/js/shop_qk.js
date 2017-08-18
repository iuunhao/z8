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
        return values;
    }

    /** [删除] */
    $cBtnDele.on('click', function() {
        var $this = $(this),
            values = getCheckedValues();

        if (values.length == 0) {
            s.alert('请选择要删除的商品');
            return false;
        }

        $.post('/delete', {
            ids: values
        }, function(response) {
            $this.data('ready', true);
            if (response.res == 1) {
                var url = response.data.url;
                if (url) window.location.href = url;
            } else {
                s.alert(response.msg);
            }
        }, 'json');

    });


    /** [下架] */
    $cBtnDown.on('click', function() {
        var $this = $(this),
            values = getCheckedValues();

        if (values.length == 0) {
            s.alert('请选择要下架的商品');
            return false;
        }

        $.post('/down', {
            ids: values
        }, function(response) {
            $this.data('ready', true);
            if (response.res == 1) {
                var url = response.data.url;
                if (url) window.location.href = url;
            } else {
                s.alert(response.msg);
            }
        }, 'json');

    })

    /** [上架] */
    $cBtnUp.on('click', function() {
        var $this = $(this),
            values = getCheckedValues();

        if (values.length == 0) {
            s.alert('请选择要上架的商品');
            return false;
        }

        $.post('/up', {
            ids: values
        }, function(response) {
            if (response.res == 1) {
                var url = response.data.url;
                if (url) window.location.href = url;
            } else {
                s.alert(response.msg);
            }
        }, 'json');

    })

})