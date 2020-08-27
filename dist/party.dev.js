"use strict";

var Party = require("./server/models/party");

var getDB = require("./server/getDB");

getDB(function () {
  // Party.find({}, (err, results) => console.log(results))
  console.log("Deleting previous documents...");
  Party.deleteMany({}, function (err, res) {
    return console.log("Deleted ".concat(res.deletedCount, " documents."));
  }).then(function () {
    console.log("Recreating new parties...");
    Party.create({
      title: "Melvin's Birthday Party",
      user: 123,
      venue: "House Party",
      address: "2111 7th Ave, Seattle, WA 98121",
      coords: [-122.332069, 47.606209],
      attendeeCap: 40,
      pictureUrl: "https://scontent.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/73425447_408225356740395_5832168171077692805_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=103&_nc_ohc=T79zF-0BuQAAX_eU8Fj&oh=b62d1dbadfa8b8435bf343f9b605c1c0&oe=5F713BEF",
      description: "Come on over to Melvin's Party! We will have lots of yummy food! Including frozen watermelon treats, bacon wrapped steak, an assortment of cheeses, and lots of pup ice cream!",
      hasFood: true,
      date: "10/20/2020",
      startTime: "5:00pm",
      endTime: "12:00am"
    });
    Party.create({
      title: "Commencement Celebration!",
      user: 1234,
      address: "705 NW 70th St, Seattle, WA 98117",
      coords: [-122.3263022, 47.7145264],
      venue: "Bar",
      attendeeCap: 50,
      pictureUrl: "https://www.cityu.edu/wp-content/uploads/2016/06/LargeGroupPano.jpg?fit=1024%2C333",
      description: "After 17 LONG weeks of AAP, come celebrate with us on all of our outstanding accomplishments! Bring your family, friends, and pets even! This party will be at a pet friendly bar and will include yummy bar foods!",
      hasFood: true,
      date: "08/27/2020",
      startTime: "9:00am",
      endTime: "12:00pm"
    });
    Party.create({
      title: "Oliver's Groovy Dance Party!",
      user: 12345,
      address: "2101 N Northlake Way, Seattle, WA 98103",
      coords: [-122.33493, 47.645037],
      venue: "Park",
      attendeeCap: 150,
      pictureUrl: "https://thepetbooklady.typepad.com/.a/6a00d8347a49a469e201a3fcfca7b9970b-500wi",
      description: "Do you love to dance? Do you love to party? Do you like to meet new friends? Well boy, do we have just the right party for you! We'll be setting up a whole dance floor down at the local park where you dance the night away under the stars! It's BYOB! Make sure to bring your dancing paws!",
      hasFood: false,
      date: "08/29/2020",
      startTime: "9:00pm",
      endTime: "2:00am"
    });
    Party.create({
      title: "Terra's Vegan Feast!",
      user: 123456,
      venue: "Home",
      address: "2111 7th Ave, Seattle, WA 98121",
      coords: [-122.332069, 47.606209],
      attendeeCap: 25,
      pictureUrl: "https://i.ytimg.com/vi/IG3qa0Cz-I0/maxresdefault.jpg",
      description: "Whoever said vegan food had to be boring!? Not this hostess! If you're down to be adventurous and eat some super yummy food, you've got to attend this all vegan eating fest! There will lots of entrees that everyone is familiar with, just with a vegan twist. Don't be scared! Plus, adult refreshments all night long, who can resist!?",
      hasFood: true,
      date: "08/29/2020",
      startTime: "4:00pm",
      endTime: "10:00pm"
    });
    console.log("It's party time!");
    Party.find({}, function (err, results) {
      console.log(results);
    });
  });
}); // mongodb+srv://partymash-admin:cityuproject123!@cluster0.6hwhq.mongodb.net/partymash?retryWrites=true&w=majority