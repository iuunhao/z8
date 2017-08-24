require(['common'], function($) {
    var s = $.mine,
        publish = {
            checkForm: function() {
                
            },
            /** [publishHandler 发布] */
            publishHandler: function() {
                if(!this.checkForm()) return false;
                
            },
            init: function() {
                this.btnPublish = $('#btnPublish');
                this.btnPublish.on('click', this.publishHandler.bind(this));
            }
        };

    publish.init();

})