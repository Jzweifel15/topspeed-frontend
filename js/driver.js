class Driver
{
  static allDrivers = [];

  constructor(attributes)
  {
    let whitelist = ["id", "name", "email"];
    whitelist.forEach(attr => this[attr] = attributes[attr]);
    this.cars = [];
    Driver.allDrivers.push(this);
  }

  static get all()
  {
    return Driver.allDrivers;
  }

  // Fetch All Drivers from Back-end
  static fetchDrivers()
  {
    return fetch("http://localhost:3000/drivers", {
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
    .then(drivers => {
      drivers.forEach(attrs => {
        new Driver(attrs);
      });
    })
  }

  // Fetch Single Driver from Back-end
  static fetchDriver(driverEmail)
  {
    let currentDriver = Driver.all.find(driver => {
      if (driver.email.trim() === driverEmail.trim())
      {
        return driver;
      }
    });

    return fetch(`http://localhost:3000/drivers/${currentDriver.id}`, {
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
    .then(driverAttrs => {
      for (let i = 0; i < driverAttrs.data.relationships.cars.data.length; i++)
      {
        currentDriver.cars.push(driverAttrs.data.relationships.cars.data[i].id);
        Driver.render(driverAttrs.data.relationships.cars.data[i].id);
      }
    });
  }

  static createNewDriver(driverName, driverEmail)
  {
    return fetch("http://localhost:3000/drivers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: driverName,
        email: driverEmail
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
    .then(driverAttrs => {
      alert("Your account was successfully created. Thank you for subscribing.");
      let driverObj = {
        id: driverAttrs.data.id,
        name: driverAttrs.data.attributes.name,
        email: driverAttrs.data.attributes.email
      }
      new Driver(driverObj);
    });
  }

  static addCar(driverEmail, carId)
  {
    // let selectedCar = function()
    // {
    //   let modelSelectbox = document.getElementById("model-select");
    //   let yearSelectbox = document.getElementById("year-select");
  
    //   for (let i = 0; i < Car.all.length; i++)
    //   {
    //     let currentCar = Car.all[i];
    //     if (modelSelectbox.value === currentCar.model && yearSelectbox.value === currentCar.year)
    //     {
    //       return parseInt(currentCar.id);
    //     }
    //   }
    // }

    let currentDriver = Driver.all.find(driver => {
      if (driver.email.trim() === driverEmail.trim())
      {
        return driver;
      }
    });

    return fetch(`http://localhost:3000/drivers_cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        car_id: carId,
        driver_id: currentDriver.id
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
    });

  }

  static deleteDriversCar(driverEmail, carId)
  {

    let currentDriver = Driver.all.find(driver => {
      if (driver.email.trim() === driverEmail.trim())
      {
        return driver;
      }
    });

    let driversCar = function() {
      for (let i = 0; i < DriversCar.all.length; i++)
      {
        if (parseInt(DriversCar.all[i].driver_id) === parseInt(currentDriver.id) && 
            parseInt(DriversCar.all[i].car_id) === parseInt(carId))
        {
          return DriversCar.all[i];
        }
      }
    }

    return fetch(`http://localhost:3000/drivers_cars/${driversCar().id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response);
    })
    .then(() => {
      document.getElementById("cars-grid").innerHTML = "";
      Driver.fetchDriver(driverEmail)
    });
  }

  static render(carId)
  {
    for (let i = 0; i < Car.all.length; i++)
    {
      let currentCar = Car.all[i];
      if (parseInt(currentCar.id) === parseInt(carId))
      {
        // Create the necessary elements for each car's card
        // let carCard = document.createElement("form");
        let carCard = document.createElement("div");
        let cardHeading = document.createElement("h3");
        let cardImg = document.createElement("img");
        let cardDesc = document.createElement("p");
        let cardIcons = document.createElement("div");
        let msrpIcon = document.createElement("i");
        let topSpeedIcon = document.createElement("i");
        let msrpLabel = document.createElement("strong");
        let topSpeedLabel = document.createElement("strong");
        let deleteBtn = document.createElement("i");
  
        // Set new element attributes
        carCard.className = "car card";
        carCard.setAttribute("data-set", `${currentCar.id}`);
        carCard.id = `${currentCar.id}`;
        cardIcons.className = "car-card icons";
        msrpIcon.className = "fas fa-money-check-alt fa-2x";
        topSpeedIcon.className = "fas fa-tachometer-alt fa-2x";
        deleteBtn.className = "delete-btn fas fa-trash-alt fa-2x";
        cardHeading.innerText = `${currentCar.year} ${currentCar.make} ${currentCar.model}`;
        cardImg.src = `${currentCar.imageUrl}`;
        cardDesc.innerText = `${currentCar.description}`;
        msrpLabel.innerText = `$${currentCar.msrp}`;
        topSpeedLabel.innerText = `${currentCar.topspeed}mph`;
  
        // Add Elements to proper containers
        cardIcons.append(msrpIcon, msrpLabel, topSpeedIcon, topSpeedLabel, deleteBtn);
  
        carCard.append(cardHeading, cardImg, cardDesc, cardIcons);

        document.getElementById("cars-grid").appendChild(carCard);
      }
    }
  }
}