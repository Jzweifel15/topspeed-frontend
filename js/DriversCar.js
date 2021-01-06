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

  static fetchDriversCars()
  {
    return fetch("http://localhost:3000/drivers_cars", {
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
      driversCars.data.forEach(driversCar => {
        let driversCarObj = {
          "id": driversCar.id,
          "car_id": driversCar.attributes.car_id,
          "driver_id": driversCar.attributes.driver_id 
        }
        new DriversCar(driversCarObj);
      })
    })
  }

  // Add new Car for Driver to database
  static create()
  {
    let selectedCar = function()
    {
      let modelSelectbox = document.getElementById("model-select");
      let yearSelectbox = document.getElementById("year-select");
  
      for (let i = 0; i < Car.all.length; i++)
      {
        let currentCar = Car.all[i];
        if (modelSelectbox.value === currentCar.model && yearSelectbox.value === currentCar.year)
        {
          return currentCar.id;
        }
      }
    }
    
    return fetch("http://localhost:3000/drivers_cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        car_id: selectedCar(),
        driver_id: 1
      })
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
    .then(driversCarAttributes => {
      let newCar = new DriversCar(driversCarAttributes);
      Driver.render(newCar.car_id);
    })
    .catch(error => {
      console.error("Error: ", error);
    });
  }

  static delete(carId)
  {
    let driverCarId = function() {
      for (let i = 0; i < DriversCar.all.length; i++)
      {
        if (parseInt(DriversCar.all[i].car_id) === parseInt(carId))
        {
          return DriversCar.all[i].id;
        }
      }
    }

    return fetch(`http://localhost:3000/drivers_cars/${driverCarId()}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      window.location.reload();
    })
  }
}