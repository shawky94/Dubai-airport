const Parser = require('../Utils/Parser.js');
const Flight = require('../Model/Flight.js');
const Config = require('../../config/Config.js');


module.exports = class SearchController {
    static searchQuery(query) {
      var flightSource;
      var flightDestination;
      var flightDateInterval;
      var flightCarrier;
      var collectionName;

      if(!query) {
        return [];
      }
      // get flight carrier name
      flightCarrier = Parser.getCarrierName(query)

      // get city name
      var flightCity = Parser.getCityName(query)

      if(Parser.isArrivingFlight(query)) {
        flightSource = flightCity
        collectionName = Config.ARRIVAL_COLLECTION
      } else {
        flightDestination = flightCity
        collectionName = Config.DEPARTURE_COLLECTION
      }

      flightDateInterval = Parser.getSearchingDateInterval(query)

      if(!flightSource && !flightDestination && !flightDateInterval && !flightCarrier) {
        return Promise.resolve([])
      }

      var searchParams = {
        "flightCarrier": flightCarrier,
        "flightSource": flightSource,
        "flightDestination": flightDestination,
        "flightDateInterval": flightDateInterval
      }

      console.log(JSON.stringify(searchParams))

      return new Promise(function(resolve, reject) {
        Flight.getFlightsByQuery(searchParams,collectionName)
        .then(function(result) {
          resolve(result)
        }).catch(function(err){
          reject(err)
        })
      })
    }

}
