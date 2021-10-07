const axios = require('axios')

// const api = axios.create({
//     // baseURL: `${process.env.BACKEND_BASE_URL}:${process.env.BACKEND_PORT}`
//     // baseURL: "http://localhost:3000/posts"
// })

const Transmitter = {
    resource: 'posts',

    postPayload(payload) {
        axios.post(`${process.env.BACKEND_BASE_URL}:${process.env.BACKEND_PORT}/posts`, payload)
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