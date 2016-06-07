DaycareCenters = new Mongo.Collection("daycareCenters");

DaycareCenters.helpers({
  fullAddress() {
    return this.address + ', ' + this.city + ', ' + this.state + ' ' + this.zipCode;
  },
  latLng() {
    return {lat: this.location.coordinates[0], lng: this.location.coordinates[1]};
  }
});
