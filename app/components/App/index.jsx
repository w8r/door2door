'use strict';

var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    TopNav       = require('../TopNav'),
    SideNav      = require('../SideNav');

var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

require('./style');

var Application = React.createClass({


  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount: function() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  },


  render: function() {
    return <div className={'application'}>
      <TopNav onMenuIconButtonTouch={this._onMenuIconButtonTouch}/>
      <SideNav ref='sideNav' />
      <RouteHandler />
    </div>;
  },

  _onMenuIconButtonTouch: function() {
    this.refs.sideNav.toggle();
  }
});

module.exports = Application;
