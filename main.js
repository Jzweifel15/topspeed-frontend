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
  //console.log(cars);
  cars.forEach(car => {
    new Car(car.id, car.make, car.model, car.model, car.description, car.imageUrl, car.driver_id);
  });

  for (let i = 0; i < Car.all.length; i++)
  {
    let makeOption = document.createElement("option");

    // Add Car data to selectbox with id="make"
    if (i === 0 || Car.all[i]._make !== Car.all[i - 1]._make)
    {
      makeOption.text = Car.all[i]._make;
      makeSelectbox.appendChild(makeOption);
    }
  }   
});

// Event Listeners

makeSelectbox.addEventListener("change", function() {
  if (makeSelectbox.value !== "Choose Make")
  {
    console.log("Entered makeSelectbox EventListener");
    console.log(makeSelectbox.text);
    for (let i = 0; i < Car.all.length; i++)
    {
      let modelOption = document.createElement("option");
      if (Car.all[i]._make === makeSelectbox.value)
      {
        if (i === 0 || Car.all[i]._model !== Car.all[i - 1]._model)
        {
          modelOption.text = Car.all[i]._model;
          modelSelectbox.appendChild(modelOption);
        }
      }
    }   
  }
});


// console.log(Car.all);