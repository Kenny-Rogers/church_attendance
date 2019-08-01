//including modules 
const express = require('express')
const path = require('path')

//creating an express app
const app = express()

//APP SETTINGS
//creating a link to our images,stylesheets and js
app.use('/public', express.static(path.join(__dirname, '/views/static')))
//setting up the view engine
app.set('view engine', 'ejs')

//ROUTES 
//this renders a page for http://localhost:3000/
app.get('/', (req, res) => {
    // res.send('Hello world')
    res.render('pages/structure')
})

//this renders a page for http://localhost:3000/login
app.get('/login', (req, res)=> {
    res.render('pages/login')
})

//our web application serving webAPP at http://localhost:3000
app.listen(3000)
console.log('Serving app at http://localhost:3000')