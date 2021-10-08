const axios = require('axios')
require('dotenv').config()

const api = axios.create({
    baseURL: `${process.env.BACKEND_BASE_URL}:${process.env.BACKEND_PORT}`
})

const Transmitter = {
    resource: 'posts',

    postPayload(payload) {
      api.post(`/${this.resource}`, payload)
      .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res.data)
        })
      .catch(error => {
        console.error(error)
      })
    }
}

module.exports = Transmitter