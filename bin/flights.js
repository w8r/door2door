"use strict";

var request = require('request');
var SCHIPHOL_API_KEY = 'fe1390f6f4f59b9cac5ab08739e4b877';
var airports = require('../data/airports.json').Airports.Airport;

var airports_codes = {};
airports.forEach(function(a, index){
  airports_codes[a['@IATACode']] = index;
});

var date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
if (day < 10) {
  day = '0' + day;
}
if (month < 10) {
  month = '0' + month;
}
date = [date.getFullYear(), month, day].join('-');

// return console.log(JSON.stringify(airports_codes, 0,2));

request({
  url: 'https://api-2445581284910.apicast.io/schiphol/flights?date=' + date,
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'key': SCHIPHOL_API_KEY
    }
  }, function (err, response, body) {
    if (!err) {
      body = JSON.parse(body);
      var flights = body.Flights.Flight.filter(function(f){
        return f.ArrDep === 'D';
      });
      body = {
        flights: flights.map(function(f) {
          if (!Array.isArray(f.Routes.Route)) {
            f.Routes.Route = [f.Routes.Route];
          }
          f.route = f.Routes.Route.map(function(r){
            return airports[airports_codes[r['@iata']]];
          });
          return f;
        })
      };
      console.log(JSON.stringify(body));
    }
});
