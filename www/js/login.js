$('#login').on('click', async function(){
    console.log("click")
    username = $('#username').val() + "@mail.com"
    password = "password"
    firebase.auth().signInWithEmailAndPassword(username.toString() , password ).catch(function (error){
        console.log("ข้อความนี้ควรขึ้นทีหลัง")
        var errorCode = error.errorCode
        var errorMessage = error.message
        console.log("login failed")
        alert(errorMessage)
        // สร้าง user ใหม่ใน database
    })
    console.log("ข้อความนี้ควรขึ้นทีหลัง")
    console.log("login success")
    window.location = "chatroom.html"
    // ทำการดึงข้อมูลใน database
})

// หาวิธีดักจับแยกให้ออก ระหว่าง user ที่มีใน database และ ไม่มีใน database
// ถ้าไม่มีจะเข้า catch ด้านบน แต่ถ้ามีจะวิ่งผ่านมาเลย
// ประเด็นคือ ถ้าไม่มีแล้วโดน catch มันจะทำบรรทัดล่างก่อน ไม่ยอมรอข้างบนจนเสร็จ

