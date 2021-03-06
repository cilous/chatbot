
function writeUserData(uid,name) {
  firebase.database().ref('users/' +name).set({
    uid : uid
  });
}



$('#login').on('click', async function(){
    console.log("click")
    username = $('#username').val() + "@mail.com"
    password = "password"
    firebase.auth().signInWithEmailAndPassword(username.toString() , password ).catch(function (error){
        var errorCode = error.errorCode
        var errorMessage = error.message
        console.log("login failed")
        // alert(errorMessage)
        // สร้าง user ใหม่ใน database
        firebase.auth().createUserWithEmailAndPassword(username.toString(), password ).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
        var uid = firebase.auth().currentUser.uid
        writeUserData(uid,$('#username').val());
    })
    console.log("login success");
    window.location = 'chatroom.html?name=' + $('#username').val();

    // ทำการดึงข้อมูลใน database
})

// หาวิธีดักจับแยกให้ออก ระหว่าง user ที่มีใน database และ ไม่มีใน database
// ถ้าไม่มีจะเข้า catch ด้านบน แต่ถ้ามีจะวิ่งผ่านมาเลย
// ประเด็นคือ ถ้าไม่มีแล้วโดน catch มันจะทำบรรทัดล่างก่อน ไม่ยอมรอข้างบนจนเสร็จ
