var messageType = 'message';


function newMessage() {

    var ref = firebase.database().ref('chats/' +name);
    ref.off("value");

    messages = $(".message-input input").val();
    if ($.trim(messages) == '') {
        return false;
    }

    if(messageType == 'uncheck'){
      if(messages == '!cancel'){
          $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ยกเลิกคำสั่งยกเลิกขีดค่าเรียบร้อยแล้ว</p></li>').appendTo($('.message ul'));
          $('.message-input input').val(null);
          $(".message").animate({scrollTop: 10000000}, "fast");
          setTimeout(function(){ messageType = 'message'; }, 300);
          var msg = 'ยกเลิกคำสั่งยกเลิกขีดค่าเรียบร้อยแล้ว';
          var type = "receive";
          var check = "no";
          writeMsg(name,msg,type,check);

      }
      else {
        $('<li class="sent"><img src="img/male.jpg" alt="" /><p >'+messages+'</p></li>').appendTo($('.message ul'));
        setTimeout(function(){  $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ยกเลิกขีดค่าเรียบร้อย</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");}, 300);


        var type = "receive";

        writeMsg(name,messages,type,'no');
        writeMsg(name,'ยกเลิกขีดค่าเรียบร้อย',type,'no');

        setTimeout(function(){ messageType = 'message'; }, 300);
        firebase.database().ref('todos/' + name + "/todo_name" + Number(messages)).update({
            check: 'no'
        });

      }
    }

    if(messageType == 'check'){
      if(messages == '!cancel'){
          $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ยกเลิกคำสั่งขีดค่าเรียบร้อยแล้ว</p></li>').appendTo($('.message ul'));
          $('.message-input input').val(null);
          $(".message").animate({scrollTop: 10000000}, "fast");
          setTimeout(function(){ messageType = 'message'; }, 300);
          var msg = 'ยกเลิกคำสั่งขีดค่าเรียบร้อยแล้ว';
          var type = "receive";
          var check = "no";
          writeMsg(name,msg,type,check);

      }
      else {
        $('<li class="sent"><img src="img/male.jpg" alt="" /><p >'+messages+'</p></li>').appendTo($('.message ul'));
        setTimeout(function(){  $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ขีดค่าเรียบร้อย</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");}, 300);


        var type = "receive";

        writeMsg(name,messages,type,'no');
        writeMsg(name,'ขีดค่าเรียบร้อย',type,'no');

        setTimeout(function(){ messageType = 'message'; }, 300);
        firebase.database().ref('todos/' + name + "/todo_name" + Number(messages)).update({
            check: 'yes'
        });

      }
    }

    if(messageType == 'remove'){
      if(messages == '!cancel'){
          $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ยกเลิกคำสั่งลบเรียบร้อยแล้ว</p></li>').appendTo($('.message ul'));
          $('.message-input input').val(null);
          $(".message").animate({scrollTop: 10000000}, "fast");
          setTimeout(function(){ messageType = 'message'; }, 300);
          var msg = 'ยกเลิกคำสั่งลบเรียบร้อยแล้ว';
          var type = "receive";
          var check = "no";
          writeMsg(name,msg,type,check);

      }
      else {
        $('<li class="sent"><img src="img/male.jpg" alt="" /><p >'+messages+'</p></li>').appendTo($('.message ul'));
        setTimeout(function(){  $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ลบเรียบร้อย</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");}, 300);


        var type = "receive";

        writeMsg(name,messages,type,'no');
        writeMsg(name,'ลบเรียบร้อย',type,'no');

        setTimeout(function(){ messageType = 'message'; }, 300);
        var refToto = firebase.database().ref('todos/' +name);
        refToto.once("value", function(snapshot) {
            if(snapshot.val() != null){
                var obj = snapshot.val();
                var c = obj.count;
                countTodos = 0;
                for(var i = 1; i <= c ; i++){
                  if(i != Number(messages)){
                    console.log('write on '+i);
                    writeTodo(name,obj['todo_name' + i].info,obj['todo_name' + i].check)
                  }
                }
                firebase.database().ref('todos/' + name +"/todo_name" +c).remove();
                countTodos = c-1;
            }
        });
      }
    }

    if(messageType == 'command'){
        if(messages == '!cancel'){

            $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ยกเลิกการบันทึกเรียบร้อย</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");
            setTimeout(function(){ messageType = 'message'; }, 300);
            var msg = 'ยกเลิกการบันทึกเรียบร้อย';
            var type = "receive";
            var check = "no";
            writeMsg(name,msg,type,check);

        }
        else{
            $('<li class="sent"><img src="img/male.jpg" alt="" /><p >'+messages+'</p></li>').appendTo($('.message ul'));
            setTimeout(function(){  $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">บันทึกเรียบร้อย</p></li>').appendTo($('.message ul'));
                $('.message-input input').val(null);
                $(".message").animate({scrollTop: 10000000}, "fast");}, 300);

            writeTodo(name,messages,'no');

            var type = "receive";

            writeMsg(name,messages,type,'no');
            writeMsg(name,'บันทึกเรียบร้อย',type,'no');

            setTimeout(function(){ messageType = 'message'; }, 300);
        }

    }

    if(messageType == 'message'){
        $('<li class="sent"><img src="img/male.jpg" alt="" /><p >' + messages + '</p></li>').appendTo($('.message ul'));
        $('.message-input input').val(null);
        $(".message").animate({scrollTop: 10000000}, "fast");

        writeMsg(name,messages,'send','no');

        if(messages == '!set-todo'){

            $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ป้อนสิ่งที่ต้องการบันทึก</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");

            setTimeout(function(){ messageType = 'command'; }, 300);

            writeMsg(name,'ป้อนสิ่งที่ต้องการบันทึก','receive','no');

        }
        else if(messages == '!list-todo'){

            var refToto = firebase.database().ref('todos/' +name);

            refToto.once("value", function(snapshot) {
                if(snapshot.val() != null){
                    var obj = snapshot.val();
                    var msglt = '';
                    for(var i = 1; i <= countTodos ; i++){
                        var txtmsg = obj['todo_name' + i].info + " (" + i +")";
                        var check = obj['todo_name' + i].check;
                        if(check == null){
                          check = 'no';
                        }
                        if(check == 'yes'){
                          msglt = msglt + '<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px; text-decoration: line-through;">' + txtmsg + '</p></li>';
                        }
                        else {
                          msglt = msglt + '<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">' + txtmsg + '</p></li>';
                        }
                        writeMsg(name,txtmsg,'receive',check);
                    }
                    $(msglt).appendTo($('.message ul'));
                    $('.message-input input').val(null);
                    $(".message").animate({ scrollTop: 10000000 }, "fast");

                }
              if(countTodos == 0){
                var txtmsg = "ไม่มีรายการที่บันทึก";
                var msglt = '<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">' + txtmsg + '</p></li>';
                writeMsg(name,txtmsg,'receive','no');
                $(msglt).appendTo($('.message ul'));
                $('.message-input input').val(null);
                $(".message").animate({ scrollTop: 10000000 }, "fast");


              }

            });

        }

        else if(messages == '!list-clear'){
            firebase.database().ref('todos/' + name).set({
              count: 0
            });
            $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ลบรายการทั้งหมดเรียบร้อยแล้ว</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");
            countTodos = 0;
            writeMsg(name,'ลบรายการทั้งหมดเรียบร้อยแล้ว','receive','no');
        }

        else if(messages == '!chat-clear'){
            firebase.database().ref('chats/' + name).set({
              count: 0
            });
            Count = 0;
            location.reload();
        }

        else if(messages == '!remove-todo'){

            $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ป้อนตัวเลขของรายการที่ต้องการลบ</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");

            setTimeout(function(){ messageType = 'remove'; }, 300);

            writeMsg(name,'ป้อนตัวเลขของรายการที่ต้องการลบ','receive','no');

        }

        else if(messages == '!check-todo'){

            $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ป้อนตัวเลขของรายการที่ต้องการขีดค่า</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");

            setTimeout(function(){ messageType = 'check'; }, 300);

            writeMsg(name,'ป้อนตัวเลขของรายการที่ต้องการขีดค่า','receive','no');

        }

        else if(messages == '!uncheck-todo'){

            $('<li class="recieve"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px;">ป้อนตัวเลขของรายการที่ต้องการยกเลิกขีดค่า</p></li>').appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");

            setTimeout(function(){ messageType = 'uncheck'; }, 300);

            writeMsg(name,'ป้อนตัวเลขของรายการที่ต้องการยกเลิกขีดค่า','receive','no');

        }


        else if(messages == '!help'){
          var helplist = '<li class="recieve" style="margin-top : 4px; margin-bottom : 4px;"><img src="img/bot.png" alt="" /><p style = "margin-top : 4px; margin-bottom : 0px;">รายการคำสั่ง</p></li>' +
              '<li class="recieve" style="margin-top : 4px; margin-bottom : 4px;"><img src="img/bot.png" alt="" /><p style = "margin-bottom : 0px;">!set-todo : ใช้บันทึกสิ่งที่ต้องการบันทึก</p></li>' +
              '<li class="recieve" style="margin-top : 4px; margin-bottom : 4px;"><img src="img/bot.png" alt="" /><p style = "margin-bottom : 0px;">!list-todo : แสดงรายการที่บันทึกลงไป</p></li>' +
             '<li class="recieve" style="margin-top : 4px; margin-bottom : 4px;"><img src="img/bot.png" alt="" /><p style = "margin-bottom : 0px;">!list-clear : ลบรายการที่บันทึกลงไปทั้งหมด</p></li>' +
            '<li class="recieve" style="margin-top : 4px; margin-bottom : 4px;"><img src="img/bot.png" alt="" /><p style = "margin-bottom : 0px;">!chat-clear : ลบประวัติแชททั้งหมด</p></li>' +
            '<li class="recieve" style="margin-top : 4px; margin-bottom : 4px;"><img src="img/bot.png" alt="" /><p style = "margin-bottom : 0px;">!remove-todo : ลบรายการที่บันทึก (ระบุหมายเลขหลังจากพิมส่งคำสั่งไปแล้ว)</p></li>' +
            '<li class="recieve" style="margin-top : 4px; margin-bottom : 4px;"><img src="img/bot.png" alt="" /><p style = "margin-bottom : 0px;">!check-todo : ขีดค่ารายการที่บันทึก (ระบุหมายเลขหลังจากพิมส่งคำสั่งไปแล้ว)</p></li>' +
            '<li class="recieve" style="margin-top : 4px; margin-bottom : 4px;"><img src="img/bot.png" alt="" /><p style = "margin-bottom : 0px;">!uncheck-todo : ขีดค่ารายการที่บันทึก (ระบุหมายเลขหลังจากพิมส่งคำสั่งไปแล้ว)</p></li>';

            $(helplist).appendTo($('.message ul'));
            $('.message-input input').val(null);
            $(".message").animate({scrollTop: 10000000}, "fast");
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

function onclickmsg(){
  $(".message").animate({scrollTop: 10000000}, "fast");
}


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

    refToto.once("value", function(snapshot) {
      if(snapshot.val() != null){
        var obj = snapshot.val();
        countTodos = obj.count;
      }
    })

    ref.once("value", function(snapshot) {
        if(snapshot.val() != null){
            var obj = snapshot.val();
            Count = obj.count;
            var msglt = '';
            for(var i = 1; i <= Count ; i++){
                var txtmsg = obj['msg' + i].message;
                var typemsg = obj['msg' + i].type;
                var checkmsg = obj['msg' + i].check;
                if(typemsg == "send"){
                    msglt = msglt + '<li class="sent"><img src="img/male.jpg" alt="" /><p>' + txtmsg + '</p></li>';
                }
                else if(typemsg == "receive"){
                  if(checkmsg == "yes"){
                    msglt = msglt + '<li class="recieve"><img src="img/bot.png" alt=""/><p style = "text-decoration: line-through;">' + txtmsg + '</p></li>';
                  }
                  else{
                    msglt = msglt + '<li class="recieve"><img src="img/bot.png" alt="" /><p>' + txtmsg + '</p></li>';
                  }

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

function writeMsg(name,msg,type,check){
  var date = new Date();
  var time = date.getTime();
  Count = Count + 1;
  var msgDocName = "msg" + Count;
  firebase.database().ref('chats/' + name).update({
      count: Count
  });

  firebase.database().ref('chats/' + name + '/' + msgDocName).set({
      message: msg,
      time: time,
      type: type,
      check: check
  });
}

function writeTodo(name,msg,check){
  var date = new Date();
  var time = date.getTime();
  countTodos += 1;
  var msgDocName = "todo_name" + countTodos;
  firebase.database().ref('todos/' + name).update({
      count: countTodos
  });

  firebase.database().ref('todos/' + name + '/' + msgDocName).set({
      info: msg,
      time: time,
      check: check
  });
}
