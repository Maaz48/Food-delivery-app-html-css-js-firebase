///////////////////navbar scroll effect///////////////
window.addEventListener("scroll", () => {
    var navbar = document.getElementById("navbar")
    navbar.classList.toggle("stickyMaaz", window.scrollY > 0)
})

// ................call data for every user........................
var db = firebase.firestore()

window.addEventListener("load", function() {
    firebase.auth().onAuthStateChanged((user) => {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // var uid = user.uid;
        db.collection("resturants").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                console.log("ho gya")
                var getitemName = doc.data().itemnameValue.toUpperCase()
                var getdelivery = doc.data().deliveryaa
                var getcategory = doc.data().categoryaa
                var getURL = doc.data().url
                var getprice = doc.data().priceValue
                var docId = doc.id;

                rowa.innerHTML += `
						<div class="col-lg-4 col-sm-6 my-2" data-id="${docId}">
							<div class="trainer-item">
								<div class="image-thumb">
									<img src="${getURL}" alt="">
								</div>
								<div class="down-content">
									<spanPRICE :${getprice}</span>
									<h4 class="getitemName">DISH :${getitemName}</h4>
									<p>CATEGORY :${getcategory}</p>
									<p>DELIVERY :${getdelivery}</p>
								</div>
								<button type="button" class="btn btn-lg btn-block delete" onclick="addToCart(this)">ORDER NOW</button>
							</div> 
						</div>`
            })
        });
    });
})




// ===================display resturant name==============
window.addEventListener('load', getResturantName())

function getResturantName() {

    db.collection("admin").doc("resturant").collection("user").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log("resturant name has been print in bootstrap card")
            // console.log(`${doc.id} => ${doc.data()}`);
            createResturantCard(doc)
        });
    });
}



function createResturantCard(doc) {
    const resturantName = doc.data().resturantName;
    const countryName = doc.data().countryName;
    const cityName = doc.data().cityName;
    const email = doc.data().email;
    const uid = doc.data().uid;


    document.getElementById("resturantCards").innerHTML += `
	<div class="col-lg-4 col-sm-6 my-3" id="${uid}">
    	<div class="card cardBorder">
			<div class="card-header delete m-3">
				${resturantName.toUpperCase()}
			</div>
			<div class="card-body">
				<h6 class="card-title">COUNTRY NAME : ${countryName}</h6>
				<h6 class="card-title">CITY NAME : ${cityName}</h6>
				<p class="card-text my-1">EMAIL ADDRESS : ${email}</p>
				<button onclick="filterItemsByResturant(this)" class="btn btn-lg btn-block delete getClass"  data-toggle="modal" data-target="#myModal">OUR DISHES</button>
			</div>
		</div>
	</div>`
}
/////////////////////print user name in filter modal////////////////

function modalFilterResturant(doc, filterRestuantDishes) {
    let resturantPersonName = document.getElementById("resturantPersonName")
    db.collection("admin").doc("resturant").collection("user").where("uid", "==", filterRestuantDishes)
        .onSnapshot((querySnapshot) => {
            // var cities = [];
            querySnapshot.forEach((doc) => {
                // cities.push(doc.data().name);
                let resturantNameForHeader = doc.data().resturantName;

                resturantPersonName.innerText = resturantNameForHeader.toUpperCase();
            });
            // console.log("Current cities in CA: ", cities.join(", "));
        });
    console.log("resturant filter ho gy hain", resturantPersonName);
}



///////////////////display filter dishes in filter modal//////////////
function filterItemsByResturant(btn) {
    let filterRestuantDishes = btn.parentElement.parentElement.parentElement.getAttribute("id");
    console.log(filterRestuantDishes);
    db.collection("resturants").where("uid", "==", filterRestuantDishes)
        .onSnapshot((querySnapshot) => {
            // var dishes = [];
            querySnapshot.forEach((doc) => {
                modalFilterResturant(doc, filterRestuantDishes)
                console.log(doc.data().itemnameValue);
                let modalBodyFilterCards = document.getElementById("modalBodyFilterCards")
                const dishname = doc.data().itemnameValue.toUpperCase()
                const delivery = doc.data().deliveryaa
                const categoryitem = doc.data().categoryaa
                const image = doc.data().url
                const price = doc.data().priceValue
                const uida = doc.id;
                modalBodyFilterCards.innerHTML += `
						<div class="col-lg-6  my-2" data-id="${uida}">
							<div class="trainer-item">
								<div class="image-thumb">
									<img src="${image}" alt="">
								</div>
								<div class="down-content">
									<spanPRICE :${price}</span>
									<h4 class="getitemName">DISH :${dishname}</h4>
									<p>CATEGORY :${categoryitem}</p>
									<p>DELIVERY :${delivery}</p>
								</div>
									<button type="button" class="btn btn-lg btn-block delete" onclick="addToCart(this)">ORDER NOW</button>
							</div> 
						</div>`


            });
            // console.log("Current dishes are: ", dishes.join(", "));
        });
}


///////////////////empty modal when user click on another filter button//////////////


function emptyModal() {
    let modalBodyFilterCards = document.getElementById("modalBodyFilterCards")
    modalBodyFilterCards.innerHTML = "";
}

