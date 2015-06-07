"use strict";

var React     = require('react'),
    xhr       = require('xhr'),
    qs        = require('qs'),
    _         = require('lodash'),
    mui       = require('material-ui'),
    TextField = mui.TextField,
    Menu      = mui.Menu;

var start = {
  "spatialReference": {
    "wkid": 4326,
    "latestWkid": 4326
  },
  "locations": [
    {
      "name": "Regentesse",
      "extent": {
        "xmin": 4.277556,
        "ymin": 52.072587,
        "xmax": 4.287556,
        "ymax": 52.082587
      },
      "feature": {
        "geometry": {
          "x": 4.282555828000454,
          "y": 52.0775870060005
        },
        "attributes": {
          "Loc_name": "Gaz.WorldGazetteer.POI2",
          "Score": 100,
          "Match_addr": "Regentesselaan 105, Den Haag, Zuid-Holland",
          "Addr_type": "POI",
          "Type": "Pharmacy",
          "PlaceName": "Regentesse",
          "Place_addr": "Regentesselaan 105, Den Haag, Zuid-Holland",
          "Phone": "70-3451665",
          "URL": "",
          "Rank": "19",
          "AddBldg": "",
          "AddNum": "",
          "AddNumFrom": "",
          "AddNumTo": "",
          "Side": "",
          "StPreDir": "",
          "StPreType": "",
          "StName": "",
          "StType": "",
          "StDir": "",
          "StAddr": "Regentesselaan 105",
          "Nbrhd": "",
          "City": "Den Haag",
          "Subregion": "Den Haag",
          "Region": "Zuid-Holland",
          "Postal": "",
          "PostalExt": "",
          "Country": "NLD",
          "LangCode": "DUT",
          "Distance": 0,
          "X": 4.282556,
          "Y": 52.077587,
          "DisplayX": 4.282556,
          "DisplayY": 52.077587,
          "Xmin": 4.277556,
          "Xmax": 4.287556,
          "Ymin": 52.072587,
          "Ymax": 52.082587
        }
      }
    }
  ]
};

