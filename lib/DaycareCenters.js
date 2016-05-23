DaycareCenters = new Mongo.Collection("daycareCenters");

DaycareCenters.helpers({
  fullAddress() {
    return this.address + ', ' + this.city + ', ' + this.state + ' ' + this.zipCode;
  }
});
