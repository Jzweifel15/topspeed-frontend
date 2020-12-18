class Driver
{
  constructor(attributes)
  {
    let whitelist = ["name", "email"];
    whitelist.forEach(attr => this[attr] = attributes[attr]);
    this.cars = [];
  }
}