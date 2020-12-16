class Car
{
  static allCars = [];

  constructor(id, make, model, year, description, imageUrl, msrp, topspeed)
  {
    this._id = id;
    this._make = make;
    this._model = model;
    this._year = year;
    this._description = description;
    this._imageUrl = imageUrl;
    this._msrp = msrp;
    this._topspeed = topspeed;
    Car.allCars.push(this);
  }

  get id()
  {
    return this._id;
  }

  get make()
  {
    return this._make;
  }

  get model()
  {
    return this._model;
  }

  get year()
  {
    return this._year;
  }

  static get all()
  {
    return Car.allCars;
  }
}

class DriversCar 
{
  static allDriversCars = [];

  constructor(id, car_id, driver_id)
  {
    this._id = id;
    this._car_id = car_id;
    this._driver_id = driver_id;
    DriversCar.allDriversCars.push(this);
  }

  static get all()
  {
    return DriversCar.allDriversCars;
  }
}

const ROOT_URL = "http://localhost:3000/";
const DRIVERS_URL = `${ROOT_URL}/drivers`;
const CARS_URL = `${ROOT_URL}/cars`;
const DRIVERS_CARS_URL = `${ROOT_URL}/drivers_cars`

let driversSection = document.getElementById("drivers-section");
let driverCard = document.querySelector("div.driver.card");
let makeSelectbox = document.querySelector("#make");
let modelSelectbox = document.querySelector("#model");
let yearSelectbox = document.querySelector("#year"); 

// Fetch Car data from backend
fetch(CARS_URL)
.then(response => response.json())
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
      makeSelectbox.add(makeOption);
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
});

// Event Listeners
makeSelectbox.addEventListener("input", addModelsBasedOnMakeSelection);
modelSelectbox.addEventListener("input", addYearsBasedOnModelSelection);
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
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

  console.log(configObj);
  
  fetch(DRIVERS_CARS_URL, configObj)
  .then(response => response.json())
  .then(data => {
    console.log("Success: ", data);
  })
  .catch(error => {
    console.error("Error: ", error);
  });
});

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

console.log(DriversCar.all);