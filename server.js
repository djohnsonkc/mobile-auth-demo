/*


This is the http web server for this React app when running on Heroku

To run the React app locally, you can use either of these options:

$ yarn start 

or

$ node server (this will run the build version of the app. Make sure and run "npm run build" to build any recent updates)


*/

const fs = require('fs')
const express = require('express');
const compression = require('compression');
// var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const fakeEndpoint = require('./api/fakeEndpoint');

//process.env.NODE_ENV
//this is set as a config variable at Heroku to production
//locally, it will be "undefined"
//heroku config:set NODE_ENV=production
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, user-local-time, Cache-Control, Pragma, Expires");  
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

//this allows req.body to be parsed 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse cookies
// app.use(cookieParser());

//keep the JSON response as compact as possible
app.set('json spaces', 0);

//helps with performance
app.use(compression());

// cors needed for socket.io
app.use(cors()); // Add cors middleware


//app.use(express.static(__dirname + '/public')); //dont cache while testing app
//use maxAge to enable caching by the client
const one_day = 86400000 //or 24 * 60 * 60 * 1000
const thirtyDays = 2592000000
const oneHour = 3600000;    // 3600000msec == 1hour
const fiveMinutes = 300000; // 
//app.use(express.static(__dirname + '/public', { maxAge: thirty_days })) //using 30 days gets a better YSlow score
app.use(express.static(__dirname + '/build', { maxAge: fiveMinutes }))



app.get('/api/fakeEndpoint', fakeEndpoint.fakeData)


//********************************************************************************
//* IMPORTANT!!! 
//* Wildcard page routes - necessary since Heroku serves build version
//* THIS MUST BE AFTER API ROUTES
//********************************************************************************
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/build/index.html')
})


//********************************************************************************
// Web server
//********************************************************************************
// use 3100 for this if we run in alongside React running on port 3000
// const port = process.env.PORT || 3100; // Use the port that Heroku provides or default to 5000
// app.listen(port, function () {
//     //console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
//     console.log("Express server listening on port " + port);
// });
var port = process.env.PORT || 3100; // Use the port that Heroku provides or default to 5000
app.listen(port, function () {
    //console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
    console.log("Express server listening on port " + port);
}); 

