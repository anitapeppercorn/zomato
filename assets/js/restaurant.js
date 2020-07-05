var latitudeFormEl = document.querySelector("#latitude-form");
var locateInputEl = document.querySelector("#latitudelocate");
var restaurantContainerEl = document.querySelector("#restaurants-container");
var restaurantSearchTerm = document.querySelector("#restaurant-search-term");
 
var displayrestaurants = function (restaurants, searchTerm) {
 if (restaurants.length === 0) {
   restaurantContainerEl.textContent = "No restaurants found";
   return;
 }
 
 restaurantContainerEl.textContent = "";
 restaurantSearchTerm.textContent = searchTerm;
 console.log(searchTerm);
 console.log(restaurants);
 
 // loop over restaurants.nearby_restaurants
 for (var i = 0; i < restaurants.nearby_restaurants.length; i++) {
   // format restaurant name
   var restaurantlocate = restaurants.nearby_restaurants[i].restaurant.name + "/" + restaurants.nearby_restaurants[i].restaurant.user_rating.rating_text;
 
   // create a container for each restaurant
   var restaurantEl = document.createElement("div");
   restaurantEl.classList = "list-item flex-row justify-space-between align-center";
 
   // create a span element to hold restaurant name
   var titleEl = document.createElement("span");
   titleEl.textContent = restaurantlocate;
 
   // append to container
   restaurantEl.appendChild(titleEl);
 
   // create a status element
   var statusEl = document.createElement("span");
   statusEl.classList = "flex-row align-center";
 
   // check if current restaurant has issues or not
   if (restaurants.nearby_restaurants[i].restaurant.user_rating.votes > 0) {
     statusEl.innerHTML =
     "<i class='fas fa-check-square status-icon icon-success'></i>"
       +
       restaurants.nearby_restaurants[i].restaurant.user_rating.votes +
       " votes.";
   } else {
     statusEl.innerHTML =
     "<i class='fas fa-times status-icon icon-danger'></i>";
   }
   //append to container
   restaurantEl.appendChild(statusEl);
 
   var restaurantDescription = document.createElement("div");
 
   if (restaurants.nearby_restaurants[i].restaurant.user_rating.votes === null) {
     restaurantDescription.innerHTML =
       "<class='uppercase'>" + "There are no votes for this restaurant";
   } else {
     restaurantDescription.innerHTML = "<class='uppercase'>" + restaurants.nearby_restaurants[i].restaurant.name;
   }
 
   //append description
   restaurantContainerEl.appendChild(restaurantDescription);
 
   //append container to the dom
   restaurantContainerEl.appendChild(restaurantEl);
 }
};
 
 
var getlatituderestaurants = function (latitude) {
 return new Promise((resolve, reject) => {
   $.ajax({
     url: "https://developers.zomato.com/api/v2.1/geocode?lat=" + latitude + "&lon=-121.9",
     type: 'post',
     beforeSend: function (xhr) {
       xhr.setRequestHeader('user-key', 'f9d0eb83eb1891a2bfa73dcec015b650');
   },
   success: function (data) {
       resolve(data)
       displayrestaurants(data, latitude);
     },
     error: function (error) {
       reject(error)
     },
   })
 })
}
 
getlatituderestaurants()
 .then((restaurants, latitude) => {
   console.log(restaurants)
   displayrestaurants(restaurants, latitude)
 })
 .catch((error) => {
   console.log(error)
 })
 
//f9d0eb83eb1891a2bfa73dcec015b650 - Anita key
//'b4dd32968099fb859f5fefcf27642303' - Priya key
 
 
 
 
var formSubmitHandler = function (event) {
 event.preventDefault();
 console.log(event);
 var latitudelocate = locateInputEl.value.trim();
 
 if (latitudelocate) {
   getlatituderestaurants(latitudelocate);
   locateInputEl.value = "";
 } else {
   alert("Please enter your latitude location");
 }
};
 
latitudeFormEl = addEventListener("submit", formSubmitHandler);
