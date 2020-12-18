class DriversCar 
{
  static allDriversCars = [];

  constructor(id, carId, driverId)
  {
    this._id = id;
    this._carId = carId;
    this._driverId = driverId;
    DriversCar.allDriversCars.push(this);
  }

  get driverId()
  {
    return this._driverId;
  }

  get carId()
  {
    return this._carId;
  }

  static get all()
  {
    return DriversCar.allDriversCars;
  }
}