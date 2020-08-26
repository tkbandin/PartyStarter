const mongoose = require("mongoose");

const getDB = (cb) => {
  var mongodb_options = { useNewUrlParser: true, useUnifiedTopology: true };
  if (process.env.MONGODB_URI) {
    console.log("[DEBUG] Connecting to mongo from MONGODB_URI");
    mongoose.connect(process.env.MONGODB_URI, mongodb_options);
  } else {
    console.log("[DEBUG] Connecting to local mongodb");
    mongoose.connect(
      "mongodb+srv://partymash-admin:cityuproject123!@cluster0.6hwhq.mongodb.net/partymash?retryWrites=true&w=majority",
      mongodb_options
    );
    // mongoose.connect("mongodb://localhost/partymash", mongodb_options);
  }

  mongoose.connection.on("error", function (err) {
    console.error("\nMongoDB connection error: " + err);
    process.exit(-1);
  });
  mongoose.connection.once("open", function () {
    console.log("\nMongoose has connected to MongoDB!");
    if (cb) {
      cb();
    }
  });
};

module.exports = getDB;
