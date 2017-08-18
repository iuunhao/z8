define(function() {
    var G = {
        alert: function(str) {
            alert(str);
        },
        confirm: function(str) {
            return confirm(str);
        }
    };
    return G
});