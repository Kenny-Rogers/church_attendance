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
                    members{
                        full_name
                        home_cell
                        occupation
                        contact
                    }
                }
        `
        }).then(api_response => { 
            console.log(api_response) 
            res.render('pages/members', { members:api_response.data.members})
        })
        .catch(error => { 
            console.error(error) 
            res.render('pages/members?status=no_data')
        });
    })

    //this renders the registration page containing all members for http://localhost:3000/members/create
    app.get('/members/create', (req, res) => {
        res.render('pages/add_member')
    })

    app.post('/members/create', (req, res) => {
        // console.log(req.body)
        let form_data = req.body
        let stringified_params = Object.keys(form_data).reduce( (strg,key) => {
            return `${strg} ${key}:"${form_data[key]}",`
        }, '')
        let member_data = stringified_params.slice(0,-1)
        client.mutate({
            mutation: gql`
                mutation {
                    addMember(${member_data}){
                        id
                    }
                }
             `
        }).then(data => {
            console.log(data)
            res.redirect('/members/create?status=created')
        }).catch(error =>{
            console.error(error)
            res.redirect('/members/create?status=failed')
        })
    })

    //this renders the attendance marking page containing all members for http://localhost:3000/member_attendance/ccreate
    app.get('/member_attendance/create', (req, res) => {
         client.query({
            query: gql`
                query {
                    members{
                        id
                        full_name
                        home_cell
                    }
                }
        `
        }).then(api_response => { 
            console.log(api_response) 
            res.render('pages/mark_attendance', { members:api_response.data.members})
        })
        .catch(error => { 
            console.error(error) 
            res.render('pages/members?status=no_data')
        });
        
    })

    //this renders the member details page containing all members for http://localhost:3000/members/{id}
    app.get('/members/id', (req, res) => {
        res.render('pages/member_details')
    })
}