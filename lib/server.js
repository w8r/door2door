'use strict';
/*eslint handle-callback-err: 0*/

module.exports = function(options) {

  var express = require('express');
  var bodyParser = require('body-parser');
  var path = require('path');
  var request = require('request');
  require('uuid');

  // require the page rendering logic
  var renderApplication = options.prerender ?
    require('../build/prerender/main.js') :
    require('../config/simple.js');

  // load bundle information from stats
  var stats = require('../build/stats.json');
  var airports = require('../data/airports.json').Airports.Airport;
  var airports_codes = {};

  airports.forEach(function(a, index){
    airports_codes[a['@IATACode']] = index;
  });

  var publicPath = stats.publicPath;

  var SCHIPHOL_API_KEY = 'fe1390f6f4f59b9cac5ab08739e4b877';

  var STYLE_URL = options.separateStylesheet && (publicPath + 'main.css?' + stats.hash);
  var SCRIPT_URL = publicPath + [].concat(stats.assetsByChunkName.main)[0];
  var COMMONS_URL = publicPath + [].concat(stats.assetsByChunkName.commons)[0];

  var app = express();

  // serve the static assets
  app.use('/_assets', express.static(path.join(__dirname, '..', 'build', 'public'), {
    maxAge: '200d' // We can cache them as they include hashes
  }));

  app.use('/api/flights/', function(req, res, next) {
    // request({
    //   url: 'https://api-2445581284910.apicast.io/schiphol/flights?date=' + req.query.date,
    //   method: 'GET',
    //   headers: {
    //     "Content-Type": "application/json",
    //     'key': SCHIPHOL_API_KEY
    //   },
    //   data: { date: req.query.date }
    // }, function (err, response, body) {
    //   if (!err) {
    //     body = JSON.parse(body);
    //     var flights = body.Flights.Flight.filter(function(f){
    //       return f.ArrDep === 'D';
    //     });
    //     body = {
    //       flights: flights.map(function(f) {
    //         if (!Array.isArray(f.Routes.Route)) {
    //           f.Routes.Route = [f.Routes.Route];
    //         }

    //         return f;
    //       })
    //     };

        res.contentType = 'application/json';
        res.end(JSON.stringify(require('../data/flights.json')));
      //}
    //});
  });

  app.use('/api/airports/', function(req, res, next) {
    var body = airports;
    if(req.query.q) {

    }
    res.contentType = 'application/json';
    res.end(JSON.stringify(body));
  });

  app.use('/api/start/', function(req, res, next) {
    res.end(JSON.stringify({"spatialReference":{"wkid":4326,"latestWkid":4326},"locations":[{"name":"Regentesse","extent":{"xmin":4.2775559999999997,"ymin":52.072586999999999,"xmax":4.2875560000000004,"ymax":52.082586999999997},"feature":{"geometry":{"x":4.2825558280004543,"y":52.077587006000499},"attributes":{"Loc_name":"Gaz.WorldGazetteer.POI2","Score":100,"Match_addr":"Regentesse","Addr_type":"POI","Type":"Pharmacy","PlaceName":"Regentesse","Place_addr":"Regentesselaan 105, Den Haag, Zuid-Holland","Phone":"70-3451665","URL":"","Rank":"19","AddBldg":"","AddNum":"","AddNumFrom":"","AddNumTo":"","Side":"","StPreDir":"","StPreType":"","StName":"","StType":"","StDir":"","StAddr":"Regentesselaan 105","Nbrhd":"","City":"Den Haag","Subregion":"Den Haag","Region":"Zuid-Holland","Postal":"","PostalExt":"","Country":"NLD","LangCode":"DUT","Distance":0,"X":4.2825559999999996,"Y":52.077587000000001,"DisplayX":4.2825559999999996,"DisplayY":52.077587000000001,"Xmin":4.2775559999999997,"Xmax":4.2875560000000004,"Ymin":52.072586999999999,"Ymax":52.082586999999997}}}]}));
  });

  app.use('/api/dest/', function(req, res, next) {
    res.end(JSON.stringify({"spatialReference":{"wkid":4326,"latestWkid":4326},"locations":[{"name":"Rue Lepic, 75018, 18e Arrondissement, Paris, Île-de-France","extent":{"xmin":2.328878,"ymin":48.881988,"xmax":2.3388779999999998,"ymax":48.891987999999998},"feature":{"geometry":{"x":2.3338781710004355,"y":48.886988473000486},"attributes":{"Loc_name":"FRA.StreetName","Score":100,"Match_addr":"Rue Lepic, 75018, 18e Arrondissement, Paris, Île-de-France","Addr_type":"StreetName","Type":"","PlaceName":"","Place_addr":"","Phone":"","URL":"","Rank":"","AddBldg":"","AddNum":"","AddNumFrom":"","AddNumTo":"","Side":"","StPreDir":"","StPreType":"Rue","StName":"Lepic","StType":"","StDir":"","StAddr":"Rue Lepic","Nbrhd":"18e Arrondissement","City":"Paris","Subregion":"Paris","Region":"Île-de-France","Postal":"75018","PostalExt":"","Country":"FRA","LangCode":"FRE","Distance":0,"X":2.3338779999999999,"Y":48.886988000000002,"DisplayX":2.3338779999999999,"DisplayY":48.886988000000002,"Xmin":2.328878,"Xmax":2.3388779999999998,"Ymin":48.881988,"Ymax":48.891987999999998}}},{"name":"Passage Lepic, 75018, 18e Arrondissement, Paris, Île-de-France","extent":{"xmin":2.332344,"ymin":48.882582999999997,"xmax":2.336344,"ymax":48.886583000000002},"feature":{"geometry":{"x":2.3343438120004407,"y":48.884583202000499},"attributes":{"Loc_name":"FRA.StreetName","Score":82.299999999999997,"Match_addr":"Passage Lepic, 75018, 18e Arrondissement, Paris, Île-de-France","Addr_type":"StreetName","Type":"","PlaceName":"","Place_addr":"","Phone":"","URL":"","Rank":"","AddBldg":"","AddNum":"","AddNumFrom":"","AddNumTo":"","Side":"","StPreDir":"","StPreType":"Passage","StName":"Lepic","StType":"","StDir":"","StAddr":"Passage Lepic","Nbrhd":"18e Arrondissement","City":"Paris","Subregion":"Paris","Region":"Île-de-France","Postal":"75018","PostalExt":"","Country":"FRA","LangCode":"FRE","Distance":0,"X":2.3343440000000002,"Y":48.884582999999999,"DisplayX":2.3343440000000002,"DisplayY":48.884582999999999,"Xmin":2.332344,"Xmax":2.336344,"Ymin":48.882582999999997,"Ymax":48.886583000000002}}}]}));
  });

  app.use('/', express.static(path.join(__dirname, '..', 'public'), {
  }));

  app.use(bodyParser.json());

  // application
  app.get('/*', function(req, res) {
    renderApplication(req.path, SCRIPT_URL, STYLE_URL, COMMONS_URL, function(err, html) {
      res.contentType = 'text/html; charset=utf8';
      res.end(html);
    });
  });


  var port = +(process.env.PORT || options.defaultPort || 8080);
  app.listen(port, function() {
    console.log('Server listening on port ' + port);
  });
};
