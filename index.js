//including modules 
const express = require(express)

//creating an express app
const app = express()

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(3000)