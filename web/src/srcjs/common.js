export function showTips(str) {
    alert(str);
}

/**
 * [data ajax全局配制]
 * @type {Object}
 */
$.ajaxSetup({
    data: {
        is_ajax: true
    }
});

