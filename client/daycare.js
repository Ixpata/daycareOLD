Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
    var daycareCenterOne = DaycareCenters.findOne("muJPffNhaGGRmm848");

    var infoWindow = new google.maps.InfoWindow({
      //content: daycareCenterOne.content
      content: Blaze.toHTMLWithData(Template.infoWindow, daycareCenterOne)
    });

    var marker0 = new google.maps.Marker({
      position: Geolocation.latLng(),
      map: map.instance
    });
    var marker1 = new google.maps.Marker({
      position: daycareCenterOne.latLng,
      map: map.instance
    });

    var markers = [marker0, marker1];

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    map.instance.fitBounds(bounds);

    /*   marker0.addListener('click', function() {
      infowindow.open(map.instance, marker0);
    });     */
    marker1.addListener('click', function() {
      infoWindow.open(map.instance, marker1);
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
