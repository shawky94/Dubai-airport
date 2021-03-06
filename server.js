var express = require("express")
var bodyParser = require("body-parser");
const Config = require('./config/Config.js')
const SearchController = require('./src/Controller/SearchController.js')
const RequestHandler = require('./src/Utils/RequestHandler.js')
var mongodb = require("mongodb")
var chrono = require('chrono-node')
var path = require("path");
const fs = require("fs")

// Initialize the app.
var app = express();
app.use(bodyParser.json());
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get(['/index','/'],function(req,res){

     res.sendFile(path.join(__dirname+'/src/index.html'));

});

app.get('/src/styles',function(req,res){

     res.sendFile(path.join(__dirname+'/src/styles.css'));

});

app.get('/src/assets/spinner',function(req,res){
    var img = fs.readFileSync(path.join(__dirname + '/src/assets/spinner.gif'));
    res.writeHead(200, {'Content-Type': 'image/gif' });
    res.end(img, 'binary');
});

app.get('/src/assets/dubaiAirport',function(req,res){
    var img = fs.readFileSync(path.join(__dirname + '/src/assets/dubaiAirport.jpg'));
    res.writeHead(200, {'Content-Type': 'image/gif' });
    res.end(img, 'binary');
});

app.get("/api/refreshFlightsData", function(req, res) {
  RequestHandler.populateDatabaseWithFlights();
  res.status(200).json({"message" :"refetching flights in a background job"});

});

app.get("/api/search/", function(req, res) {
  var query = req.query.searchQuery;
  SearchController.searchQuery(query)
  .then(function(result){
    res.status(200).json(result);
  }).catch(function(error) {
    handleError(res, error.message, "Failed to get flights.");
  })

});
