let makeSelectbox = document.getElementById("make-select");
let modelSelectbox = document.getElementById("model-select");
let yearSelectbox = document.getElementById("year-select");

let session = "";

document.addEventListener("DOMContentLoaded", function() { 
  Car.fetchCars();
  Driver.fetchDrivers();
  DriversCar.fetchDriversCars(); 
});

/**
 * Adds the proper model options to the selectbox with id="model-select" based on the current selection
 * of the selectbox with id="make-select"
 */
makeSelectbox.addEventListener("input", function() {
  if (makeSelectbox.value !== "Choose Make")
  {
    for (let i = 0; i < Car.all.length; i++)
    {
      let modelOption = document.createElement("option");
      let previousCar = Car.all[i - 1];
      let currentCar = Car.all[i];
  
      if (currentCar.make === makeSelectbox.value)
      {
        if (i === 0 || currentCar.model !== previousCar.model)
        {
          modelOption.text = currentCar.model;
          modelSelectbox.add(modelOption);
        }
      }
    }   
  }
});

/**
 * Adds the proper year options to the selectbox with id="year-select" based on the current selection
 * of the selectbox with id="model-select"
 */
modelSelectbox.addEventListener("input", function() {
  if (modelSelectbox.value !== "Choose Model")
  {
    for (let i = 0; i < Car.all.length; i++)
    {
      let yearOption = document.createElement("option");
      let currentCar = Car.all[i];
  
      if (currentCar.model === modelSelectbox.value)
      {
        yearOption.text = currentCar.year;
        yearSelectbox.add(yearOption);
      }
    }
  }
});

/**
 * Listens for either submit button click when user is signing into an existing account
 * or listens for when a user clicks the `Sign Up Here` link located at the bottom of 
 * the form and renders the Sign Up Form
 */
document.getElementById("sign-in-form-container").addEventListener("click", function(e) {
  e.preventDefault();
  let signInBtnPressed = e.target.id === "submit-btn";
  let signUpLinkedPressed = e.target.id === "sign-up-link";
  
  if (signInBtnPressed)
  {
    let driverEmail = document.getElementById("in-email");

    if (String(driverEmail.value).trim() === "")
    {
      alert("Make sure to fill out all required fields.");
    }
    else 
    {
      session = String(driverEmail.value).trim();
      Driver.fetchDriver(session);
      document.getElementById("sign-in-form-container").className = "inactive";
      document.getElementById("select-card").className = "active";
    }
  }
  else if (signUpLinkedPressed)
  {
    document.getElementById("sign-in-form-container").className = "form-container inactive";
    document.getElementById("sign-up-form-container").className = "form-container active";
  }
});

/**
 * Listens for either submit button click when user is signing up for a new account or
 * listens for when a user clicks the `Sign In Here` link located at the bottom of the 
 * form and renders the Sign In Form
 */
document.getElementById("sign-up-form-container").addEventListener("click", function(e) {
  e.preventDefault();
  let signUpBtnPressed = e.target.id === "submit-btn";
  let signInLinkedPressed = e.target.id === "sign-in-link";
  
  if (signUpBtnPressed)
  {
    let driverName = document.getElementById("up-name");
    let driverEmail = document.getElementById("up-email");

    if (String(driverName.value).trim() === "" || 
        String(driverEmail.value).trim() === "")
    {
      alert("Make sure to fill out all required fields.");
    }
    else 
    {
      session = String(driverEmail.value).trim();
      Driver.createNewDriver(String(driverName.value).trim(), session);
      document.getElementById("sign-up-form-container").className = "inactive";
      document.getElementById("select-card").className = "active";
    }
  }
  else if (signInLinkedPressed)
  {
    document.getElementById("sign-up-form-container").className = "form-container inactive";
    document.getElementById("sign-in-form-container").className = "form-container active";
  }
});

document.getElementById("new-car-form").addEventListener("submit", function(e) {
  e.preventDefault();
  Driver.addCar(session);
});

document.getElementById("cars-grid").addEventListener("click", function(e) {
  e.stopPropagation();
  let deleteBtnPressed = e.target.className === "delete-btn fas fa-trash-alt fa-2x";
  if (deleteBtnPressed)
  {
    let id = event.target.parentElement.parentElement.id;
    Driver.deleteDriversCar(session, id);
  }
});

