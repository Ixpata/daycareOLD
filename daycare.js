if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    daycareCenters: [
      { text: "Bob's daycare" },
      { text: "s"},
      { text: "v" }
    ]
  });
}
