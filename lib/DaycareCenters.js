DaycareCenters = new Mongo.Collection("daycareCenters");

Modules = {};
Modules.lib = {};

function fullAddress(location) {
  return location.address + ', ' + location.city + ', ' + location.state + ' ' + location.zipCode;
}

Modules.lib.fullAddress = fullAddress;
