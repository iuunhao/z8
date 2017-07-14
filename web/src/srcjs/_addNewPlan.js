import SYS from './_qySystem.js'
import * as u from '../srcjs/_unit.js'
import Mustache from '../libs/js/mustache.js'

const addNewPlan = {
    /**
     * [setPopPosition 根据弹窗大小判断弹窗是顶部或者垂直居中]
     */
    setPopPosition() {
        var $height = $(window).height(),
            $heightAlert = this.alertId.find('.pubPopContent').outerHeight();
        if ($height < $heightAlert) {
            this.body.addClass('hidden');
            this.alertId.find('.pubPopMain').addClass('pubPopMain--ov');
        }
    },
    /**
     * [showBodyScrollBar 显示body的滚动条]
     */
    showBodyScrollBar() {
        this.body.removeClass('hidden');
    },
    /**
     * [addNewPlanFunc 添加计划方案]
     * @param {[type]} e [description]
     */
    addNewPlanFunc(e) {
        var $button = $(e.target);
        /**
         * 防止多次点击
         */
        if (!this.addReady) return false;
        this.addReady = false;

        /**
         * [house_id description]
         * @type {[type]}
         */
        this.house_id = $button.attr('house_id') || '';

        /**
         * [status 保存当前状态编辑or添加]
         * @type {[String]}
         */
        this.status = this.house_id ? 'EDIT' : 'ADD';

        $.post('/UserHouse/gethouseinfo', {
            house_id: this.house_id
        }, (response) => {
            if (response.res == 1) {
                var info = response.info;

                this.uid = info.uid;
                this.callback_url = info.callback_url;
                /**
                 * [if 返回有id为编辑户型无id为添加户型]
                 * @param  {[String]} info.id [唯一id]
                 */
                if (info.id == undefined) {
                    info._title = '添加户型';
                    info._showHouseType = true;
                } else {
                    info._title = '编辑户型';
                    info._showHouseType = false;
                    info._checked1 = function() {
                        return this.id == info.first_city_id;
                    };
                    info._checked2 = function() {
                        return this.id == info.second_city_id;
                    };
                    info._checked3 = function() {
                        return this.id == info.city_id;
                    };
                    info._checked4 = function() {
                        return this.id == info.city_estate_id;
                    };
                }

                this.showAddHouseType(response);
            }
            this.addReady = true;
        }, 'json');
        return false;
    },
    /**
     * [showAddHouseType description]
     * @param  {[type]} response [description]
     * @param  {[type]} house_id [description]
     */
    showAddHouseType(response) {
        if (this.pop) this.pop = null;
        var render = Mustache.to_html(this.editHouseTemp, response);
        this.alertId.html(render);
        this.alertId.find('input[name=id]').val(response.info.id || '');
        this.pop = new SYS.Alert(this.alertId, {
            closeCallback: function() {
                this.showBodyScrollBar();
            }.bind(this),
            confirmCallback: function(next) {
                if (!this.checkForms()) {
                    return false;
                }
                var datas = this.alertId.find('form').serializeArray();
                $.post('/UserHouse/doHouseEditor', datas, (response) => {
                    u.showTips(response.msg);
                    if (response.res == 1) {
                        next();
                        var url = response.info.url;
                        if (url) {
                            window.location.href = url;
                        }
                    }
                });
            }.bind(this)
        });
        this.setPopPosition();
    },
    /**
     * [selects 处理select四级联动]
     */
    selects() {
        var that = this,
            /**
             * [findChild 查找下拉关联的子下拉]
             * @param  {[Object]} $select [下拉]
             * @return {[Object]}         [子元素]
             */
            findChild = function($select) {
                var childClass = $select.attr('childClass'),
                    $child = that.alertId.find(`.${childClass}`);
                return $child;
            },
            /**
             * [getSelect 获取下拉类型]
             * @param  {[Object]} $select [下拉]
             * @return {[String]}         [下拉类型]
             */
            getSelect = function($select) {
                if ($select.hasClass('provincial')) {
                    return 'PROV';
                }
                if ($select.hasClass('city')) {
                    return 'CITY';
                }
                if ($select.hasClass('county')) {
                    return 'COUNTY';
                }
                if ($select.hasClass('village')) {
                    return 'VILLAGE';
                }
                return '';
            },
            /**
             * [resetOptions 重置select]
             * @param  {[Object]} $select [需要重置的下拉]
             */
            resetOptions = function($select) {
                $select.find('option:gt(0)').remove();
            },
            /**
             * [renderHouseType 渲染户型图]
             * @param  {[Object]} response [接收到的数据]
             */
            renderHouseType = function(response) {
                var $ul = that.alertId.find('.chooseFamily'),
                    render = Mustache.to_html(that.editHouseInnerTemp, response);
                $ul.html(render);
                that.setPopPosition();
            },
            /**
             * [clearSelectHouse 清空选择户型]
             */
            clearSelectHouse = function() {
                if (that.status != 'ADD') return false;
                that.alertId.find('.chooseFamily').html('');
                that.alertId.find('.selHouseType').val('');
                that.setHouseParams();
            };

        /**
         * [选择地区]
         * @param  {[Object]} e           [Event]
         */
        this.alertId.on('change', '.selectCity select', (e) => {
            var $select = $(e.target),
                $val = $select.val(),
                $child = findChild($select),
                url = '',
                params = {},
                SELECT = getSelect($select);

            resetOptions($child);
            $child.trigger('change');

            if ($val == '') {
                return false;
            }

            if ($child.length == 0) return false;

            switch (SELECT) {
                case 'COUNTY':
                    url = '/UserHouse/getestate';
                    params = { city_id: $val };
                    break;
                case 'PROV':
                case 'CITY':
                    url = '/UserHouse/getchildcity';
                    params = { parent_id: $val };
                    break;
            }

            $.post(url, params, (response) => {
                resetOptions($child);
                if (response.res == 1) {
                    var arr = [];
                    response.info.forEach(function(item) {
                        arr.push(`<option value="${item.id}">${item.name}</option>`);
                    })
                    $child.append(arr.join(''));
                }
                clearSelectHouse();
                that.showHandEnter()
                // if (SELECT == 'COUNTY') {
                //     response.res == 1 ? that.hideHandEnter() : that.showHandEnter();
                // }
            });
            return false;
        })

        this.alertId.on('change', '.village', function() {
            if (that.status == 'EDIT') return false;
            var $val = $(this).val();
            clearSelectHouse();
            if ($val == '') {
                return false;
            }

            $.post('/UserHouse/gethousebyestate', {
                estate_id: $val
            }, (response) => {
                if (response.res == 1) {
                    renderHouseType(response);
                } else {
                    renderHouseType({ info: [] });
                    u.showTips(response.msg);
                }
            });
        })
    },
    showHandEnter() {
        var $tips = this.alertId.find('.eidt__tips--link');
        $tips.removeClass('none');
    },
    hideHandEnter() {
        var $tips = this.alertId.find('.eidt__tips--link');
        $tips.addClass('none');
        $tips.parents('li').next().addClass('none');
    },
    /**
     * [checkForms 校验表单]
     * @return {[Boolean]} [是否校验通过]
     */
    checkForms() {
        var $a = this.alertId,
            houseName = $a.find('.houseName').val(),
            houseType = $a.find('.houseType').val(),
            provincial = $a.find('.provincial').val(),
            city = $a.find('.city').val(),
            county = $a.find('.county').val(),
            village = $a.find('.village').val(),
            newHall = $a.find('.newHall').val(),
            newRoom = $a.find('.newRoom').val(),
            newToilet = $a.find('.newToilet').val(),
            newKitchen = $a.find('.newKitchen').val(),
            newRoomSize = $a.find('.newRoomSize').val();

        if (houseName.trim() == '') {
            u.showTips('请输入户型名称！');
            return false;
        }

        if (provincial == '' || city == '' || county == '') {
            u.showTips('请选择所在城市！');
            return false;
        }

        if (village == '' && houseType == '') {
            u.showTips('请选择所在小区！');
            return false;
        }

        if (
            (newRoom == '' || isNaN(newRoom)) ||
            newHall == '' || isNaN(newHall) ||
            newKitchen == '' || isNaN(newKitchen) ||
            newKitchen == '' || isNaN(newKitchen)
        ) {
            u.showTips('请填写格局！');
            return false;
        }

        if (newRoomSize == '' || isNaN(newRoomSize)) {
            u.showTips('请填写平方数！');
            return false;
        }

        return true;

    },
    checkParams() {
        var $a = this.alertId,
            houseName = $a.find('.houseName').val(),
            houseType = $a.find('.houseType').val(),
            provincial = $a.find('.provincial').val(),
            city = $a.find('.city').val(),
            county = $a.find('.county').val(),
            village = $a.find('.village').val(),
            newHall = $a.find('.newHall').val(),
            newRoom = $a.find('.newRoom').val(),
            newToilet = $a.find('.newToilet').val(),
            newKitchen = $a.find('.newKitchen').val(),
            newRoomSize = $a.find('.newRoomSize').val();

        if (houseName.trim() == '') {
            u.showTips('请输入户型名称！');
            return false;
        }

        if (provincial == '' || city == '' || county == '') {
            u.showTips('请选择所在城市！');
            return false;
        }

        if (village == '' && houseType == '') {
            u.showTips('请选择所在小区！');
            return false;
        }

        // window.location.href = ''
        window.location.href = `/define/?uid=${this.uid}&callback_url=${this.callback_url}&` + this.alertId.find('form').serialize()

        return true;
    },
    /**
     * [setHouseParams 设置选择户型参数]
     * @param {[Object]} $link [jquery对象]
     */
    setHouseParams($link) {
        if (this.status != 'ADD') return false;
        var Q = ($link && $link instanceof $),
            room = Q ? $link.attr('room') : '',
            hall = Q ? $link.attr('hall') : '',
            toilet = Q ? $link.attr('toilet') : '',
            kitchen = Q ? $link.attr('kitchen') : '',
            sumarea = Q ? $link.attr('sumarea') : '';
        this.alertId.find('.newRoom').val(room);
        this.alertId.find('.newHall').val(hall);
        this.alertId.find('.newToilet').val(toilet);
        this.alertId.find('.newKitchen').val(kitchen);
        this.alertId.find('.newRoomSize').val(sumarea);
    },
    init() {
        var that = this;

        this.uid = '';
        this.callback_url = '';

        /**
         * [获取mustache模板]
         * @param  {[String]} template [html模板]
         */
        $.get('/Public/design/js/templates/houselist.mst', (template) => {
            this.editHouseTemp = template;
        });

        /**
         * [获取mustache模板]
         * @param  {[String]} template [html模板]
         */
        $.get('/Public/design/js/templates/houselistinner.mst', (template) => {
            this.editHouseInnerTemp = template;
        });
        /**
         * [addPlanButton 添加新设计方案]
         * @type {[Object]}
         */
        this.addPlanButton = $('#addNewPlan');

        /**
         * [alertId 弹窗id]
         * @type {[Object]}
         */
        this.alertId = $('<div class="pubPopLayout none" id="addNewPlanPop"></div>');
        $('body').append(this.alertId);

        /**
         * [body body]
         * @type {[Object]}
         */
        this.body = $('body');
        /**
         * [pop 弹窗]
         * @type {[Object]}
         */
        this.pop = null;

        /**
         * [house_id 户型id]
         * @type {String}
         */
        this.house_id = '';

        /**
         * [status 当前状态编辑(EDIT)or添加(ADD)]
         * @type {String}
         */
        this.status = '';

        this.addReady = true;

        this.addPlanButton.on('click', this.addNewPlanFunc.bind(this));

        /**
         * [显示隐藏手工输入]
         */
        $(document).on('click', '#addNewPlanPop .eidt__tips--link', function() {
            $(this).parents('li').next().toggleClass('none');
        })

        /**
         * [选择户型图]
         */
        $(document).on('click', '#addNewPlanPop .chooseFamily__link', function() {
            var $this = $(this),
                type_id = $this.attr('type_id');
            $this.addClass('chooseFamily__link--active');
            $this.siblings('a').removeClass('chooseFamily__link--active');
            that.alertId.find('.selHouseType').val(type_id);
            that.setHouseParams($this);
        })

        /**
         * 编辑户型
         */
        $(document).on('click', '.editDoorModel', this.addNewPlanFunc.bind(this));


        $(document).on('click', '.blockLink', this.checkParams.bind(this));
        /**
         * 四级联动
         */
        this.selects();

    }
}
addNewPlan.init();