//////////////////////////   add to cart ////////////////////////


function addToCart(btn) {

    let getparentId = btn.parentElement.parentElement.getAttribute("data-id");
    console.log(getparentId);
    db.collection("resturants").doc(getparentId)
        .onSnapshot((doc) => {
            console.log("Current data: ", doc.data());

            const dishname = doc.data().itemnameValue.toUpperCase()
            const delivery = doc.data().deliveryaa
            const categoryitem = doc.data().categoryaa
            const image = doc.data().url
            const price = doc.data().priceValue
            const uida = doc.id;
            const uid = doc.data().uid;
            console.log(uid);
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    swal("Please Check Your Cart", "");

                    var uid = user.uid;
                    // ...
                    document.getElementById("addToCartPage").innerHTML += `
					<div class="card col-md-5 col-12 my-2 addTocart" data-id=${uida}>
 						 <img class="card-img-top cartImage" src="${image}" alt="Card image cap">
 						 <div class="card-body">
    							<h6 class="card-title my-2">DISH :${dishname} <br>CATEGORY :${categoryitem} <br>DELIVERY TYPE :${delivery}</h6>
   								<h6 class="card-text my-1">${price}</h6>
								<p class="card-text my-1"><input id="inputSubmit" type="number" min="1" max="10" value="1" ></input></p>
								<button  type="button" class="btn orderNowBTN my-2" onclick="removeOrder(this)">Remove</button>
    							<button onclick="orders(this),orderNowAlert()" type="button" class="btn orderNowBTN">Order</button>
  						 </div>
					</div>`
                } else {
                    // User is signed out
                    // ...
                    let btnorder = document.getElementById("logindata")
                    console.log("login ho kar aa bey")
                    if (btnorder.clicked == true) {
                        // swal("Please signin first!", "", "info");
                    } else {

                        swal("Please signin first!", "", "info");
                    }

                }
            });


        });
}

// <div class="row my-5 addTOcartOredrs" data-id=${uida}>
// 						<div class="col-2 text-center"><img class="cartImg" src="${image}" /></div>
// 						<div class="col-3 text-center" style="font-size: 14px;">DISH :${dishname} <br>CATEGORY :${categoryitem} <br>DELIVERY TYPE :${delivery}</div>
// 						<div class="col-1 text-center d-flex justify-content-center align-items-center">${price}</div>
// 						<div class="col-2 text-center d-flex justify-content-center align-items-center"><input id="inputSubmit" type="number" min="1" max="10" value="1" ></input></div>
// 						<div class="col-2 text-center d-flex justify-content-center align-items-center"><button  type="button" class="btn orderNowBTN" onclick="removeOrder(this)">Remove</button></div>
// 						<div class="col-2 text-center d-flex justify-content-center align-items-center"><button onclick="orders(this)" type="button" class="btn orderNowBTN">Order</button></div>
// 					</div>



/////////////////////////get data from add to cart and store in firebase firestore//////////////////
function orders(btn) {
    let inputSubmit = document.getElementById("inputSubmit")
    let quantity = inputSubmit.value;



    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const currentUSerUid = user.uid;
            console.log(currentUSerUid)

            let ordersId = btn.parentElement.parentElement.getAttribute("data-id");
            console.log(ordersId);
            db.collection("resturants").doc(ordersId)
                .onSnapshot((doc) => {
                    // console.log("Current data: ", doc.data());
                    const dishname = doc.data().itemnameValue.toUpperCase()
                    const delivery = doc.data().deliveryaa
                    const categoryitem = doc.data().categoryaa
                    const image = doc.data().url
                    const price = doc.data().priceValue
                    const uida = doc.id;
                    const resturantuid = doc.data().uid;

                    /////////////storing data to firestore////////////////
                    db.collection("orders").add({
                            dishname,
                            delivery,
                            categoryitem,
                            image,
                            price,
                            documentId: doc.id,
                            quantity,
                            resturantuid,
                            status: "Pending",
                            currentUSerUid,
                        })
                        .then((docRef) => {
                            console.log("Document written with ID: ", docRef.id);
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });


                });



            // ...
        } else {
            // User is signed out
            // ...
        }
    });



}
/////////////////// remove orders from add to cart////////////////////// 
function removeOrder(btn) {
    btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode)
}


