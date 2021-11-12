const axios = require('axios')

const schemaUrl = axios.create({
  baseURL: 'https://raw.githubusercontent.com/vives-projectwerk-2021/pulu-JSON-scheme/main/schema.json'
})

const SchemaFetcher = {
  fetch() {
    return schemaUrl.get()
  }
}

module.exports = {SchemaFetcher}