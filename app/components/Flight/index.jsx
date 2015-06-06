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
    console.log('call')
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
    }, function(flights) {
      console.log(flights);
      // if (this.isMounted()) {
      //   this.setState({
      //     username: lastGist.owner.login,
      //     lastGistUrl: lastGist.html_url
      //   });
      // }
    }.bind(this));
  },

  getDefaultProps: function () {
    return {
      date: new Date(),
      apiKey: 'fe1390f6f4f59b9cac5ab08739e4b877',
      apiUrl: 'https://api-2445581284910.apicast.io/schiphol/flights',
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
