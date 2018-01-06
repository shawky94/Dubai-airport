var airLineCarriers = require('../assets/airlines.json');
var allCities = require('../assets/cities.json');
var chrono = require('chrono-node');


module.exports = class Parser {

  static tokenizeSearchQuery(searchQuery) {

    searchQuery = searchQuery.toLowerCase()

    // elimenating white spaces and tabs
    var tokens = searchQuery.match(/\S+/g) || []

    return tokens
  }

  static getCarrierName(searchQuery) {
    searchQuery = searchQuery.toLowerCase()
    var matchLlength = 0
    var carrierName
    for(var index in airLineCarriers) {
      if(searchQuery.includes((airLineCarriers[index].name).toLowerCase())) {
        // finding the longest matching airline name
        if(airLineCarriers[index].name.length > matchLlength) {
          matchLlength = airLineCarriers[index].name.length
          carrierName = airLineCarriers[index].name
        }
      }
    }

    return carrierName
  }

  static getCityName(searchQuery) {
    searchQuery = searchQuery.toLowerCase()
    var matchLlength = 0
    var cityName
    for(var index in allCities) {

      if(searchQuery.includes((allCities[index].city).toLowerCase())) {
        // finding the longest matching airline name
        if(allCities[index].city.length > matchLlength) {
          matchLlength = allCities[index].city.length
          cityName = allCities[index].city
        }
      }
    }

    return cityName
  }

  static isArrivingFlight(searchQuery) {
    searchQuery = searchQuery.toLowerCase()
    if(searchQuery.includes(" from ") || searchQuery.includes("from ") ) {

      return true
    }
    else {

      return false
    }
  }

  static getSearchingDateInterval(searchQuery) {
    searchQuery = searchQuery.toLowerCase()
    // handling spectial keywords
    if (searchQuery.includes("weekend") || searchQuery.includes("week end")) {
      var weekendStart = chrono.parseDate("Saturday")
      //get the beginning of Saturday
      weekendStart.setHours(0);

      // get the end of Sunday (2 days ahead of Saturday)
      var weekendFinish = new Date(weekendStart.getTime() + 2 * 24 * 60 * 60 * 1000)

      //converting dates to timestamp
      weekendStart = weekendStart.getTime();
      weekendFinish = weekendFinish.getTime();
      var searchingIntervalTimestamp = {
        "startDate": weekendStart,
        "endDate": weekendFinish
      }

      return searchingIntervalTimestamp
    }

    // natural language processing module to extract date out of query
    var startDate = chrono.parseDate(searchQuery)
    if(startDate) {
      startDate.setHours(0);
      var endDate = new Date(startDate.getTime() + 24*60*60*1000)
      // converting date to timestamp
      startDate = startDate.getTime()
      endDate = endDate.getTime()
      var searchingIntervalTimestamp = {
        "startDate": startDate,
        "endDate": endDate
      }

      return searchingIntervalTimestamp
    }
  }


}
