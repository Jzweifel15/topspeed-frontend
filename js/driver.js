class Driver
{
  static allDrivers = [];

  constructor(attributes)
  {
    let whitelist = ["id", "name", "email"];
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
      let driversCars = [];
  
      for (let i = 0; i < driver.data.relationships.cars.data.length; i++)
      {
        driversCars.push(driver.data.relationships.cars.data[i]);
      }
  
      let newDriver = new Driver(driver.data.attributes);
      newDriver.cars = Array.from(driversCars);
    });
  }
}