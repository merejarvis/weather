require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const request = require('request')
const url = 'mongodb://localhost:27017/weather'
const weatherRoute = require('./routes/weather_route')

mongoose.connect(url, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// can use anything in public folder. use html links path accordingly.
app.use(express.static('public'))

// to read require bodyParser. bodyparser package reads form data in Express
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', weatherRoute)

var port = process.env.PORT || 8000

app.listen(port, function () {
  console.log('express is running on port 8000')
})
