class Car
{
  static allCars = [];

  constructor(id, make, model, year, description, imageUrl, msrp, topSpeed)
  {
    this._id = id;
    this._make = make;
    this._model = model;
    this._year = year;
    this._description = description;
    this._imageUrl = imageUrl;
    this._msrp = msrp;
    this._topSpeed = topSpeed;
    Car.allCars.push(this);
  }

  static get all()
  {
    return Car.allCars;
  }

  get id()
  {
    return this._id;
  }

  get make()
  {
    return this._make;
  }

  get model()
  {
    return this._model;
  }

  get year()
  {
    return this._year;
  }

  get description()
  {
    return this._description;
  }

  get imageUrl()
  {
    return this._imageUrl;
  }

  get msrp()
  {
    return this._msrp;
  }

  get topSpeed()
  {
    return this._topSpeed;
  }
}