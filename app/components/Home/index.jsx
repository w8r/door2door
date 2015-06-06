'use strict';

var React        = require('react'),
    Router       = require('react-router'),
    mui          = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    DatePicker   = mui.DatePicker,
    Snackbar     = mui.Snackbar;

module.exports = React.createClass({

  mixins: [Router.Navigation, Router.State],

  getDefaultProps: function() {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);

    return {
        defaultDate: new Date(),
        minDate: yesterday
    };
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

  render: function() {
    return <div className='homePage pageContent'>
      <h1>Select date</h1>
      <DatePicker hintText="Portrait Dialog"
        ref='_datePicker'
        minDate={ this.props.minDate }
        defaultDate={ this.props.defaultDate }
        formatDate={ this._formatDate }
        autoOk={ true }
        onChange={ this._handleDateSelect } />
    </div>;
  },

  _handleDateSelect: function (date) {
    this.transitionTo('/flight', this.refs._datePicker.getDate());
  }

});
