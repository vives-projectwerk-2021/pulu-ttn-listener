const mqtt = require('mqtt')
const Transmitter = require('./api/data-post.js')
var Validator = require('jsonschema').Validator;
const schema = require('../schema-decoded-payload.json')
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
  let msg = JSON.parse(message.toString())
  console.log(msg)
  let isValid = validateLoraMessage(msg)
  if(isValid){
    let formatted = formatLoraMessage(msg)
    Transmitter.postPayload(formatted)
  }
})

//handle errors
client.on("error", (error) => {
  console.log("Can't connect" + error)
  process.exit(1)
})

var v = new Validator();

function validateLoraMessage(msg) {
  let validatorResult = ""

  try{
    validatorResult = v.validate(msg.uplink_message.decoded_payload, schema)
  } catch (err) {
    console.log(err)
  }

  if(validatorResult.valid){
    console.log("Message is valid")
    return true
  } else {
    console.log("error: " + validatorResult.errors)
    return false
  }
}

function formatLoraMessage(msg) {
  return {
    "message": "sensor-data", 
    "data": {
      "device_id": msg.end_device_ids.device_id,
      "time": msg.received_at,
      "sensors": msg.uplink_message.decoded_payload.sensors
    }
  }
}