var end = {
  "spatialReference": {
    "wkid": 4326,
    "latestWkid": 4326
  },
  "locations": [
    {
      "name": "Rue Lepic, 75018, 18e Arrondissement, Paris, Île-de-France",
      "extent": {
        "xmin": 2.328878,
        "ymin": 48.881988,
        "xmax": 2.338878,
        "ymax": 48.891988
      },
      "feature": {
        "geometry": {
          "x": 2.3338781710004355,
          "y": 48.886988473000486
        },
        "attributes": {
          "Loc_name": "FRA.StreetName",
          "Score": 100,
          "Match_addr": "Rue Lepic, 75018, 18e Arrondissement, Paris, Île-de-France",
          "Addr_type": "StreetName",
          "Type": "",
          "PlaceName": "",
          "Place_addr": "",
          "Phone": "",
          "URL": "",
          "Rank": "",
          "AddBldg": "",
          "AddNum": "",
          "AddNumFrom": "",
          "AddNumTo": "",
          "Side": "",
          "StPreDir": "",
          "StPreType": "Rue",
          "StName": "Lepic",
          "StType": "",
          "StDir": "",
          "StAddr": "Rue Lepic",
          "Nbrhd": "18e Arrondissement",
          "City": "Paris",
          "Subregion": "Paris",
          "Region": "Île-de-France",
          "Postal": "75018",
          "PostalExt": "",
          "Country": "FRA",
          "LangCode": "FRE",
          "Distance": 0,
          "X": 2.333878,
          "Y": 48.886988,
          "DisplayX": 2.333878,
          "DisplayY": 48.886988,
          "Xmin": 2.328878,
          "Xmax": 2.338878,
          "Ymin": 48.881988,
          "Ymax": 48.891988
        }
      }
    },
    {
      "name": "Passage Lepic, 75018, 18e Arrondissement, Paris, Île-de-France",
      "extent": {
        "xmin": 2.332344,
        "ymin": 48.882583,
        "xmax": 2.336344,
        "ymax": 48.886583
      },
      "feature": {
        "geometry": {
          "x": 2.3343438120004407,
          "y": 48.8845832020005
        },
        "attributes": {
          "Loc_name": "FRA.StreetName",
          "Score": 82.3,
          "Match_addr": "Passage Lepic, 75018, 18e Arrondissement, Paris, Île-de-France",
          "Addr_type": "StreetName",
          "Type": "",
          "PlaceName": "",
          "Place_addr": "",
          "Phone": "",
          "URL": "",
          "Rank": "",
          "AddBldg": "",
          "AddNum": "",
          "AddNumFrom": "",
          "AddNumTo": "",
          "Side": "",
          "StPreDir": "",
          "StPreType": "Passage",
          "StName": "Lepic",
          "StType": "",
          "StDir": "",
          "StAddr": "Passage Lepic",
          "Nbrhd": "18e Arrondissement",
          "City": "Paris",
          "Subregion": "Paris",
          "Region": "Île-de-France",
          "Postal": "75018",
          "PostalExt": "",
          "Country": "FRA",
          "LangCode": "FRE",
          "Distance": 0,
          "X": 2.334344,
          "Y": 48.884583,
          "DisplayX": 2.334344,
          "DisplayY": 48.884583,
          "Xmin": 2.332344,
          "Xmax": 2.336344,
          "Ymin": 48.882583,
          "Ymax": 48.886583
        }
      }
    }
  ]
};

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      apiUrl: 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest',
      reverseApiUrl: 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode',
      onSelected: null
    }
  },

  getInitialState: function() {
    return {
      query: null,
      suggests: [],
      data: null
    }
  },

  componentWillMount: function() {
    this.query = _.throttle(this._query.bind(this), 400, { trailing: true });
    this.setState({
      data: this.props.data
    })
  },

  componentDidMount: function() {
    console.log(this.props);
  },

  focus: function() {
    this.refs._query.focus();
  },

  _handleSelect: function(evt, index, data) {
    xhr({
      url: this.props.reverseApiUrl + '?' +
        qs.stringify({
          f:'json',
          // location: JSON.stringify(this.getLocation(data.location.feature)),
          distance: 50
        }),
      json: true
    }, function(err, body, data) {
      if (this.props.data) {
        data = end;
      } else {
        data = start;
      }
      data = data.locations[0];
      this.setState({
        query: data.feature.attributes.Match_addr,
        suggests: [],
        location: data
      });
      if (this.props.onSelected) this.props.onSelected(data);
      this.refs._query.setValue(data.feature.attributes.Match_addr)

    }.bind(this));
  },

  getSuggests: function() {
    return this.state.suggests.map(function (s, i) {
      return {
        payload: i,
        text: s.text,
        location: s
      }
    });
  },

  getValue: function() {
    return { location: this.state.location };
  },

  getLocation: function(feature) {
    return {
      "x": feature.geometry.x,
      "y": feature.geometry.y,
      "spatialReference": { "wkid": 4326 }
    }
  },

  _query: function() {
    var text = this.refs._query.getValue();
    if(this._request) {
      this._request.abort();
    }
    this._request = xhr({
      url: this.props.apiUrl + '?' + qs.stringify({
        f: 'json',
        text: text
      }),
      json: true
    }, function(err, body, data) {
        this.setState({ suggests: data.suggestions });
    }.bind(this));
  },

  render: function() {
    var suggests = (!this.state.suggests || this.state.suggests.length === 0) ?
        '' :
        (
          <Menu menuItems={this.getSuggests()} style={{ width: 'auto' }} onItemTap={this._handleSelect} />
        );
    return (
      <div className={ this.props.hidden ? 'hidden' : '' }>
      <TextField style={{width: '100%'}} ref='_query' hintText={this.props.placeholder} onFocus={this.query} onChange={this.query} />
      {suggests}
      </div>
    );
  }
});
