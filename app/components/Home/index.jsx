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
    yesterday.setDate(yesterday.getDate() - 1);

    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);

    return {
        defaultDate: new Date(),
        minDate: yesterday,
        maxDate: endDate
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
      <DatePicker hintText="Select date"
        ref='_datePicker'
        minDate={ this.props.minDate }
        maxDate={ this.props.maxDate }
        formatDate={ this._formatDate }
        autoOk={ true }
        onChange={ this._handleDateSelect } />
    </div>;
  },

  _handleDateSelect: function (date) {
    this.transitionTo('/flight', {date: this.refs._datePicker.getDate() });
  }

});
