require(['zepto', 'showTips'], function($, showTips) {

    var $searchBtn = $('#searchBtn'),
        $searchInput = $('#searchInput'),
        $list = $('#seachList'),
        jump = function($val) {
            History.add($val);
            window.location.href = '/search?keyword=' + $val;
        },
        History = {
            name: 'HISTORYKEYWORDS',
            split: '^<>^',
            get: function() {
                var str = localStorage.getItem(this.name);
                if (!str) return [];
                return str.split(this.split) || [];
            },
            set: function(arr) {
                var str = arr.join(this.split);
                if (!str) return false;
                localStorage.setItem(this.name, str);
            },
            clear: function() {
                localStorage.removeItem(this.name);
            },
            remove: function(value) {
                this.add(value, true);
            },
            add: function(value, flag) {
                var arr = this.get();
                for (var i = arr.length; i--;) {
                    if (value == arr[i]) {
                        arr.splice(i, 1);
                    }
                }
                
                if (arr.length >= 10) {
                    arr.shift();
                }

                if (!flag) {
                    arr.push(value);
                } else {
                    if (arr.length <= 1) {
                        this.clear();
                    }
                }

                this.set(arr);
            }
        };


    /**
     * [renderList 渲染列表]
     */
    function renderList() {
        var arr = [];
        History.get().forEach(function(item) {
            arr.push('<li class="seachList__item"><a href="javascript:;" class="seachList__keyword">' + item + '</a><a href="" class="seachList__close">✕</a></li>');
        });
        $list.html(arr.reverse().join(' '));
    }

    renderList();

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
            $text = $this.siblings('a').text();
        $this.parent('li').animate({
            opacity: 0
        }, function() {
            History.remove($text);
            $(this).remove();
        });
        return false;
    })

    /** 清除全部 */
    $('#clearBtn').on('click', function() {
        History.clear();
        renderList();
    })
});