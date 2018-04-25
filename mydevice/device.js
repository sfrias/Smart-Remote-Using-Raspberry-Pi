//Get Library
var mqtt = require('mqtt')
var Wemo = require('wemo-client');
var wemo = new Wemo();

//Use my cloudmqtt credentials
var client  = mqtt.connect('Server Name:Port No.', {
  username: "User",
  password: "Password"
})

// When I connected, do something
client.on('connect', function () {
  console.log("Connected to MQTT.")

  client.subscribe('fromServer')
})

//Recieve Message
client.on('message', function (topic) {
  if (topic === 'fromServer') {
    console.log("message recieved")

    toggleLight();
  } else {
    console.log("oops you're stupid")
  }

})

var state = '0';
//Toggle WeMo Switch
function toggleLight() {
  if(!client){
    return;
  }
      //console.log('state is: ' + state);
      client.setBinaryState(state === '1' ? '0' : '1');
      console.log("toggleLight ran")

  }

var client;
wemo.discover(function(err, deviceInfo) {
  console.log('Wemo Device Found: %j', deviceInfo);

  // Get the client for the found device
  client = wemo.client(deviceInfo);

  // You definitely want to listen to error events (e.g. device went offline),
  // Node will throw them as an exception if they are left unhandled
  client.on('error', function(err) {
    console.log('Error: %s', err.code);
  });

  // Handle BinaryState events
  client.on('binaryState', function(value) {
    state = value;
    console.log('Binary State changed to: %s', value);
  });

});
