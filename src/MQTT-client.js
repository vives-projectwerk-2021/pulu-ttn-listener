const mqtt = require('mqtt')
const Transmitter = require('./api/data-post.js')
require('dotenv').config()

const client  = mqtt.connect(`mqtt://${process.env.BROKER_ADDRESS}`, {
  'username': `${process.env.MQTT_USERNAME}`,
  'password': `${process.env.MQTT_PASSWORD}`,
  'clientId': 'mqttjs_' + Math.random().toString(16).substr(2, 8)
})

client.on('connect', () => {
  client.subscribe('#', (err) => {
    // console.log(err)
  })
})

client.on('message', (topic, message) => {
  let formatted = filterLoraMessage(JSON.parse(message.toString()))
  Transmitter.postPayload(formatted)
})

//handle errors
client.on("error", (error) => {
  console.log("Can't connect" + error)
  process.exit(1)
})

function filterLoraMessage(msg) {
  return {
    //TODO: Keep only usable data
    msg
  }
}