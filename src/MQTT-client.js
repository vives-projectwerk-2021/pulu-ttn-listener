const mqtt = require('mqtt')
require('dotenv').config()

const client  = mqtt.connect(`mqtt://${process.env.BROKER_ADDRESS}`, 
  {
    'username': `${process.env.MQTT_USERNAME}`,
    'password': `${process.env.MQTT_PASSWORD}`,
    'clientId': 'mqttjs_' + Math.random().toString(16).substr(2, 8)
  })

client.on('connect', function () {
  client.subscribe('#', function (err) {
    if (!err) {
      // client.publish('v3/thomas-simulation@ttn/devices/dev1/down/push', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  // client.end()
})

//handle errors
client.on("error", (error) => {
  console.log("Can't connect" + error)
  process.exit(1)
})