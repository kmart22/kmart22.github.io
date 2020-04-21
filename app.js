

var groceries = null

var BASEURL = "https://groceriesdeploy.herokuapp.com"

//button to click in order to add an item to the main list
var button = document.querySelector("#add-button");

//button to click in order to edit an item that is already in the list
var confirmButton = document.querySelector("#edit-add-button");
//button to click in order to cancel that
var cancelButton = document.querySelector("#cancel-edit-button");

//button to click in order to login if already a user by email
var loginButton = document.querySelector("#login-button");
//button to click in order to create a new user if not one already by email
var createUserButton = document.querySelector("#create-user-button");

//button to click once credentials are typed into the text fields and ready to login to existing user
var enterLoginButton = document.querySelector("#enter-login-button");
//button to click in order to cancel that 
var cancelLoginButton = document.querySelector("#cancel-login-button");

//button to click in order to enter filled out text fields for creating a new user
var enterCreatedUserButton = document.querySelector("#enter-created-user-button");
//button to click in order to cancel that 
var cancelCreateUserButton = document.querySelector("#cancel-create-user-button");

// var screenName = document.querySelector("#usernameHeader");
// screenName.innerHTML = "welcome, ", loginEmail;

// hide groceries show login
document.getElementById("userAccountDiv").style.display = "block";
document.getElementById("yourGroceryListHeader").style.display = "none";
document.getElementById("listInputDiv").style.display = "none";

document.getElementById("incorrectLoginHeader").style.display = "none";
document.getElementById("userAlreadyExistsHeader").style.display = "none";


//login button: show text field div (hide create user div if open)
loginButton.onclick = function(){
    document.getElementById("userLoginDiv").style.display = "block";
    document.getElementById("createUserDiv").style.display = "none";
};
cancelLoginButton.onclick = function(){
    document.getElementById("userLoginDiv").style.display = "none";
};
enterLoginButton.onclick = function(){

    var loginEmailInput = document.querySelector("#loginEmailInput");
    var loginEmail = loginEmailInput.value;
    console.log("The user Email input is: ", loginEmail);

    var loginPasswordInput = document.querySelector("#loginPasswordInput");
    var loginPassword = loginPasswordInput.value;
    console.log("The user Password input is: ", loginPassword);

    var data = "email=" + encodeURIComponent(loginEmail) + "&password=" + encodeURIComponent(loginPassword);
    console.log(data);

    fetch(BASEURL + "/sessions", {

        method: "POST",
        body: data,
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        if(response.status == 422){
            document.getElementById("incorrectLoginHeader").style.display = "block";
            document.getElementById("userAlreadyExistsHeader").style.display = "none";
        };
        loadGroceries();
        console.log("Are you: ", loginEmail, "?");
        
    });


    document.getElementById("userLoginDiv").style.display = "none";
    
};




//create a new user button: hide login div if open and show new user text field div
createUserButton.onclick = function(){
    document.getElementById("createUserDiv").style.display = "block";
    document.getElementById("userLoginDiv").style.display = "none";
};
cancelCreateUserButton.onclick = function(){
    document.getElementById("createUserDiv").style.display = "none";
};
enterCreatedUserButton.onclick = function(){

    var createFirstNameInput = document.querySelector("#firstNameInput");
    createFirstName = createFirstNameInput.value;
    console.log("The user created First Name is: ", createFirstName);

    var createLastNameInput = document.querySelector("#lastNameInput");
    createLastName = createLastNameInput.value;
    console.log("The user created Last Name is: ", createLastName);

    var createEmailInput = document.querySelector("#emailAddressInput");
    createEmail = createEmailInput.value;
    console.log("The user created Email is: ", createEmail);

    var createPasswordInput = document.querySelector("#passwordInput");
    createPassword = createPasswordInput.value;
    console.log("The user created Password is: ", createPassword);


    document.getElementById("createUserDiv").style.display = "none";

    var data = "firstName=" + encodeURIComponent(createFirstName) + "&lastName=" + encodeURIComponent(createLastName) + "&email=" + encodeURIComponent(createEmail) + "&password=" + encodeURIComponent(createPassword);
    console.log(data)

    var user_email = createEmail

    fetch(BASEURL + "/users", {

        method: "POST",
        body: data,
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        console.log("hello", createFirstName);
        if(response.status == 422){
            document.getElementById("incorrectLoginHeader").style.display = "none";
            document.getElementById("userAlreadyExistsHeader").style.display = "block";
        };
        loadGroceries();
    });

};






