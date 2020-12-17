document.addEventListener("DOMContentLoaded", function() {
  const ROOT_URL = "http://localhost:3000/";
  const DRIVERS_CARS_URL = `${ROOT_URL}/drivers_cars`
  
  let driversSection = document.getElementById("drivers-section");
  let carsGrid3 = document.getElementById("cars-grid");
  let makeSelectbox = document.getElementById("make-select");
  let modelSelectbox = document.getElementById("model-select");
  let yearSelectbox = document.getElementById("year-select"); 
  
  // Fetch Car data from backend
  fetch("http://localhost:3000/cars", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (response.ok)
    {
      return response.json();
    }
    else 
    {
      return response.text().then(error => Promise.reject(error));
    }
  })
  .then(cars => {
    cars.forEach(car => {
      new Car(car.id, car.make, car.model, car.year, car.description, car.imageUrl, car.msrp, car.topspeed);
    });
  
    for (let i = 0; i < Car.all.length; i++)
    {
      let makeOption = document.createElement("option");
      let currentCar = Car.all[i];
      let previousCar = Car.all[i - 1];
  
      // Add Car data to selectbox with id="make"
      if (i === 0 || currentCar.make !== previousCar.make)
      {
        makeOption.text = currentCar.make;
        document.getElementById("make-select").add(makeOption);
      }
    }
  });
  
  // Fetch All of Driver's Cars from backend
  fetch(DRIVERS_CARS_URL)
  .then(response => response.json())
  .then(driversCars => {
    driversCars.forEach(driversCar => {
      new DriversCar(driversCar.id, driversCar.car_id, driversCar.driver_id);
    });
    buildDriversCarsCards();
  });
  
  // Event Listeners
  makeSelectbox.addEventListener("input", addModelsBasedOnMakeSelection);
  modelSelectbox.addEventListener("input", addYearsBasedOnModelSelection);
  document.getElementById("new-car-form").addEventListener("submit", function(e) {
    e.preventDefault();
    addNewCarToDatabaseForDriver();
  });
  
  document.getElementById("card-form").addEventListener("submit", function(e) {
    e.preventDefault();
    console.log(e.target);
  });
  
  // Callback functions for event-listeners
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
  
  function addNewCarToDatabaseForDriver()
  {
    let selectedCar = getTheSelectedCarsId();
  
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        car_id: selectedCar,
        driver_id: 1
      })
    }
    
    fetch(DRIVERS_CARS_URL, configObj)
    .then(response => response.json())
    .then(data => {
      console.log("Success: ", data);
    })
    .catch(error => {
      console.error("Error: ", error);
    });
  }
  
  // function deleteDriversCarFromDatabase()
  // {
  //   let driversCarId = "";
  
  //   let configObj = {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({
  //       id: 
  //     })
  //   }
  // }
  
  function buildDriversCarsElements(year, make, model, imageUrl, description, msrp, topSpeed)
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
    cardHeading.innerText = `${year} ${make} ${model}`;
    cardImg.src = `${imageUrl}`;
    cardDesc.innerText = `${description}`;
    msrpLabel.innerText = `$${msrp}`;
    topSpeedLabel.innerText = `${topSpeed}mph`;
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
      if (currentDriversCar.driverId === 1)
      {
        for (let j = 0; j < Car.all.length; j++)
        {
          let currentCar = Car.all[j];
          if (currentCar.id === currentDriversCar.carId)
          {
            buildDriversCarsElements(currentCar.year, currentCar.make, currentCar.model, currentCar.imageUrl, currentCar.description, currentCar.msrp, currentCar.topSpeed);
          }
        }
      }
    }
  }

  console.log(Car.all);
  console.log(DriversCar.all);

});