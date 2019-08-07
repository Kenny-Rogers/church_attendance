//including modules 
const express = require('express')
const path = require('path')
const gql  = require('graphql-tag')
const fetch = require('node-fetch')

const { ApolloClient } = require('apollo-client')
const { InMemoryCache }= require('apollo-cache-inmemory')
const { createHttpLink } = require('apollo-link-http')
const { port, apollo_server_url } = require('./config.js')

//creating an express app
const app = express()

//creating ApolloClient
const client = new ApolloClient({
    link: createHttpLink({ uri: apollo_server_url , fetch:fetch}),
    cache: new InMemoryCache()
});

//APP SETTINGS
//creating a link to our images,stylesheets and js
app.use('/public', express.static(path.join(__dirname, '/views/static')))
//setting up the view engine
app.set('view engine', 'ejs')

//ROUTES 
//this renders the dashboard for http://localhost:3000/
app.get('/', (req, res) => {
    res.render('pages/dashboard')
})

//this renders a login screen for http://localhost:3000/login
app.get('/login', (req, res)=> {
    res.render('pages/login')
})

//this renders the datatable page containing all members for http://localhost:3000/members
app.get('/members', (req, res) => {
    //makes a request to the GraphQL server
    client.query({
        query: gql`
        query {
                cats{
                id
                name
                }
            }
        `
    }).then(data => console.log(data))
        .catch(error => console.error(error));
    res.render('pages/members')
})

//this renders the registration page containing all members for http://localhost:3000/members/create
app.get('/members/create', (req, res) => {
    res.render('pages/add_member')
})

//this renders the attendance marking page containing all members for http://localhost:3000/member_attendance/ccreate
app.get('/member_attendance/create', (req, res) => {
    res.render('pages/mark_attendance')
})

//this renders the member details page containing all members for http://localhost:3000/members/{id}
app.get('/members/id', (req, res) => {
    res.render('pages/member_details')
})

//our web application serving webAPP at http://localhost:3000
app.listen(port)
console.log(`Serving app at http://localhost:${port}`)