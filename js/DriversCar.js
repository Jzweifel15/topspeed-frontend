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
        let newDriversCar = new DriversCar(driversCar.attributes);
        this.renderDriversCars(newDriversCar);
      });
    });
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

    console.log(selectedCar());
    
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
    .then(DriversCarAttributes => {
      console.log("Success: ", DriversCarAttributes);
      console.log(DriversCarAttributes);
      let newDriversCar = new DriversCar(DriversCarAttributes[DriversCarAttributes.length - 1]);
      console.log(newDriversCar);
      this.renderDriversCars(newDriversCar);
      // return newDriversCar;
    })
    .catch(error => {
      console.error("Error: ", error);
    });
  } 

  // static buildCardElements(carObj){}

  static renderDriversCars(driversCarObj)
  {
    for (let i = 0; i < Car.all.length; i++)
    {
      let currentCar = Car.all[i];
      if (currentCar.id === driversCarObj.car_id)
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
        let trashIcon = document.createElement("i");
        let deleteLink = document.createElement("a");
  
        // Set new element attributes
        carCard.className = "car card";
        // carCard.id = "card-form";
        cardIcons.className = "car-card icons";
        msrpIcon.className = "fas fa-money-check-alt fa-2x";
        topSpeedIcon.className = "fas fa-tachometer-alt fa-2x";
        trashIcon.className = "fas fa-trash-alt fa-2x";
        cardHeading.innerText = `${currentCar.year} ${currentCar.make} ${currentCar.model}`;
        cardImg.src = `${currentCar.imageUrl}`;
        cardDesc.innerText = `${currentCar.description}`;
        msrpLabel.innerText = `$${currentCar.msrp}`;
        topSpeedLabel.innerText = `${currentCar.topspeed}mph`;
        deleteLink.id = "delete-link";
  
        // Add Elements to proper containers
        deleteLink.appendChild(trashIcon);
    
        cardIcons.append(msrpIcon, msrpLabel, topSpeedIcon, topSpeedLabel, deleteLink);
  
        carCard.append(cardHeading, cardImg, cardDesc, cardIcons);

        document.getElementById("cars-grid").appendChild(carCard);
      }
    }
  }
}