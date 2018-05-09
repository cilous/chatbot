var messageType = 'message';


function newMessage() {

    var ref = firebase.database().ref('chats/' +name);
    ref.off("value");

    messages = $(".message-input input").val();
    if ($.trim(messages) == '') {
        return false;
    }


    if(messageType == 'command'){
        if(messages == '!cancel'){

            $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ยกเลิกการบันทึกเรียบร้อย</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");
            setTimeout(function(){ messageType = 'message'; }, 300);

            var date = new Date();
            var time = date.getTime();
            var type = "receive";
            Count = Count + 1;
            var msgDocName = "msg" + Count;
            firebase.database().ref('chats/' + name).update({
                count: Count
            });

            firebase.database().ref('chats/' + name + '/' + msgDocName).set({
                message: 'ยกเลิกการบันทึกเรียบร้อย',
                time: time,
                type: type
            });

        }
        else{
            $('<li class="sent"><img src="img/male.jpg" alt="" /><p >'+messages+'</p></li>').appendTo($('.message ul'));
            setTimeout(function(){  $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">บันทึกเรียบร้อย</p></li>').appendTo($('.message ul'));
                $('.message-input input').val(null);
                $(".message").animate({scrollTop: 10000000}, "fast");}, 300);


            var date = new Date();
            var time = date.getTime();
            countTodos += 1;
            var msgDocName = "todo_name" + countTodos;
            firebase.database().ref('todos/' + name).update({
                count: countTodos
            });

            firebase.database().ref('todos/' + name + '/' + msgDocName).set({
                info: messages,
                time: time,
            });

            var type = "receive";
            Count = Count + 1;
            var msgName = "msg" + Count;
            var msgName2 = "msg" + (parseInt(Count)+1);

            firebase.database().ref('chats/' + name).update({
                count: Count
            });

            firebase.database().ref('chats/' + name + '/' + msgName).set({
                message: messages,
                time: time,
                type: 'send'
            });

            firebase.database().ref('chats/' + name).update({
                count: parseInt(Count)+1
            });

            firebase.database().ref('chats/' + name + '/' + msgName2).set({
                message: 'บันทึกเรียบร้อย',
                time: time,
                type: type
            });

            setTimeout(function(){ messageType = 'message'; }, 300);
        }

    }

    if(messageType == 'message'){
        if(messages == '!set-todo'){



            $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ป้อนสิ่งที่ต้องการบันทึก</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");

            setTimeout(function(){ messageType = 'command'; }, 300);

            var date = new Date();
            var time = date.getTime();
            var type = "receive";
            Count = Count + 1;
            var msgDocName = "msg" + Count;
            firebase.database().ref('chats/' + name).update({
                count: Count
            });

            firebase.database().ref('chats/' + name + '/' + msgDocName).set({
                message: 'ป้อนสิ่งที่ต้องการบันทึก',
                time: time,
                type: type
            });



        }
        else if(messages == '!list-todo'){

            var refToto = firebase.database().ref('todos/' +name);

            refToto.on("value", function(snapshot) {
                if(snapshot.val() != null){
                    var obj = snapshot.val();
                    var msglt = '';
                    for(var i = 1; i <= countTodos ; i++){
                        var txtmsg = obj['todo_name' + i].info;
                        msglt = msglt + '<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">' + txtmsg + '</p></li>';
                    }
                    $(msglt).appendTo($('.message ul'));
                    $('.message-input input').val(null);
                    $(".message").animate({ scrollTop: 10000000 }, "fast");

                    var date = new Date();
                    var time = date.getTime();
                    var type = "receive";
                    Count = Count + 1;
                    var msgDocName = "msg" + Count;
                    firebase.database().ref('chats/' + name).update({
                        count: Count
                    });

                    firebase.database().ref('chats/' + name + '/' + msgDocName).set({
                        message: txtmsg,
                        time: time,
                        type: type
                    });

                    refToto.off("value");
                }

            })

        }
        else if(messages == '!help'){

            $('<li class="recieve" style="margin-top : 4px; margin-bottom : 4px;"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px; margin-bottom : 0px;">รายการคำสั่ง</p></li>' +
                '<li class="recieve" style="margin-top : 4px; margin-bottom : 4px;"><img src="img/bot.png" alt="" /><p style = "margin-bottom : 0px;">!set-todo : ใช้บันทึกสิ่งที่ต้องการบันทึก</p></li>' +
                '<li class="recieve" style="margin-top : 4px; margin-bottom : 4px;"><img src="img/bot.png" alt="" /><p style = "margin-bottom : 0px;">!list-todo : แสดงรายการที่บันทึกลงไป</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");

        }
        else {
            $('<li class="sent"><img src="img/male.jpg" alt="" /><p >' + messages + '</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");

            var date = new Date();
            var time = date.getTime();
            var type = "send";
            Count = Count + 1;
            var msgDocName = "msg" + Count;
            firebase.database().ref('chats/' + name).update({
                count: Count
            });

            firebase.database().ref('chats/' + name + '/' + msgDocName).set({
                message: messages,
                time: time,
                type: type
            });
        }
    }



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
var countTodos;


function setName() {
    $(".message-input input").prop('disabled', true);
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
    countTodos = 0;

    var ref = firebase.database().ref('chats/' +name);

    var refToto = firebase.database().ref('todos/' +name);

    refToto.on("value", function(snapshot) {
        var obj = snapshot.val();
        countTodos = obj.count;
    })

    ref.on("value", function(snapshot) {
        if(snapshot.val() != null){
            var obj = snapshot.val();
            Count = obj.count;
            var msglt = '';
            for(var i = 1; i <= Count ; i++){
                var txtmsg = obj['msg' + i].message;
                var typemsg = obj['msg' + i].type;
                if(typemsg == "send"){
                    msglt = msglt + '<li class="sent"><img src="img/male.jpg" alt="" /><p>' + txtmsg + '</p></li>';
                }
                else if(typemsg == "receive"){
                    msglt = msglt + '<li class="recieve"><img src="img/bot.png" alt="" /><p>' + txtmsg + '</p></li>';
                }
            }
            $(msglt).appendTo($('.message ul'));
            $(".message").animate({ scrollTop: 10000000 }, "fast");
        }

        $(".message-input input").prop('disabled', false);
    }, function (error) {
        console.log("Error: " + error.code);
    });
}
