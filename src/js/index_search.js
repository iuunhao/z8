require(['zepto', 'showTips'], function($, showTips) {

    var $searchBtn = $('#searchBtn'),
        $searchInput = $('#searchInput'),
        $list = $('#seachList'),
        jump = function($val) {
            window.location.href = '/search?keyword=' + $val;
        };

    /** [搜索] */
    $searchBtn.on('click', function() {
        var $val = $.trim($searchInput.val());
        if ($val == '') {
            showTips('请输入要搜索的内容')
            return false;
        }
        jump($val);
    });


    /** [点击历史记录] */
    $list.on('click', '.seachList__keyword', function() {
        var $val = $(this).text();
        jump($val);
        return false;
    })

    /** [删除单条] */
    $list.on('click', '.seachList__close', function() {
        var $this = $(this),
            kid = $this.attr('kid');
        if (!kid) return false;
        $.post('/', { id: kid }, function(response) {
            if (response.res == 1) {
                $this.parent('li').animate({
                    opacity: 0
                }, function() {
                    $(this).remove();
                });
            } else {
                showTips(response.msg);
            }
        }, 'json');

        return false;
    })

    /** 清除全部 */
    $('#clearBtn').on('click', function() {
        var $this = $(this);
        $.post('/', function(response) {
            if (response.res == 1) {
                $this.parent('ul').html('');
            } else {
                showTips(response.msg);
            }
        }, 'json');
    })
});