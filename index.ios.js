/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

/*global require, console*/

'use strict';

var React = require('react-native');
var DeviceEventEmitter = React.DeviceEventEmitter;
var Estimote = require('react-native-estimote');

//Estimote.startRangingForType(Estimote.ESTNearableTypeAll);
//Estimote.startMonitoringForType(Estimote.ESTNearableTypeAll);
Estimote.startRangingForIdentifier("4ba718239b91a8b3");
//Estimote.startRangingForIdentifier("9580ebcded0938bb");
//Estimote.startMonitoringForIdentifier("4ba718239b91a8b3");
//Estimote.startMonitoringForIdentifier("9580ebcded0938bb");

var AppRegistry = React.AppRegistry;
var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;

var fact0ryx_ios = React.createClass({
  didRangeNearables: function(data) {
    this.setState({nearables: data.nearables});
  },
  didRangeNearable: function(data) {
    console.log("didRangeNearable", JSON.stringify(data));
  },
  didEnterIdentifierRegion: function(data){
    console.log("didEnterIdentifierRegion", JSON.stringify(data));

  console.log('bro')

    var hue = new jsHue();
    var user = hue.bridge('10.1.10.26').user('newdeveloper');
    user.setLightState(1, { on: true }, function(){
      console.log('light on');
    });

  },
  didExitIdentifierRegion: function(data){
    console.log("didExitIdentifierRegion", JSON.stringify(data));

    var hue = new jsHue();
    var user = hue.bridge('10.1.10.26').user('newdeveloper');
    user.setLightState(1, { on: false }, function(){
      console.log('light off');
    });

  },
  didEnterTypeRegion: function(data){
    console.log("didEnterTypeRegion", JSON.stringify(data));
  },
  didExitTypeRegion: function(data){
    console.log("didExitTypeRegion", JSON.stringify(data));
  },
  rangingFailedWithError: function(data){
    console.log("rangingFailedWithError", JSON.stringify(data));
  },
  monitoringFailedWithError: function(data){
    console.log("monitoringFailedWithError", JSON.stringify(data));
  },
  getInitialState: function(){
    return {
      nearables: []
    };
  },
  componentWillMount: function(){
    var didRangeNearables = DeviceEventEmitter.addListener(
      'didRangeNearables', this.didRangeNearables
    );
    var didRangeNearable = DeviceEventEmitter.addListener(
      'didRangeNearable', this.didRangeNearable
    );
    var didEnterIdentifierRegion = DeviceEventEmitter.addListener(
      'didEnterIdentifierRegion', this.didEnterIdentifierRegion
    );
    var didExitIdentifierRegion = DeviceEventEmitter.addListener(
      'didExitIdentifierRegion', this.didExitIdentifierRegion
    );
    var didEnterTypeRegion = DeviceEventEmitter.addListener(
      'didEnterTypeRegion', this.didEnterTypeRegion
    );
    var didExitTypeRegion = DeviceEventEmitter.addListener(
      'didExitTypeRegion', this.didExitTypeRegion
    );
    var rangingFailedWithError = DeviceEventEmitter.addListener(
      'rangingFailedWithError', this.rangingFailedWithError
    );
    var monitoringFailedWithError = DeviceEventEmitter.addListener(
      'monitoringFailedWithError', this.rangingFailedWithError
    );
  },
  render: function() {
    var nearables = this.state.nearables.map(function(nearable){

    return(
      <View>
        <Text>
          {nearable.identifier}
        </Text>
        <Text>
          {nearable.type}
        </Text>
       <Text>
          {nearable.zone}
        </Text>
       <Text>
          {nearable.rssi}
        </Text>
      </View>
      );
    });

    return (
      <View style={styles.container}>
        <Text>
          Nearables!
        </Text>
        {nearables}
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
