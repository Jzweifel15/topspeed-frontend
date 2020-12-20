class Car
{
  static allCars = [];

  constructor(attributes)
  {
    let whitelist = ["id", "make", "model", "year", "description", "imageUrl", "msrp", "topspeed"];
    whitelist.forEach(attr => this[attr] = attributes[attr]);
    Car.allCars.push(this);
  }

  static get all()
  {
    return Car.allCars;
  }

  // Fetch Car data from backend
  static fetchCars()
  {
    fetch("http://localhost:3000/cars", {
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
    .then(cars => {
      cars.forEach(attrs => {
        new Car(attrs);
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
          document.getElementById("make-select").add(makeOption);
        }
      }
    });
  }

}