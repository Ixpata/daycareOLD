DaycareCenters = new Mongo.Collection("daycareCenters");

Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
    var latLng = Geolocation.latLng();

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latLng.lat, latLng.lng),
      map: map.instance
    });
  });
});

Template.body.helpers({
  daycareCenters: function () {
    return DaycareCenters.find({}, {sort: {createdAt: -1}});
  }
});

Template.map.helpers({
  mapOptions: function() {
    // Make sure the maps API has loaded
    var latLng = Geolocation.latLng();
    if (GoogleMaps.loaded() && latLng) {
      // Map initialization options
      return {
        //center: new google.maps.LatLng(-37.8136, 144.9631), // Geolocation.latLng();
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: 8
      };
    }
  }
});

Template.body.events({
  "submit .new-daycare-center": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var name = event.target.name.value;
    var address = event.target.address.value;

    // Insert a task into the collection
    DaycareCenters.insert({
      name: name,
      address: address,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.name.value = "";
    event.target.address.value = "";
  }
});
