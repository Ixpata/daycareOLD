DaycareCenters = new Mongo.Collection("daycareCenters");

Template.body.helpers({
  daycareCenters: function () {
    return DaycareCenters.find({}, {sort: {createdAt: -1}});
  }
});

Template.body.events({
  "submit .new-daycare-center": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    DaycareCenters.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.text.value = "";
  }
});
