/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

/*global require, console*/

'use strict';

var React = require('react-native');
var DeviceEventEmitter = React.DeviceEventEmitter;
var Estimote = require('react-native-estimote');
var request = require('superagent');
var Beacons = require('react-native-ibeacon');

var AppRegistry = React.AppRegistry;
var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;
var TouchableHighlight = React.TouchableHighlight;
var PushNotificationIOS = React.PushNotificationIOS;

// estimote doesnt use the ios apis so it cant wake us if we're killed
// we wont actually do anything with that data we just want to be woken
var region = {
    identifier: 'Fridge',
    uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF44BA71823'
};

// Request for always so if app is killed and the os sees our guy we're restarted
Beacons.requestAlwaysAuthorization();
Beacons.startMonitoringForRegion(region);
Beacons.startUpdatingLocation();

PushNotificationIOS.requestPermissions();

var fact0ryx_ios = React.createClass({
  lightsOn: function(){
    var self = this;
    request
      .put('http://10.1.10.26/api/newdeveloper/lights/1/state')
      .send({on: true})
      .end(function(err, res){
        console.log(err, res);
        console.log('light ON');
        self.setState({enabled:true});

        var notification = {
          "alertBody":"lights on"
        };

        PushNotificationIOS.presentLocalNotification(notification);
      });
  },
  lightsOff: function(){
    var self = this;
    request
      .put('http://10.1.10.26/api/newdeveloper/lights/1/state')
      .send({on: false})
      .end(function(err, res){
        console.log(err, res);
        console.log('light OFF');
        self.setState({enabled:false});

        var notification = {
          "alertBody":"lights off"
        };

        PushNotificationIOS.presentLocalNotification(notification);
      });
  },
  // gets called for type searches?
  didRangeNearables: function(data) {
    console.log("didRangeNearables", JSON.stringify(data));
    this.setState({nearables: data.nearables});
  },
  // called identifier searches
  didRangeNearable: function(data) {
    console.log("didRangeNearable", JSON.stringify(data));
    // to visualize
    this.setState({nearables: [data.nearable]});

    // or use the members in some kind of hue call
    // data.nearable.identifier;
    // data.nearable.rssi;
    // data.nearable.zone;
    // data.nearable.type;
  },
  didEnterIdentifierRegion: function(data){
    Estimote.startRangingForIdentifier(data.identifier);
    console.log("didEnterIdentifierRegion", JSON.stringify(data));
    this.lightsOn();
  },
  didExitIdentifierRegion: function(data){
    Estimote.stopRangingForIdentifier(data.identifier);
    console.log("didExitIdentifierRegion", JSON.stringify(data));

    // could just walk and remove us, but just empty the array
    this.setState({nearables:[]});

    this.lightsOff();
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
      enabled: false,
      nearables: []
    };
  },
  onPressEnable: function(){
    this.setState({enabled:true});
    this.lightsOn();
    // Estimote.simulateDidEnterRegionForNearable("4ba718239b91a8b3");
  },
  onPressDisable: function(){
    this.setState({enabled:false});
    this.lightsOff();
    // Estimote.simulateDidExitRegionForNearable("4ba718239b91a8b3");
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
        <TouchableHighlight onPress={this.state.enabled ? this.onPressDisable : this.onPressEnable}>
          <Text>{this.state.enabled ? "Turn Off" : "Turn On"}</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

//Estimote.startRangingForType(Estimote.ESTNearableTypeAll);
//Estimote.startMonitoringForType(Estimote.ESTNearableTypeAll);
//Estimote.startRangingForIdentifier("9580ebcded0938bb");
Estimote.startMonitoringForIdentifier("4ba718239b91a8b3");
// Estimote.startMonitoringForIdentifier("9580ebcded0938bb");

// should probabl only be doing this in simulation, either delete or figure out a way to check that
// Estimote.addNearableToSimulation("4ba718239b91a8b3", Estimote.ESTNearableTypeFridge, Estimote.ESTNearableZoneImmediate, -22);


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
