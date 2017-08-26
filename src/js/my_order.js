require(['zepto', 'showTips', 'simpleLoadMore'], function($, showTips, LoadMore) {
    var $editBox = $('#editBox');
    var $wrap = $('#tradingList'),
        more = new LoadMore($wrap, {
            url: '/',
            params: {
                all: 1,
                sort: 2
            },
            onScrollBottom: function(response) {
                var $html = this.wrap.html();
                $html += response.data.list;
                this.wrap.html($html);
            }
        });

    /** [已完成、进行中] */
    $('#selectCate').on('click', 'a', function() {
        var params = {},
            $this = $(this),
            name = $this.attr('name');
        $this.addClass('active').siblings('a').removeClass('active');
        params[name] = $this.val();
        more.setParams(params);
        changeTypes($this.attr('type'));
    });

    /** [changeTypes 显示隐藏编辑] */
    function changeTypes(type) {
        switch (type) {
            case '1':
                $editBox.addClass('none');
                break;
            case '2':
                $editBox.removeClass('none');
                break;
        }
    }

    // changeTypes('2')

    /** [编辑] */
    $editBox.on('click', '.edit', function() {
        var $this = $(this);
        $this.addClass('none');
        $this.siblings('.del').removeClass('none');
        $wrap.find('.tradItemMain__select').removeClass('none');
    })

    /** [取消] */
    $editBox.on('click', '.cancel', function() {
        var $this = $(this),
            $del = $this.parents('.del');
        $del.addClass('none');
        $del.siblings('.edit').removeClass('none');
        $wrap.find('.tradItemMain__select').addClass('none');
        $wrap.find('input:checked').each(function(item) {
            $(this).prop('checked', false);
        })
    })

    /** [删除] */
    $editBox.on('click', '.delete', function() {
        var arr = [];
        $wrap.find('input:checked').each(function(item) {
            var $this = $(this);
            arr.push($this.val());
            $this.parents('li').remove();
        });


        if (arr.length == 0) {
            showTips('请选择要删除的商品');
            return false;
        }

        var flag = confirm('确认要删除么？');
        if (!flag) return false;

        $.post('/delete', {
            ids: arr.join('')
        }, function(response) {
            if (response.ress == 1) {
                showTips('删除成功');
            } else {
                showTips(response.msg);
            }
        }, 'json');
    })


    /** [取消购买] */
    $wrap.on('click', '.btnCancel', function() {
        var $this = $(this),
            $parent = $this.parents('.tradItem'),
            proid = $parent.attr('proid'),
            flag = confirm('您确认要取消购买此商品么？');
        if (!flag) return false;

        $.post('/cancel', {
            id: proid
        }, function(response) {
            if (response.res == 1) {
                $parent.animate({ opacity: 0 }, function() {
                    $(this).remove();
                })
            }
            showTips(response.msg);
        }, 'json');
    });


    /** [关闭] */
    $wrap.on('click', '.btnClose', function() {
        var $this = $(this),
            $parent = $this.parents('.tradItem'),
            proid = $parent.attr('proid'),
            flag = confirm('您确认要关闭求购么？');
        if (!flag) return false;

        $.post('/close', {
            id: proid
        }, function(response) {
            if (response.res == 1) {
                $parent.animate({ opacity: 0 }, function() {
                    $(this).remove();
                })
            }
            showTips(response.msg);
        }, 'json');
    });

});