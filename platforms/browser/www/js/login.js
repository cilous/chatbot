$('#login').on('click', async function(){
    console.log("click")
    username = $('#username').val() + "@mail.com"
    password = "password"
    firebase.auth().signInWithEmailAndPassword(username.toString() , password ).catch(function (error){
        console.log("catch")        
        var errorCode = error.errorCode
        var errorMessage = error.message
        alert(errorMessage);
    },function (){
        console.log("not catch")
    })
})

function validateLogin(status1, status2) {

}
