const Request = require('request-promise-native')
const Config = require('../../config/Config.js')


module.exports = class RequestHandler {
    static  populateDatabaseWithFlights() {
      //updating arrival collection
      var arrivalEndPoint = {
        method: 'GET',
        uri: 'http://www.dubaiairports.ae/api/flight/arrivals',
        json: true
      };

      Request(arrivalEndPoint)
      .then(function (body) {
        if(body.flights) {
          Config.db.collection(Config.ARRIVAL_COLLECTION).remove();
          var flights = body.flights;
          flights.forEach(function(item) {
            Config.db.collection(Config.ARRIVAL_COLLECTION).insertOne(item, function(err, doc) {
            });
          });
        }
      }).catch(function (error) {
        console.log("update arrival collection failed")
      });

      // updating departure collection
      var departureEndPoint = {
        method: 'GET',
        uri: 'http://www.dubaiairports.ae/api/flight/departures',
        json: true
      };
      Request(departureEndPoint)
      .then(function (body) {
        if(body.flights) {
          Config.db.collection(Config.DEPARTURE_COLLECTION).remove();
          var flights = body.flights;
          flights.forEach(function(item) {
            Config.db.collection(Config.DEPARTURE_COLLECTION).insertOne(item, function(err, doc) {
            });
          });
        }

      }).catch(function (error) {
        console.log("update departure collection failed")
      });
    }

}
