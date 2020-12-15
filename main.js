class Car
{
  constructor(id, make, model, year, description, imageUrl, driver_id)
  {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.description = description;
    this.imageUrl = imageUrl;
    this.driver_id = driver_id;
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
  for (let i = 0; i < cars.length; i++)
  {
    let newCar = new Car(cars[i].id, cars[i].make, cars[i].model, cars[i].year, cars[i].description, cars[i].driver_id);
    let makeOption = document.createElement("option");
    let modelOption = document.createElement("option");
    let yearOption = document.createElement("option");

    // Add Car data to selectbox with id="make"
    if (i === 0)
    {
      makeOption.text = cars[i].make;
      makeSelectbox.appendChild(makeOption);
    }
    else if (cars[i].make !== cars[i - 1].make)
    {
      makeOption.text = cars[i].make;
      makeSelectbox.appendChild(makeOption);
    }
  }
});

