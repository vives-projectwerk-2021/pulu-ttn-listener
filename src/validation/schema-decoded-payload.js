const axios = require('axios')

const schemaUrl = axios.create({
  baseURL: 'https://raw.githubusercontent.com/vives-projectwerk-2021/pulu-JSON-scheme/main/schema.json'
})

const SchemaFetcher = {
  fetch() {
    schemaUrl.get()
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

module.exports = SchemaFetcher