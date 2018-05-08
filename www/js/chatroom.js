function newMessage() {
    messages = $(".message-input input").val();
    console.log(messages);
    if ($.trim(messages) == '') {
        return false;
    }
    $('<li class="sent"><img src="img/male.jpg" alt="" /><p>' + messages + '</p></li>').appendTo($('.message ul'));
    $('.message-input input').val(null);
    $(".message").animate({ scrollTop: 10000000 }, "fast");

    var date = new Date();
    var time = date.getTime();
    var type = "send";
    Count = Count +1;
    var msgDocName = "msg"+ Count;
    firebase.database().ref('chats/' +name).update({
      count: Count
    });

     firebase.database().ref('chats/' +name +'/' +msgDocName).set({
       message: messages,
       time: time,
       type: type
     });

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

$(".message").animate({scrollTop: 10000000 }, "fast");

var name;
var Count;

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
    console.log(name);
    $('#name').text(name);
    Count = 0;
    $(".message-input input").prop('disabled', true);
    var refCount = firebase.database().ref('chats/' +name +'/count');
    refCount.on("value", function(snapshot) {
        if(snapshot.val() != null){
          Count = snapshot.val();
        }
       $(".message-input input").prop('disabled', false);
    }, function (error) {
       console.log("Error: " + error.code);
    });
}
