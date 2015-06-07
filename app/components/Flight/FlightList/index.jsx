"use strict";

var React  = require('react'),
    mui    = require('material-ui'),
    Menu   = mui.Menu;

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      data: []
    }
  },

  getInitialState: function() {
    return {
      query: '',
      data: []
    }
  },

  componentDidMount: function() {
    this.setState({
      data: this.props.data
    })
  },

  filter: function(query) {
    var data = this.props.data;
    if (query) {
      var re = new RegExp('(' + query + ')', 'ig');
      data = data.filter(function(flight) {
        var dest = flight.route[0];
        return (
          re.exec(dest.City) ||
          re.exec(dest.Name) ||
          re.exec(dest.Country) ||
          re.exec(dest['@IATACode'])
        );
      });
      this.setState({
        data: data
      });
    }
  },

  _handleSelect: function(evt, index, data) {
    var flight = this.props.data.filter(function(f){
      return f.FlightNumber === data.payload;
    })[0];
    if (!this.props.disabled && this.props.onSelect){
      this.props.onSelect(evt, flight);
    }
  },

  render: function() {
    var hourNow = new Date().getHours();
    var data = this.state.data.filter(function(flight) {
      var hour = parseInt(flight.ScheduleTime.split(':')[0]);
      return hour >= hourNow;
    }).slice(0, 200).map(function(flight, i) {
      var dest = flight.route[0];
      return {
        payload: flight.FlightNumber,
        text: dest.City + ' ' + dest['@IATACode'] + ' ' + flight.FlightNumber + ' ',
        number: flight.ScheduleTime.split(':').slice(0,2).join(':'),
        disabled: dest['@IATACode'] !== 'CDG'
      };
    });
    return (
      <Menu menuItems={data} style={{width: 'auto'}} onItemTap={this._handleSelect} />
    );
  }
});
