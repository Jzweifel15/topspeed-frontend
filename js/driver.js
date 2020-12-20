class Driver
{
  static allDrivers = [];

  constructor(attributes)
  {
    let whitelist = ["name", "email"];
    whitelist.forEach(attr => this[attr] = attributes[attr]);
    this.cars = [];
  }

  static get all()
  {
    return Driver.allDrivers;
  }

  // Fetch Single Driver from Back-end
  static fetchDriver()
  {
    fetch("http://localhost:3000/drivers/1", {
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
    .then(obj => {
      let driversCars = [];
  
      for (let i = 0; i < obj.data.relationships.cars.data.length; i++)
      {
        driversCars.push(obj.data.relationships.cars.data[i]);
      }
  
      let newDriver = new Driver(obj.data.attributes);
      newDriver.cars = Array.from(driversCars);
      console.log(newDriver);
    });
  }
}