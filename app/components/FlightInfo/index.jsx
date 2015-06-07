'use strict';

var React = require('react'),
    mui   = require('material-ui'),
    Paper = mui.Paper;

module.exports = React.createClass({

  getDefautlProps: function() {
    return {};
  },

  render: function () {
    console.log(this.props, this.state  );
    return <div className='aboutPage pageContent'>
      <Paper zDepth={2}>
      </Paper>
    </div>;
  }
});
