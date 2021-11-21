const axios = require('axios')
require('dotenv').config()

const api = axios.create({
    baseURL: `${process.env.BACKEND_BASE_URL}:${process.env.BACKEND_PORT}`
})

const Transmitter = {
    resource: 'sensors',

    postPayload(payload) {
      api.post(`/${this.resource}`, payload)
      .then(res => {
        console.log(`Backend responded with status code: ${res.status}`)
        })
      .catch(error => {
        console.error(error)
      })
    }
}

module.exports = Transmitter