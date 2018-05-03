function newMessage() {
    messages = $(".message-input input").val();
    console.log(messages);
    if ($.trim(messages) == '') {
        return false;
    }
    $('<li class="sent"><img src="img/male.jpg" alt="" /><p>' + messages + '</p></li>').appendTo($('.message ul'));
    $('.message-input input').val(null);
    $(".message").animate({ scrollTop: $(document).height() }, "fast");
};

$('.submit').click(function () {
    newMessage();
});

$(window).on('keydown', function (e) {
    if (e.which == 13) {
        newMessage();
        return false;
    }
});

$(".message").animate({scrollTop: $(document).height()}, "fast");

var name;

function setName() {
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    for (var i = 0; i < parms.length; i++) {
        var pos = parms[i].indexOf('=');
        if (pos > 0) {
            var key = parms[i].substring(0, pos);
            var val = parms[i].substring(pos + 1);
            name = val;
        }
    }
    console.log(name)    
    $('#name').text(name);
}

