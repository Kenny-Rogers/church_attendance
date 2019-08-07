const fetch = require('node-fetch')
const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { createHttpLink } = require('apollo-link-http')
const { apollo_server_url } = require('./config.js')

//creating ApolloClient
const client = new ApolloClient({
    link: createHttpLink({ uri: apollo_server_url, fetch: fetch }),
    cache: new InMemoryCache()
});

module.exports = client