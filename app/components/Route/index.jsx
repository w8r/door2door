'use strict';

var React  = require('react'),
    Router = require('react-router');

module.exports = React.createClass({

  mixins: [Router.Navigation, Router.State],

  getInitialState: function() {
    return {
      flight: null,
      home: null,
      dest: null,
      date: null
    };
  },

  getDefaultProps: function () {
    return {
      date: null,
      apiUrl: '/api/flights/'
    }
  },

  componentWillMount: function() {
    console.log(this.context.router.getCurrentParams(), arguments)
  },

  render: function() {
    return (
       <div className='flightPage pageContent'>
       </div>
    );
  }

});
