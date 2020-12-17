// ---------- Beginning of Class Declarations ----------
class Car
{
  static allCars = [];

  constructor(id, make, model, year, description, imageUrl, msrp, topSpeed)
  {
    this._id = id;
    this._make = make;
    this._model = model;
    this._year = year;
    this._description = description;
    this._imageUrl = imageUrl;
    this._msrp = msrp;
    this._topSpeed = topSpeed;
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

  get description()
  {
    return this._description;
  }

  get imageUrl()
  {
    return this._imageUrl;
  }

  get msrp()
  {
    return this._msrp;
  }

  get topSpeed()
  {
    return this._topSpeed;
  }

  static get all()
  {
    return Car.allCars;
  }
}

class DriversCar 
{
  static allDriversCars = [];

  constructor(id, carId, driverId)
  {
    this._id = id;
    this._carId = carId;
    this._driverId = driverId;
    DriversCar.allDriversCars.push(this);
  }

  get driverId()
  {
    return this._driverId;
  }

  get carId()
  {
    return this._carId;
  }

  static get all()
  {
    return DriversCar.allDriversCars;
  }
}
// ---------- End of Class Declarations ----------


const ROOT_URL = "http://localhost:3000/";
const DRIVERS_URL = `${ROOT_URL}/drivers`;
const CARS_URL = `${ROOT_URL}/cars`;
const DRIVERS_CARS_URL = `${ROOT_URL}/drivers_cars`

let driversSection = document.getElementById("drivers-section");
let carsGrid3 = document.getElementById("cars-grid");
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
  buildDriversCarsCards();
});

// Event Listeners
makeSelectbox.addEventListener("input", addModelsBasedOnMakeSelection);
modelSelectbox.addEventListener("input", addYearsBasedOnModelSelection);
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  addNewCarToDatabaseForDriver();
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

  console.log(configObj);
  
  fetch(DRIVERS_CARS_URL, configObj)
  .then(response => response.json())
  .then(data => {
    console.log("Success: ", data);
  })
  .catch(error => {
    console.error("Error: ", error);
  });
}

function buildDriversCarsElements(year, make, model, imageUrl, description, msrp, topSpeed)
{
  let carCard = document.createElement("div");
  let cardHeading = document.createElement("h3");
  let cardImg = document.createElement("img");
  let cardDesc = document.createElement("p");
  let carCardIcons = document.createElement("div");
  let msrpIcon = document.createElement("i");
  let topSpeedIcon = document.createElement("i");
  let msrpLabel = document.createElement("strong");
  let topSpeedLabel = document.createElement("strong");
  let formForTrashBtn = document.createElement("form");
  let formTrashBtn = document.createElement("button");
  let trashIcon = document.createElement("i");

  // Set new element attributes
  carCard.className = "car card";
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

  formForTrashBtn.appendChild(msrpIcon);
  formForTrashBtn.appendChild(msrpLabel);
  formForTrashBtn.appendChild(topSpeedIcon);
  formForTrashBtn.appendChild(topSpeedLabel);
  formForTrashBtn.appendChild(formTrashBtn);

  carCardIcons.appendChild(formForTrashBtn);

  carCard.appendChild(cardHeading);
  carCard.appendChild(cardImg);
  carCard.appendChild(cardDesc);
  carCard.appendChild(carCardIcons);

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

// Debugging Area
console.log(Car.all);
console.log(DriversCar.all);