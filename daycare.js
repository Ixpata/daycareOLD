if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    daycareCenters: [
      { text: "r" },
      { text: "s"},
      { text: "v" }
    ]
  });
}
