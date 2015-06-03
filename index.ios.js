/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

/*global require, console*/

'use strict';

var React = require('react-native');
var DeviceEventEmitter = React.DeviceEventEmitter;

var Beacons = require('react-native-ibeacon');

// Define a region which can be identifier + uuid, 
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
var region = {
    identifier: 'Estimotes',
    // This uuid only finds original beacons, not new style nearable stickers
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'    
};

// Request for authorization while the app is open
Beacons.requestWhenInUseAuthorization();

Beacons.startRangingBeaconsInRegion(region);

Beacons.startUpdatingLocation();

var AppRegistry = React.AppRegistry;
var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;

var fact0ryx_ios = React.createClass({
  listen: function(data) {
    //sort by minor
    data.beacons.sort(function(a, b) {
      if (a.minor < b.minor) {
        return -1;
      }
      if (a.minor > b.minor) {
        return 1;
      }
      return 0;
    });
    this.setState({beacons: data.beacons});
  },
  getInitialState: function(){
    return {
      beacons: []
    };
  },
  componentWillMount: function(){
    // Listen for beacon changes
    var subscription = DeviceEventEmitter.addListener(
      'beaconsDidRange', this.listen
    );
  },
  render: function() {
    var beacons = this.state.beacons.map(function(beacon){

    //    .uuid
    //    .major - The major version of a beacon
    //    .minor - The minor version of a beacon
    //    .rssi - Signal strength: RSSI value (between -100 and 0)
    //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
    //    .accuracy - The accuracy of a beacon

    return(
      <View>
        <Text>
          {beacon.minor}
        </Text>
        <Text>
          {beacon.proximity}
        </Text>
      </View>
      );
    });

    return (
      <View style={styles.container}>
        <Text>
          Beacons!
        </Text>
        {beacons}
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('fact0ryx_ios', () => fact0ryx_ios);
