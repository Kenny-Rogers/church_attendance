const gql = require('graphql-tag')
const client = require('./apollo_client')

module.exports = (app) => {
    //this renders the dashboard for http://localhost:3000/
    app.get('/', (req, res) => {
        res.render('pages/dashboard')
    })

    //this renders a login screen for http://localhost:3000/login
    app.get('/login', (req, res) => {
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
}