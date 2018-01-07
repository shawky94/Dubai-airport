# Dubai Airport Search

This is a web application which allow user search for flight from/to Dubai International Airport.
Node.js is used as a server side technology. Also the application uses MongoDB to cache flights.
The application is totally hosted on heroku server.

## Data consistency vs performance

The endpoint supported by Dubai Airport refreshes every 1 minute so the application send a request to these endpoints every 1 minute to update the data stored in the database.
The application uses a 'cron-job' which runs every 1 min to call the application's endpoint 'api/refreshFlightsData' which get flights data from Dubai Airport endpoints and update flights data in the database.
The application has an efficient searching api with low latency as the application query its databsae directly without having to request Dubai Airport api which improved the performance.
This technique guarantees that data is always consistant and at the same time it has small response time.

## Application portal

1- search portal :
  -link : https://prototype-flight-test.herokuapp.com/


## Backend endpoint

1- search endpoint:
  -Method : GET
  -url : 'https://prototype-flight-test.herokuapp.com/api/search?searchQuery=' + searchQuery

2- refresh flights endpoint (used by cron-job):
  -Method: GET
  -url : http://prototype-flight-test.herokuapp.com/api/refreshFlightsData


## Contact
    For any questions email me "ahmedselsabagh94@gmail.com"
