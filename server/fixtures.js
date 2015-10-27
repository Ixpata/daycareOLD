if (DaycareCenters.find().count() === 0) {
  DaycareCenters.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  });
  DaycareCenters.insert({
    title: 'Meteor',
    url: 'http://meteor.com'
  });
  DaycareCenters.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  });
}
