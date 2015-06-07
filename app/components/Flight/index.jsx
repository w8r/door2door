'use strict';

var xhr              = global.xhr =require('xhr'),
    React            = require('react'),
    Router           = require('react-router'),
    mui              = require('material-ui'),
    CircularProgress = mui.CircularProgress,
    TextField        = mui.TextField,
    DatePicker       = mui.DatePicker,
    Paper            = mui.Paper,
    FlatButton       = mui.FlatButton,
    FontIcon         = mui.FontIcon,
    FlightList       = require('./FlightList'),
    Location         = require('./Location');


require('./flight.scss');

module.exports = React.createClass({

  mixins: [Router.Navigation, Router.State],

  getInitialState: function() {
    return {
      flights: [],
      flight: null,
      start: null,
      dest: null,
      date: null
    };
  },

  getDefaultProps: function () {
    return {
      date: new Date(),
      apiUrl: '/api/flights/'
    }
  },

  componentDidMount: function() {
    this._getFlightData();
  },

  _getFlightData: function(date) {
    xhr({
      url: this.props.apiUrl + '?date=' +
            this.formatDate(this.state.date || this.props.date),
      method: 'GET',
      json: true
    }, function(err, request, data) {
      if (this.isMounted()) {
         this.setState({
           flights: data.flights
         });
         this.refs._search.focus();
       }
    }.bind(this));
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

  _formatDate: function(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    if(day < 10) {
      day = '0' + day;
    }
    if(month < 10) {
      month = '0' + month;
    }
    return [day, month, date.getFullYear()].join('-');
  },

  onSearch: function() {
    var query = this.refs._search.getValue();
    if (this.refs._list) {
      this.refs._list.filter(query);
    }
  },

  _onFlightSelect: function(evt, flight) {
    this.setState({
      flight: flight
    });

    setTimeout(function() {
      this.refs._start.focus();
    }.bind(this), 100);
    //this.transitionTo('/flight-info', {id: flight.FlightNumber});
  },

  _handleDateSelect: function (evt, date) {
    this.setState({
      date: date,
      flights: [],
      flight: null
    });
    this._getFlightData();
  },

  _handleFlightReset: function(evt) {
    this.setState({ flight: null });
  },

  proceed: function() {
    this.transitionTo('/route', {fooo:2});
  },

  getFlightDestination: function() {
    if (this.state.flight) {
      return this.state.flight.route[0];
    } else return null;
  },

  onStartSelected: function(data) {
    this.setState({
      start: data
    });
    setTimeout(function(){
      this.refs._dest.focus();
    }.bind(this), 100);
  },

  onEndSelected: function(data) {
    this.setState({
      dest: data
    });
  },

  render: function() {
    var flights, flightBlock, homeBlock, destinationBlock;

    if(this.state.date) {
      if (this.state.flights.length === 0) {
        flights = (
          <div>
            <CircularProgress mode="indeterminate" />
          </div>
        );
      } else {
        flights = (
          <FlightList ref='_list' data={ this.state.flights } onSelect={this._onFlightSelect} />
        );
      }
    }

    var flight = this.state.flight;
    if(flight) {
      flightBlock = (
        <FlatButton onTouchTap={ this._handleFlightReset } style={{ width: '100%' }}>
          <div className="flight">
            <FontIcon className="muidocs-icon-flight-takeoff" />
            <span className="flight-number">{ flight.FlightNumber }</span>
            <span className="flight-destination">{ flight.route[0].City }</span>
            <span className="flight-destination-code">{ flight.route[0]['@IATACode'] }</span>
            <span className="flight-time">{ flight.ScheduleTime.split(':').slice(0,2).join(':') }</span>
          </div>
        </FlatButton>
      );
    } else {
      flightBlock = (
        <Paper zDepth={0}>
          <TextField ref='_search' hintText="Destination" disabled={!this.state.date} onChange={this.onSearch} />
          { flights }
        </Paper>
      );
    }

    return (
      <div className='flightPage pageContent'>
        <DatePicker hintText="Select date"
          ref='_datePicker'
          minDate={ this.props.minDate }
          maxDate={ this.props.maxDate }
          formatDate={ this._formatDate }
          defaultDate={ this.state.date }
          autoOk={ true }
          style={{ width: '100%' }}
          onChange={ this._handleDateSelect } />
        <div className={ this.state.date ? '' : 'hidden' }>
          { flightBlock }
          <Location
            ref='_start'
            placeholder={'Start'}
            hidden={!this.state.flight}
            onSelected={this.onStartSelected}
            disabled={!!this.state.flight} />
          <Location
            ref='_dest'
            data={this.getFlightDestination()}
            placeholder={'Destination'}
            hidden={!this.state.flight}
            onSelected={this.onEndSelected}
            disabled={!!this.state.flight} />
          <div className={ this.state.dest && this.state.start ? '' : 'hidden' }>
            <FlatButton label="Go!" style={{minWidth: '100%'}} primary={true} onTouchTap={this.proceed} />
          </div>
        </div>
      </div>
    );
  }
});
