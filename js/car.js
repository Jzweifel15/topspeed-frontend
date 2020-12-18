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
}