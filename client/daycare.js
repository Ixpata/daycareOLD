/* global DaycareCenters */
DaycareCenters = new Mongo.Collection("daycareCenters");

Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
    var latLng = Geolocation.latLng();
    var daycareCenter = DaycareCenters.findOne();

    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">' + daycareCenter.name + '</h1>'+
      '<div id="bodyContent">'+
      '<p><b>' + daycareCenter.name + '</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latLng.lat, latLng.lng),
      map: map.instance
    });
    marker.addListener('click', function() {
      infowindow.open(map.instance, marker);
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
