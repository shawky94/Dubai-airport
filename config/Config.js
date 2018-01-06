var mongodb = require("mongodb");

// intializing db connection
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("Database connection ready");

  exports.db =  database;
});

// Initialize global variables
exports.CONTACTS_COLLECTION = "contacts";
exports.ARRIVAL_COLLECTION = "arrivals";
exports.DEPARTURE_COLLECTION = "departures";
