require(['zepto', 'showTips'], function($, showTips) {
    var createDiary = {
        /**
         * [showTips alert]
         * @type {[Function]}
         */
        showTips: showTips,
        /**
         * [createDiaryHandler 创建日记]
         */
        createDiaryHandler: function() {
            var $name = this.diaryName.val().trim();

            if($name == '') {
                this.showTips('请输入日记名称');
                return false;
            }

            $.post('/', {
                name: $name
            }, function(response) {
                if(response.res == 1) {
                    var url = response.data.url;
                    if(url) window.location.href = url;
                } else {
                    this.showTips(response.msg);
                }
            }, 'json');
        },
        init: function() {
            /**
             * [btnCreate 创建按钮]
             */
            this.btnCreate = $('#btnCreate');
            this.btnCreate.on('click', this.createDiaryHandler.bind(this));

            /**
             * [diaryName 日记名称]
             */
            this.diaryName = $('#diaryName');
        }
    };
    createDiary.init();
});
