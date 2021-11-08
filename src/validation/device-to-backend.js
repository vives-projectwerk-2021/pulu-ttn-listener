const DeviceToBackend = {

    create: {
        "type": "object",
        "properties": {
            "message": { "type": "string","required":true },
            "data": {
                "device_id": { "type": "string", "required":true },
                "time": { "type": "string","required":true },
                "count": { "type": "integer","required":true },
                "sensors": {
                    "battery": {
                        "status": { "type": "integer" },
                        "value": { "type": "integer" }
                    },
                    "light": {
                        "status": { "type": "integer" },
                        "value": { "type": "integer" }
                    },
                    "moisture": {
                        "level1": {
                            "status":{"type":"integer"},
                            "value":{"type":"integer"}
                        },
                        "level2": {
                            "status":{"type":"integer"},
                            "value":{"type":"integer"}
                        },
                        "level3": {
                            "status":{"type":"integer"},
                            "value":{"type":"integer"}
                        },
                        "level4": {
                            "status":{"type":"integer"},
                            "value":{"type":"integer"}
                        }
                    },
                    "temperature":{
                        "air":{
                            "status":{"type":"integer"},
                            "value":{"type":"integer"}
                        },
                        "ground":{
                            "status":{"type":"integer"},
                            "value":{"type":"integer"}
                        }
                    }
                },
                "meta":{
                    "gateway_cnt":{"type":"integer"},
                    "strongest_rssi":{"type":"integeer"}
                }
            }
        },
        "additionalProperties": true
        //RSSI might be added, so additionalProps is true for now
    }
}

/* export { DeviceToBackend } */
module.exports = DeviceToBackend