import SYS from './_qySystem.js'
import './_zelect.js'
import * as u from '../srcjs/_unit.js'
import Mustache from '../libs/js/mustache.js'

const addNewPlan = {
    checkNewName() {
        var $val = this.newName.val();
        if ($val.trim() == '') {
            u.showTips('请输入户型名称');
            return false;
        }
        return true;
    },
    checkNewRoom() {
        var $val = this.newRoom.val().trim();
        if ($val == '') {
            u.showTips('请输入房间为几室');
            return false;
        } else {
            if (!/^\d+$/.test($val)) {
                u.showTips('几室请入数字');
                return false;
            }
        }
        return true;
    },
    checkNewHall() {
        var $val = this.newHall.val().trim();
        if ($val == '') {
            u.showTips('请输入房间为几厅');
            return false;
        } else {
            if (!/^\d+$/.test($val)) {
                u.showTips('客厅请入数字');
                return false;
            }
        }
        return true;
    },
    checkNewToilet() {
        var $val = this.newToilet.val().trim();
        if ($val == '') {
            u.showTips('请输入房间为几卫');
            return false;
        } else {
            if (!/^\d+$/.test($val)) {
                u.showTips('卫生间请入数字');
                return false;
            }
        }
        return true;
    },
    checkNewKitchen() {
        var $val = this.newKitchen.val().trim();
        if ($val == '') {
            u.showTips('请输入房间为几厨');
            return false;
        } else {
            if (!/^\d+$/.test($val)) {
                u.showTips('厨房请入数字');
                return false;
            }
        }
        return true;
    },
    checkNewRoomSize() {
        var $val = this.newRoomSize.val().trim();
        if ($val == '') {
            u.showTips('请输入房间平方数');
            return false;
        } else {
            if (!/^\d+$/.test($val)) {
                u.showTips('平方数请入数字');
                return false;
            }
        }
        return true;
    },
    setPopHeight() {
        var $height = $(window).height(),
            $heightAlert = this.alertId.find('.pubPopContent').height();
        if ($height < $heightAlert) {
            this.body.addClass('hidden');
            this.alertId.find('.pubPopMain').addClass('pubPopMain--ov');
        }
    },
    resetBodyClass() {
        this.body.removeClass('hidden');
    },
    addNewPlanHandler($button) {
        if (this.pop) {
            this.pop = null;
        }

        var data = {
            info: {
                title: '添加用户信息',
                name: '',
                room: 3,
                hall: 3,
                toilet: 3,
                showType: true,
                kitchen: 3,
                size: 150
            }
        };

        this.addNewPlanPopInner.html(Mustache.to_html(this.editHouseTemp, data));

        this.pop = new SYS.Alert(this.alertId, {
            closeCallback: function() {
                this.resetBodyClass();
            }.bind(this),
            confirmCallback: function(next) {
                next();
            }.bind(this)
        });
        this.setPopHeight();

        
        this.linkage();
    },
    linkage() {
        this.provincial = this.alertId.find('.provincial');
        this.city = this.alertId.find('.city');
        this.county = this.alertId.find('.county');
        this.village = this.alertId.find('.village');

        this.provincial.zelect().on('change', function() {
            console.log($(this).val())
        })

        this.city.zelect().on('change', function() {
            console.log($(this).val())
        })

        this.county.zelect().on('change', function() {
            console.log($(this).val())
        })
        
        this.village.zelect().on('change', function() {
            console.log($(this).val())
        })
    },
    init() {
        var that = this;
        /**
         * [houseTypeTmp 户型图模板]
         * @type {[type]}
         */
        this.addNewPlanPopInner = $('#addNewPlanPopInner');
        /**
         * [editHouseTemp 户型模板]
         * @type {[type]}
         */
        this.editHouseTemp = $('#editHouseTemp').html();

        
        /**
         * [addPlan 添加新设计方案]
         * @type {[Object]}
         */
        this.addPlan = $('#addNewPlan');
        /**
         * [alertId 弹窗id]
         * @type {[Object]}
         */
        this.alertId = $('#addNewPlanPop');
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
         * [cname 请输入户型名称]
         * @type {[Object]}
         */
        this.newName = $('.newName');
        this.newRoomSize = $('.newRoomSize');
        this.newRoom = $('.newRoom');
        this.newHall = $('.newHall');
        this.newToilet = $('.newToilet');
        this.newKitchen = $('.newKitchen');


        

        this.addPlan.on('click', function() {
            var $this = $(this);
            that.addNewPlanHandler($this);
        });
    }
}
addNewPlan.init();
