class DriversCar 
{
  static allDriversCars = [];

  constructor(attributes)
  {
    let whitelist = ["id", "car_id", "driver_id"];
    whitelist.forEach(attr => this[attr] = attributes[attr]);
    DriversCar.allDriversCars.push(this);
  }

  static get all()
  {
    return DriversCar.allDriversCars;
  }

  // Fetch All of Driver's Cars from backend
  static fetchDriversCars(buildDriversCarsFn)
  {
    fetch("http://localhost:3000/drivers_cars", {
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
    .then(driversCars => {
      driversCars.forEach(attrs => {
        new DriversCar(attrs);
      });
      buildDriversCarsFn();
    });
  }

  // Add new Car for Driver to database
  static addNewCarToDatabaseForDriver(getSelectedCarsIdFn)
  {
    let selectedCar = getSelectedCarsIdFn();
  
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
    
    fetch("http://localhost:3000/drivers_cars", configObj)
    .then(response => response.json())
    .then(data => {
      console.log("Success: ", data);
    })
    .catch(error => {
      console.error("Error: ", error);
    });
  } 
}