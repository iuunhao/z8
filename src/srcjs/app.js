$(document).ready(function() {
	$('#z8').fullpage({
        continuousVertical: true,
        afterLoad: function(){
            console.log($(this).addClass('active'));
        }
    });
});