///////////// function for alert when user click on order now ///////////////
function orderNowAlert() {
    swal("Your order has been submitted", "Please check your Order Status", "success");

}
////////////////user conditions if user is online//////////////////////


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let orderStatusForUser = document.getElementById("orderStatusForUser")
        orderStatusForUser.style.display = "block"
        var uid = user.uid;
        let onlineUserName = document.getElementById("onlineUserName")
        console.log(uid)
        let logindata = document.getElementById("logindata")
        logindata.style.display = "block"
        let offlinedata = document.getElementById("offlinedata")
        offlinedata.style.display = "none"
        /////////////////get sing in user name and other information//////////////
        db.collection("admin").doc("resturant").collection("user").where("uid", "==", uid).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data()}`);
                    console.log("maaz");
                    let onlineUserName = document.getElementById("onlineUserName")
                    onlineUserName.innerText = "WELCOME  TO  FOOD  HOUSE " + " " + " " + doc.data().resturantName.toUpperCase()
                });
            });
        if (onlineUserName.innerText == "") {


            db.collection("admin").doc("custumer").collection("user").where("uid", "==", uid).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(`${doc.id} => ${doc.data()}`);
                        console.log("maaz");
                        let onlineUserName = document.getElementById("onlineUserName")
                        onlineUserName.innerText = "WELCOME TO FOOD HOUSE " + " " + doc.data().username.toUpperCase()
                    });
                });


        }

    } else {
        // User is signed out
        // ...
        const onlineUserName = document.getElementById("onlineUserName")
        onlineUserName.innerText = "WELCOME TO FOOD HOUSE"
    }
});


///////////////////user logging out///////////////////
document.getElementById("logindata").addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
})





/////////////////// get pending orders which are not accepted by seller /////////////////
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("orderStatus").style.display = "inline-block";
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        db.collection("orders").where("currentUSerUid", "==", uid).where("status", "==", "Pending")
            .onSnapshot((querySnapshot) => {
                // var cities = [];
                document.getElementById("pendinga").innerHTML = ""
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    // cities.push(doc.data().name);
                    let imageofpendingOrder = doc.data().image
                    let dishnameofpendingOrder = doc.data().dishname
                    let quantityofpendingOrder = doc.data().quantity
                    let orderNoofpendingOrder = doc.id;
                    document.getElementById("pendinga").innerHTML += `
                <div class="card col-lg-4 col-md-6 my-3" style="width: 18rem;" data-id="${orderNoofpendingOrder}">
                    <img class="card-img-top cardimg" src="${imageofpendingOrder}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">Dish Name: ${dishnameofpendingOrder}</h5>
                      <p class="card-text">Quantity: ${quantityofpendingOrder}</p>
                      <p class="card-text">Order No:${orderNoofpendingOrder}</p>
                  </div>
                `

                });
                // console.log("Current cities in CA: ", cities.join(", "));
            });
        // ...
    } else {
        // User is signed out
        // ...
    }
});

////////////////////////////// GET ALL ORDER ACCEPTED HERE///////////////

// window.addEventListener("load", displayAcceptedOrder())
// function displayAcceptedOrder() {


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        let accept = "Accepted";
        db.collection("orders").where("currentUSerUid", "==", uid).where("status", "==", accept)
            .onSnapshot((querySnapshot) => {
                // var cities = [];
                document.getElementById("accepteda").innerHTML = "";
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    // cities.push(doc.data().name);
                    let imageofpendingOrder = doc.data().image
                    let dishnameofpendingOrder = doc.data().dishname
                    let quantityofpendingOrder = doc.data().quantity
                    let orderNoofpendingOrder = doc.id;
                    document.getElementById("accepteda").innerHTML += `
                <div class="card col-lg-4 col-md-6 my-3" style="width: 18rem;" data-id="${orderNoofpendingOrder}">
                    <img class="card-img-top cardimg" src="${imageofpendingOrder}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">Dish Name: ${dishnameofpendingOrder}</h5>
                      <p class="card-text">Quantity: ${quantityofpendingOrder}</p>
                      <p class="card-text">Order No:${orderNoofpendingOrder}</p>
                    </div>
                  </div>
                `

                });
                // console.log("Current cities in CA: ", cities.join(", "));
            });
        // ...
    } else {
        // User is signed out
        // ...
    }
});

// }



//////////////////////// TABS FOR DELIVERED ORDER ///////////////////////

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        let deliver = "Delivered";
        db.collection("orders").where("currentUSerUid", "==", uid).where("status", "==", deliver)
            .onSnapshot((querySnapshot) => {
                // var cities = [];
                document.getElementById("delivereda").innerHTML = "";
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    // cities.push(doc.data().name);
                    let imageofpendingOrder = doc.data().image
                    let dishnameofpendingOrder = doc.data().dishname
                    let quantityofpendingOrder = doc.data().quantity
                    let orderNoofpendingOrder = doc.id;
                    document.getElementById("delivereda").innerHTML += `
			<div class="card col-lg-4 col-md-6 my-3" style="width: 18rem;" data-id="${orderNoofpendingOrder}">
				<img class="card-img-top cardimg" src="${imageofpendingOrder}" alt="Card image cap">
				<div class="card-body">
				  <h5 class="card-title">Dish Name: ${dishnameofpendingOrder}</h5>
				  <p class="card-text">Quantity: ${quantityofpendingOrder}</p>
				  <p class="card-text">Order No:${orderNoofpendingOrder}</p>
				  <p   style="color:#ed563b">Order Deliverd &nbsp;<i style="color:#ed563b" class="fas fa-check"></i></button>
				</div>
			  </div>
			`

                });
                // console.log("Current cities in CA: ", cities.join(", "));
            });
        // ...
    } else {
        // User is signed out
        // ...
    }
});


// ....................preloader...............
let preloader = document.getElementById("preloader")
window.addEventListener("load", () => {
    preloader.style.display = "none"
})