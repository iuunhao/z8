require(['zepto', 'simpleTab'], function($, simpleTab) {
    
    /** tab切换 */
    $('#ctabs').simpleTab({
        btns: '.classTabs__left',
        cons: '.classTabs__right',
    })
});