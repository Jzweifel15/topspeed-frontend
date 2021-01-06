// let driversSection = document.getElementById("drivers-section");
// let carsGrid3 = document.getElementById("cars-grid");
let makeSelectbox = document.getElementById("make-select");
let modelSelectbox = document.getElementById("model-select");
let yearSelectbox = document.getElementById("year-select"); 

document.addEventListener("DOMContentLoaded", function() {  
  Car.fetchCars();
  Driver.fetchDriver();
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

document.getElementById("new-car-form").addEventListener("submit", function(e) {
  e.preventDefault();
  DriversCar.create();
});

document.getElementById("cars-grid").addEventListener("click", function(e) {
  let deleteBtnPressed = e.target.className === "delete-btn fas fa-trash-alt fa-2x";
  if (deleteBtnPressed)
  {
    let id = event.target.parentElement.parentElement.id;
    DriversCar.delete(id);
  }
});


