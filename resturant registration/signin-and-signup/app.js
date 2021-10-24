var db = firebase.firestore();
// =========================SIGNIN DETAILS========================
const signinEmail = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");
const signin = document.getElementById("signin")





// =========================SIGNUP DETAILS========================
const resturantName = document.getElementById("resturantName")
const signupEmail = document.getElementById("signupEmail")
const signupPassword = document.getElementById("signupPassword")
const country = document.getElementById("country")
const city = document.getElementById("city")
const signup = document.getElementById("signup")


const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");



// ============================moving signin to signUp========================
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});




// ============================signup AUTH========================
signup.addEventListener("submit", (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(signupEmail.value, signupPassword.value)
        .then(() => {
            console.log("maaz")
            const user = firebase.auth().currentUser.uid;
            return db.collection("admin").doc("resturant").collection("user").add({
                resturantName: resturantName.value,
                countryName: country.value,
                cityName: city.value,
                email: signupEmail.value,
                uid: user,
            })
        })
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            swal({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success",
                button: "Aww yiss!",
            }).then(() => {
                function asd() {
                    location.href = "../index.html"
                }
                asd()
            })

            // ...
        })
        .catch((error) => {
            swal(error.message, "", "warning");
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
})

// ============================signup AUTH end========================



// ============================signin AUTH start========================

signin.addEventListener('submit', (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(signinEmail.value, signinPassword.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            swal({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success",
                button: "Aww yiss!",
            }).then(() => {
                location.href = "../index.html"
            })
            // ...
        })
        .catch((error) => {
            swal(error.message, "", "warning");
            var errorCode = error.code;
            var errorMessage = error.message;
        });
})

// ============================signin AUTH end========================