Meteor.methods({
  parseUpload( data ) {
    check( data, Array );

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = DaycareCenters.findOne( { programId: item.programId } );

      if ( !exists ) {
        DaycareCenters.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists.' );
      }
    }
  }
});
