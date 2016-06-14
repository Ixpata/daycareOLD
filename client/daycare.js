Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
   var daycareCenters = DaycareCenters.find({
   location: { $near: { $geometry: { type: "Point", coordinates: [ 38.9, -77.1 ] }, $maxDistance: 5000 } } } ).fetch();
    var infoWindow = new google.maps.InfoWindow();

    var markerArray = [];
    for (var i = 0; i < daycareCenters.length; i++) {
      var marker = new google.maps.Marker({
        position: daycareCenters[i].latLng(),
        map: map.instance
      });
      markerArray.push(marker);
    }

    var marker0 = new google.maps.Marker({
      position: Geolocation.latLng(),
      map: map.instance
    });
    markerArray.push(marker0);

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markerArray.length; i++) {
      bounds.extend(markerArray[i].getPosition());
    }
    map.instance.fitBounds(bounds);

    for (var i = 0; i < daycareCenters.length; i++) {
      attachInstructionText(infoWindow, markerArray[i], Blaze.toHTMLWithData(Template.infoWindow, daycareCenters[i]), map);
    }
  });
});

function attachInstructionText(infoWindow, marker, text, map) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(text);
    infoWindow.open(map, marker);
  });
}

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