//main button to add something to the list of items
button.onclick = function(){
    //console.log("Add-button: clicked", button);


    //1.Capture your text from the input field
    var groceryItemInput = document.querySelector("#item-name");
    var groceryItem = groceryItemInput.value;

    var groceryCategoryInput = document.querySelector("#category-name");
    var groceryCategory = groceryCategoryInput.value;

    var groceryLocationInput = document.querySelector("#location-name");
    var groceryLocation = groceryLocationInput.value;

    var groceryPriceInput = document.querySelector("#price-name");
    var groceryPrice = groceryPriceInput.value;

    var groceryPriorityInput = document.querySelector("#priority-name");
    var groceryPriority = groceryPriorityInput.value;


    //console.log("You entered: ", groceryItem, groceryCategory, groceryLocation, groceryPrice, groceryPriority);

    //2. encode the data (urlencoded)
    var data = "name=" + encodeURIComponent(groceryItem) + "&category=" + encodeURIComponent(groceryCategory) + "&location=" + encodeURIComponent(groceryLocation) + "&price=" + encodeURIComponent(groceryPrice) + "&priority=" + encodeURIComponent(groceryPriority);
    console.log(data)

    //3. Fetch (POST): send data to the server
    fetch(BASEURL + "/groceries", {

        method: "POST",
        body: data,
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        if(response.status == 401){
            document.getElementById("incorrectLoginHeader").style.display = "block";
            document.getElementById("userAlreadyExistsHeader").style.display = "none";
        };
        loadGroceries();
    });

    groceryItemInput.value = null;
    groceryCategoryInput.value = null;
    groceryLocationInput.value = null;
    groceryPriceInput.value = null;
    groceryPriorityInput.value = null;
};




