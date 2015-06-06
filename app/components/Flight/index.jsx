'use strict';

var xhr       = require('xhr'),
    React     = require('react'),
    Router    = require('react-router'),
    mui       = require('material-ui'),
    TextField = mui.TextField;


module.exports = React.createClass({

  getInitialState: function() {
    return {
      flights: []
    };
  },

  componentDidMount: function() {
    xhr({
      url: this.props.apiUrl,
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        key: this.props.apiKey
      },
      json: {
        date: this.formatDate(this.props.date)
      }
    }, function(err, request, flights) {
      flights = flights.Flights.Flight.filter(function(f){
            return f.ArrDep === 'D';
           });
      console.log(flights);
      if (this.isMounted()) {
         this.setState({
           flights: flights
         });
       }
    }.bind(this));
  },

  getDefaultProps: function () {
    return {
      date: new Date(),
      apiUrl: '/api/flights/'
    }
  },

  formatDate: function(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    if(day < 10) {
      day = '0' + day;
    }
    if(month < 10) {
      month = '0' + month;
    }
    return [date.getFullYear(), month, day].join('-');
  },

  mixins: [Router.Navigation, Router.State],

  render: function() {
    return (
      <div className='flightPage pageContent'>
        <TextField hintText="Destination" />
      </div>
    );
  }
});
