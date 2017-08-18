require(['common'], function($) {
    var s = $.mine, // 系统弹窗
        $list = $('#cList'),
        querys = {}, // 条件
        $conditions = $('#conditions'); // 条件


    /** [删除订单] */
    function orderDelete() {
        var $button = $(this),
            $parent = $button.parents('li'),
            status = s.confirm('是否确认删除此订单！');

        if (!status) return false;

        $.post('/orderDelete', {}, function(response) {
            if (response.res == 1) {
                $parent.animate({ opacity: 0 }, function() {
                    $(this).remove();
                })
            } else {
                s.alert(response.msg);
            }
        }, 'json');
        return false;
    }


    /** [取消订单] */
    function orderCancel() {
        var $button = $(this),
            $parent = $button.parents('li'),
            status = s.confirm('是否确认取消此订单！');

        if (!status) return false;

        $.post('/orderCancel', {}, function(response) {
            if (response.res == 1) {
                var url = response.data.url;
                if (url) window.location.href = url;
            } else {
                s.alert(response.msg);
            }
        }, 'json');
        return false;
    }


    /** [orderComplete 完成订单] */
    function orderComplete() {
        var $button = $(this);
        return false;
    }

    /** [objToQuery 将对象转为参数] */
    function objToQuery(objs) {
        var arr = [];
        $.each(objs, function(key, value) {
            arr.push(key + '=' + value);
        });
        return arr.join('&');
    }

    /** [selectCondition 选择条件] */
    function selectCondition(e) {
        var $select = $(e.target),
            $value = $select.val(),
            $name = $select.attr('name');
        querys[$name] = $value;
        window.location.href = '/?' + objToQuery(querys);
    }

    /** [init 初始化] */
    function initHandler() {
        /** 删除订单 */
        $list.on('click', '.cDelete', orderDelete);

        /** 取消订单 */
        $list.on('click', '.cCancel', orderCancel);

        /** 完成订单 */
        $list.on('click', '.cComplete', orderComplete);

        /** 选择条件 */
        $conditions.on('change', 'select', selectCondition);
    }
    initHandler();
})