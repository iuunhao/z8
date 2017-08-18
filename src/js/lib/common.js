define('common', ['jquery', 'showTips'], function($, showTips) {
    /** @type {Object} [alert, confirm] */
    $.mine = {};
    $.mine.alert = showTips.alert;
    $.mine.confirm = showTips.confirm;
    return $;
})