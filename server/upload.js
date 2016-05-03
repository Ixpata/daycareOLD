Meteor.methods({
  parseUpload( data ) {
    check( data, Array );
    var geo = new GeoCoder({
      apiKey: 'AIzaSyBvN3G7mN-j-mzHNYyGYCMJp7ps1G7yhvA',
      httpAdapter: "https"
    });
    var dayCareLatLng = geo.geocode('29 champs elysée paris');
    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = DaycareCenters.findOne( { programId: item.programId } );

      if ( !exists ) {
        //var dayCareLatLng = geo.geocode(item.address + ', ' + item.city + ', ' + item.state + ' ' + item.zipCode);
        DaycareCenters.insert( item, function(error, result) {
          DaycareCenters.update(result, {$set: {latLng: {
             lat: dayCareLatLng[0].latitude,
             lng: dayCareLatLng[0].longitude}}})
        } );
      } else {
        console.warn( 'Rejected. This item already exists.' );
      }
    }
  }
});
