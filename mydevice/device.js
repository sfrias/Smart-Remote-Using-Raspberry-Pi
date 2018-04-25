//Get Library
var mqtt = require('mqtt')
var Wemo = require('wemo-client');
var wemo = new Wemo();

//Use my cloudmqtt credentials
var client  = mqtt.connect('Server Name:Port No.', {
  username: "User",
  password: "Password"
})

// Connect to MQTT
client.on('connect', function () {
  console.log("Connected to MQTT.")

  client.subscribe('fromServer')
})

//Recieve Message and call toggleLight function
client.on('message', function (topic) {
  if (topic === 'fromServer') {
    console.log("message recieved")

    toggleLight();
  } else {
    console.log("oops you're stupid")
  }

})
//set sate to 0
var state = '0';
//Toggle WeMo Switch
function toggleLight() {
  //if theres no switch don't do anything
  if(!client){
    return;
  }
  //console.log('state is: ' + state);

  //change state 
  client.setBinaryState(state === '1' ? '0' : '1');
  console.log("toggleLight ran")

  }

var client;
//find smart plug
wemo.discover(function(err, deviceInfo) {
  console.log('Wemo Device Found: %j', deviceInfo);

  // Get the client for the found device
  client = wemo.client(deviceInfo);

  //throw exception if there is an error
  client.on('error', function(err) {
    console.log('Error: %s', err.code);
  });

  // Handle BinaryState events
  client.on('binaryState', function(value) {
    state = value;
    console.log('Binary State changed to: %s', value);
  });

});
