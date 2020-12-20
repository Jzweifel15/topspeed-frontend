document.addEventListener("DOMContentLoaded", function() {
  let driversSection = document.getElementById("drivers-section");
  let carsGrid3 = document.getElementById("cars-grid");
  let makeSelectbox = document.getElementById("make-select");
  let modelSelectbox = document.getElementById("model-select");
  let yearSelectbox = document.getElementById("year-select"); 
  
  Car.fetchCars();
  Driver.fetchDriver();
  DriversCar.fetchDriversCars(buildDriversCarsCards);
  
  // Event Listeners
  makeSelectbox.addEventListener("input", addModelsBasedOnMakeSelection);

  modelSelectbox.addEventListener("input", addYearsBasedOnModelSelection);

  document.getElementById("new-car-form").addEventListener("submit", function(e) {
    e.preventDefault();
    DriversCar.addNewCarToDatabaseForDriver(getTheSelectedCarsId);
  });
  
  document.getElementById("card-form").addEventListener("submit", function(e) {
    e.preventDefault();
    console.log(e.target);
  });
  
  // Callback functions for event-listeners
  /**
   * Adds the proper model options to the selectbox with id="model-select" based on the current selection
   * of the selectbox with id="make-select"
   */
  function addModelsBasedOnMakeSelection()
  {
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
  }
  
  /**
   * Adds the proper year options to the selectbox with id="year-select" based on the current selection
   * of the selectbox with id="model-select"
   */
  function addYearsBasedOnModelSelection() 
  {
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
  }
  
  /**
   * Gets the `id` of the drivers currently selected car
   */
  function getTheSelectedCarsId()
  {
    for (let i = 0; i < Car.all.length; i++)
    {
      let currentCar = Car.all[i];
      if (modelSelectbox.value === currentCar.model && yearSelectbox.value === currentCar.year)
      {
        return currentCar.id;
      }
    }
  } 
  
  function buildDriversCarsElements(carObj)
  {
    // Create the necessary elements for each car's card
    let carCard = document.createElement("form");
    let cardHeading = document.createElement("h3");
    let cardImg = document.createElement("img");
    let cardDesc = document.createElement("p");
    let carCardIcons = document.createElement("div");
    let msrpIcon = document.createElement("i");
    let topSpeedIcon = document.createElement("i");
    let msrpLabel = document.createElement("strong");
    let topSpeedLabel = document.createElement("strong");
    let formTrashBtn = document.createElement("button");
    let trashIcon = document.createElement("i");
  
    // Set new element attributes
    carCard.className = "car card";
    carCard.id = "card-form";
    carCardIcons.className = "car-card icons";
    msrpIcon.className = "fas fa-money-check-alt fa-2x";
    topSpeedIcon.className = "fas fa-tachometer-alt fa-2x";
    trashIcon.className = "fas fa-trash-alt fa-2x";
    cardHeading.innerText = `${carObj.year} ${carObj.make} ${carObj.model}`;
    cardImg.src = `${carObj.imageUrl}`;
    cardDesc.innerText = `${carObj.description}`;
    msrpLabel.innerText = `$${carObj.msrp}`;
    topSpeedLabel.innerText = `${carObj.topSpeed}mph`;
    formTrashBtn.type = "submit";
  
    // Add Elements to proper containers
    formTrashBtn.appendChild(trashIcon);
    
    carCardIcons.append(msrpIcon, msrpLabel, topSpeedIcon, topSpeedLabel, formTrashBtn);
  
    carCard.append(cardHeading, cardImg, cardDesc, carCardIcons);
  
    carsGrid3.appendChild(carCard);
  }
  
  function buildDriversCarsCards()
  {
    for (let i = 0; i < DriversCar.all.length; i++)
    {
      let currentDriversCar = DriversCar.all[i];
      if (currentDriversCar.driver_id === 1)
      {
        for (let j = 0; j < Car.all.length; j++)
        {
          let currentCar = Car.all[j];
          if (currentCar.id === currentDriversCar.car_id)
          {
            buildDriversCarsElements(currentCar);
          }
        }
      }
    }
  }


});