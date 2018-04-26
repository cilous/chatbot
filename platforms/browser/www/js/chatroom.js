function newMessage() {
    messages = $(".message-input input").val();
    console.log(messages);
    if ($.trim(messages) == '') {
        return false;
    }
    $('<li class="sent"><img src="img/male.jpg" alt="" /><p>' + messages + '</p></li>').appendTo($('.message ul'));
    $('.message-input input').val(null);
    $(".message").animate({scrollTop: $(document).height()}, "fast");
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