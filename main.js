class Car
{
  static allCars = [];

  constructor(id, make, model, year, description, imageUrl, driver_id)
  {
    this._id = id;
    this._make = make;
    this._model = model;
    this._year = year;
    this._description = description;
    this._imageUrl = imageUrl;
    this._driver_id = driver_id;
    Car.allCars.push(this);
  }

  static get all()
  {
    return Car.allCars;
  }
}

const ROOT_URL = "http://localhost:3000/";
const DRIVERS_URL = `${ROOT_URL}/drivers`;
const CARS_URL = `${ROOT_URL}/cars`;

let driversSection = document.getElementById("drivers-section");
let driverCard = document.querySelector("div.driver.card");
let makeSelectbox = document.querySelector("#make");
let modelSelectbox = document.querySelector("#model");
let yearSelectbox = document.querySelector("#year"); 

// Fetch Car data from backend
fetch(CARS_URL)
.then(response => response.json())
.then(cars => {
  console.log(cars);
  cars.forEach(car => {
    new Car(car.id, car.make, car.model, car.model, car.description, car.imageUrl, car.driver_id);
  });

  for (let i = 0; i < cars.length; i++)
  {
    let makeOption = document.createElement("option");

    // Add Car data to selectbox with id="make"
    if (i === 0 || cars[i].make !== cars[i - 1].make)
    {
      makeOption.text = cars[i].make;
      makeSelectbox.appendChild(makeOption);
    }
  }
});

// Event Listeners
modelSelectbox.addEventListener("change", listenForkMakeSelectboxToHaveAValue(modelSelectbox.selectedOptions[0].value));

function listenForkMakeSelectboxToHaveAValue(selectedMake)
{
  // let modelOption = document.createElement("option");

  // if (makeSelectbox.textContent === "Audi")
  // { 

  // }
}

console.log(Car.all);