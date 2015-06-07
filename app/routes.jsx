'use strict';

var React        = require('react'),
    Router       = require('react-router'),
    Route        = Router.Route,
    DefaultRoute = Router.DefaultRoute;

// polyfill
if (!Object.assign) {
  Object.assign = React.__spread;
}

// export routes
module.exports = (
  <Route name='app' path='/' handler={require('./components/App')}>
    <Route name='about' handler={require('./components/About')} />
    <Route name='flight' handler={require('./components/Flight')} />
    <Route name='route' handler={require('./components/Route')} />
    <Route name='flight-info' handler={require('./components/FlightInfo')} />
    <DefaultRoute handler={require('./components/Flight')} />
  </Route>
);
