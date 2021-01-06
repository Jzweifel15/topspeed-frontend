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

  // Fetch Single Driver from Back-end
  static fetchDriver()
  {
    return fetch("http://localhost:3000/drivers/1", {
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
    .then(driver => {
      let driverObj = {
        "id": driver.data.id,
        "name": driver.data.attributes.name,
        "email": driver.data.attributes.email
      }

      let currentDriver = new Driver(driverObj);

      for (let i = 0; i < driver.data.relationships.cars.data.length; i++)
      {
        currentDriver.cars.push(driver.data.relationships.cars.data[i]);
        Driver.render(driver.data.relationships.cars.data[i].id);
      }
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