//load the list of items onto the html webpage and or edit/delete items
function loadGroceries() {
	fetch(BASEURL + "/groceries", {
        credentials: "include"
    }).then(function(response) {
        console.log(response);
        if(response.status == 200){
            //show groceries and form/ hide login
            document.getElementById("userAccountDiv").style.display = "none";
            document.getElementById("yourGroceryListHeader").style.display = "block";
            document.getElementById("listInputDiv").style.display = "block";

            response.json().then(function(groceriesFromServer) {
                groceries = groceriesFromServer;
                var groceryList = document.querySelector("#grocery-list");
                groceryList.innerHTML = '';
                groceries.forEach(function(grocery){
                    var newListItem = document.createElement("li");
                    
                    var nameEl = document.createElement("div");
                    nameEl.innerHTML = grocery.name;
                    nameEl.classList.add("name");
                    newListItem.appendChild(nameEl);

                    var categoryEl = document.createElement("div");
                    categoryEl.innerHTML = grocery.category;
                    categoryEl.classList.add("category");
                    newListItem.appendChild(categoryEl);

                    var locationEl = document.createElement("div");
                    locationEl.innerHTML = grocery.location;
                    locationEl.classList.add("location");
                    newListItem.appendChild(locationEl);

                    var priceEl = document.createElement("div");
                    priceEl.innerHTML ="$" + grocery.price;
                    priceEl.classList.add("price");
                    newListItem.appendChild(priceEl);

                    var priorityEl = document.createElement("div");
                    priorityEl.innerHTML = grocery.priority + " priority";
                    priorityEl.classList.add("priority");
                    newListItem.appendChild(priorityEl);

                    //edit an item and reload it
                    var editButton = document.createElement("button");
                    editButton.innerHTML = "Edit";
                    editButton.onclick = function (){
                        console.log("You clicked me.",grocery);
                        document.getElementById("edit-container").style.display = "block";

                        var editGroceryItemInput = document.querySelector("#edit-item-name");
                        editGroceryItemInput.value = grocery.name;

                        var editGroceryCategoryInput = document.querySelector("#edit-category-name");
                        editGroceryCategoryInput.value = grocery.category;

                        var editGroceryLocationInput = document.querySelector("#edit-location-name");
                        editGroceryLocationInput.value = grocery.location;

                        var editGroceryPriceInput = document.querySelector("#edit-price-name");
                        editGroceryPriceInput.value = grocery.price;

                        var editGroceryPriorityInput = document.querySelector("#edit-priority-name");
                        editGroceryPriorityInput.value = grocery.priority;

                        confirmButton.onclick = function () {


                            // var editGroceryItemInput = document.querySelector("#edit-item-name");
                            var editGroceryItem = editGroceryItemInput.value;

                            // var editGroceryCategoryInput = document.querySelector("#edit-category-name");
                            var editGroceryCategory = editGroceryCategoryInput.value;

                            // var editGroceryLocationInput = document.querySelector("#edit-location-name");
                            var editGroceryLocation = editGroceryLocationInput.value;

                            // var editGroceryPriceInput = document.querySelector("#edit-price-name");
                            var editGroceryPrice = editGroceryPriceInput.value;

                            // var editGroceryPriorityInput = document.querySelector("#edit-priority-name");
                            var editGroceryPriority = editGroceryPriorityInput.value;

                            
                            //console.log(editData);

                            updateGroceryOnServer(grocery.id, editGroceryItem, editGroceryCategory, editGroceryLocation, editGroceryPrice, editGroceryPriority);


                            document.getElementById("edit-container").style.display = "none";
                        }

                        cancelButton.onclick = function () {
                            document.getElementById("edit-container").style.display = "none";

                        }

                    };
                    newListItem.appendChild(editButton);

                    //delete an item from the list
                    var deleteButton = document.createElement("button");
                    deleteButton.innerHTML = "Delete";
                    deleteButton.onclick = function () {
                        console.log("You clicked me.", grocery);
                        if (confirm("Are you sure you want to delete " + '"' + grocery.name + '"' + " from your list?")){
                            deleteGroceryOnServer(grocery.id);
                        }
                        
                    };
                    newListItem.appendChild(deleteButton);
        
                    
                    
                    groceryList.appendChild(newListItem);
                    //newListItem.innerHTML = grocery.name + "            |           " + grocery.category + "            |           " + grocery.location;
                });
            });
        }
        else{
            // hide groceries show login
            document.getElementById("userAccountDiv").style.display = "block";
            document.getElementById("yourGroceryListHeader").style.display = "none";
            document.getElementById("listInputDiv").style.display = "none";
        }
        
	});
};




function deleteGroceryOnServer(groceryId){
    fetch(BASEURL + "/groceries/" + groceryId, {
        method: "DELETE",
        credentials: "include"
    }).then(function(response) {
        loadGroceries();
    });
};


function updateGroceryOnServer(groceryId, editGroceryItem, editGroceryCategory, editGroceryLocation, editGroceryPrice, editGroceryPriority){
    var data = "name=" + encodeURIComponent(editGroceryItem) + "&category=" + encodeURIComponent(editGroceryCategory) + "&location=" + encodeURIComponent(editGroceryLocation) + "&price=" + encodeURIComponent(editGroceryPrice) + "&priority=" + encodeURIComponent(editGroceryPriority);

    fetch(BASEURL + "/groceries/" + groceryId, {
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        loadGroceries();
    });
};





loadGroceries()