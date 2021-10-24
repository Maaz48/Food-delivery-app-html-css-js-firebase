$('.message a').click(function() {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
});

/////////////////////variables declare signup//////////////////////////

let username = document.getElementById("username")
let emailname = document.getElementById("emailname")
let password = document.getElementById("password")
let countryname = document.getElementById("countryname")
let cityname = document.getElementById("cityname")

/////////////////////variables declare sign in//////////////////////////

let signinemailname = document.getElementById("signinemailname")
let passwordname = document.getElementById("passwordname")


var db = firebase.firestore();

////////////////////////user name on user dashboard/////////////////

document.querySelector(".register-form").addEventListener("submit", (e) => {

    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(emailname.value, password.value)
        .then(() => {
            // Signed in 
            const user = firebase.auth().currentUser.uid;
            console.log();
            return db.collection("admin").doc("custumer").collection("user").add({
                username: username.value.toUpperCase(),
                emailname: emailname.value,
                countryname: countryname.value,
                cityname: cityname.value,
                uid: user,

            })
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            swal({
                title: "You have successfully signUp",
                // text: "You clicked the button!",
                icon: "success",
                button: "Go to dashboard!",
            }).then(() => {
                location.href = "../index.html"
            })
        })
        .catch((error) => {
            swal(error.message, "", "error");
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
})




document.querySelector(".login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(signinemailname.value, passwordname.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // console.log("Document written with ID: ", docRef.id);
            swal({
                title: "You have successfully signin",
                // text: "You clicked the button!",
                icon: "success",
                button: "Go to dashboard!",
            }).then(() => {
                location.href = "../index.html"
            });
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            swal(error.message, "", "error");

        });

})