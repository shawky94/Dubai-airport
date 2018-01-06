const Config = require('../../config/Config.js')


module.exports = class Flight {
    static getFlightsByQuery(queryInDictionaryForm, collectionName) {
      var mongodbQuery = {}
      if (queryInDictionaryForm) {
        if (queryInDictionaryForm.flightCarrier) {
          // regex to search ignoring the case
          var flightCarrier = new RegExp(["^", queryInDictionaryForm.flightCarrier, "$"].join(""), "i");
          mongodbQuery['fullName'] = flightCarrier
        }
        if (queryInDictionaryForm.flightSource) {
          // spectial handling for Dubai city
          if(queryInDictionaryForm.flightSource == "Dubai" ) {
            collectionName = Config.DEPARTURE_COLLECTION
          }
          var flightSource = new RegExp(["^", queryInDictionaryForm.flightSource, "$"].join(""), "i");
          mongodbQuery['lang.en.originName'] = flightSource
        }
        if (queryInDictionaryForm.flightDestination) {
          if(queryInDictionaryForm.flightDestination == "Dubai" ) {
            collectionName = Config.ARRIVAL_COLLECTION
          }
          console.log("1 - " + queryInDictionaryForm.flightDestination)
          var flightDestination = new RegExp(["^", queryInDictionaryForm.flightDestination, "$"].join(""), "i");
          console.log("2 - " + flightDestination)
          mongodbQuery['lang.en.destinationName'] = flightDestination
        }
        if(queryInDictionaryForm.flightDateInterval) {
          var startDateTimestamp = queryInDictionaryForm.flightDateInterval.startDate
          var endDateTimestamp = queryInDictionaryForm.flightDateInterval.endDate
          mongodbQuery['scheduled'] = { '$gte': startDateTimestamp/1000, '$lte': endDateTimestamp/1000 }
        }

        console.log("hahahahah"+mongodbQuery['lang.en.destinationName'] + collectionName)
        return new Promise(function(resolve, reject) {
            Config.db.collection(collectionName).find(mongodbQuery).toArray(function(err, docs) {
            if (err) {
              reject(err)
            } else {
              resolve(docs)
            }
          });
        })
      }
      return Promise.resolve([]);
    }

}
