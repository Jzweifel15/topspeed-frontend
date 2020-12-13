document.addEventListener("DOMContentLoaded", function() {
  const ROOT_URL = "http://localhost:3000/";
  const DRIVERS_URL = `${ROOT_URL}/drivers`;
  const CARS_URL = `${ROOT_URL}/cars`;

  let driversSection = document.getElementById("drivers-section");
  let allDrivers = [];

  // Constructor Function for Models
  function Driver(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  };

  function Car(id, make, model, year, description, imageUrl, driver_id) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.description = description;
    this.imageUrl = imageUrl;
    this.driver_id = driver_id;
  };

  // Fetch data from backend
  fetch(ROOT_URL)
  .then(response => response.json())
  .then(drivers => {
    //console.log(drivers);
    drivers.forEach(driver => {
      let newDriver = new Driver(driver.id, driver.name, driver.email);
      allDrivers.push(newDriver);
    });
  }); 

  console.log(allDrivers);

});