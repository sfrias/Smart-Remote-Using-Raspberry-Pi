
//Get Library
var mqtt = require('mqtt')
const express = require('express')
const app = express()


//Use my cloudmqtt credentials
var client  = mqtt.connect('Server Name:Port No.', {
  username: "User",
  password: "Password"
})

//Connect to MQTT.
client.on('connect', function () {
  //console.log("Connected to MQTT.")
  client.subscribe('fromDevice')
})

//
client.on('message', function (topic, message) {
  if (topic === 'fromDevice') {
    //client.publish('web', 'change State.')
    console.log("message sent.")
    // save message DB
  } else {
    console.log("oops you suck.")
  }
})
//
app.get('/', function (req, res) {
  // load data from DB
  res.send( '<h2>Push Button to Turn Light On.</h2><br><button type="button"><a href="/message">Toggle</button>')
})

//Second page that sends message.
app.get('/message', function (req, res) {
  if(client){
    //Send Message
    client.publish('fromServer','urn:Belkin:device:controllee:1')
    //res.send( 'Sending Message<br><br><a href="/">Link to Index</a>')
    //redirectto index page
    res.redirect('/')
  }
  else{
    console.log("oops you suck")
    //Link to index if page was not redirected
    res.send( 'client was not set up<br><br><a href="/">Link to Index</a>')
  }
})
/*
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
*/
