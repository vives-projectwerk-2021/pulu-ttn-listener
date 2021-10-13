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
    console.log(err)
  })
})

client.on('message', (topic, message) => {
  let isValid = validateLoraMessage(JSON.parse(message.toString()))
  if(isValid){
    let formatted = formatLoraMessage(message)
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
    return true
  } else {
    console.log("error: " + validatorResult.errors)
    return false
  }
}

function formatLoraMessage(msg) {
  return {
    "device_id": msg.end_device_ids.device_id,
    "time": msg.received_at,
    "sensors": msg.uplink_message.decoded_payload.sensors
  }
}