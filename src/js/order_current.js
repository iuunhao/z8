require(['common'], function($) {
    var s = $.mine, // 系统弹窗
        $list = $('#cList'),
        querys = {}, // 条件
        $conditions = $('#conditions'), // 条件
        $orderInfoConfirm = $('#orderInfoConfirm'),
        $errorTips = $orderInfoConfirm.find('.errorTips');


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

    /** [getPopData 获取弹窗信息] */
    function getPopData($parent) {
        var params = {
            pid: $parent.attr('pid')
        };
        $parent.find('[pop]').each(function() {
            var $this = $(this),
                key = $this.attr('pop'),
                value = $this.text();
            params[key] = value;
        });
        return params;
    }

    /** [setPopData 设置弹窗信息] */
    function setPopData(data) {
        data = data || {};
        $orderInfoConfirm.find('[pop]').each(function() {
            var $this = $(this),
                key = $this.attr('pop'),
                value = data[key];
            if (value) {
                if ($this.attr('type')) {
                    $this.val(value);
                } else {
                    $this.text(value);
                }
            }
        })
    }

    /** [orderComplete 完成订单] */
    function orderComplete() {
        var $button = $(this),
            $parent = $button.parents('li'),
            data = getPopData($parent);
        setPopData(data);
        showPop();
        return false;
    }

    /** [showError 错误信息] */
    function showError(str) {
        $errorTips.text(str);
        $errorTips.stop(true, true).delay(3000).animate({ opacity: 0 }, function() {
            $(this).text('');
            $(this).css({ opacity: 1 });
        })
    }

    /** [confirmOrderComplete 确认订单完成] */
    function confirmOrderComplete() {
        var total = $.trim($orderInfoConfirm.find('[pop=total]').val()),
            money = $.trim($orderInfoConfirm.find('[pop=money]').val());

        if (total == '') {
            showError('请输入订单数量');
            return false;
        }

        if (!/^\d+$/.test(total)) {
            showError('请输入正确的订单数量');
            return false;
        }

        if (money == '') {
            showError('请输入订单金额');
            return false;
        }

        if (!/^\d+(\.\d+)?$/.test(money)) {
            showError('请输入正确的订单金额');
            return false;
        }

        $.post('/', {
            money: money,
            total: total
        }, function(response) {
            if (response.res == 1) {
                hidePop();
                var url = response.data.url;
                if (url) window.location.href = url;
            } else {
                showError(response.msg);
            }
        }, 'json');

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

    /** [showPop 显示弹窗] */
    function showPop() {
        $orderInfoConfirm.removeClass('none').show();
    }

    /** [showPop 隐藏弹窗] */
    function hidePop() {
        $orderInfoConfirm.addClass('none').hide();
        return false;
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

        $orderInfoConfirm.on('click', '.pop__close', hidePop);
        $orderInfoConfirm.on('click', '.pop__btn', confirmOrderComplete);
    }
    initHandler();
})