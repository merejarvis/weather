require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
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
app.use(flash())

// to read require bodyParser. bodyparser package reads form data in Express
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(session({ cookie: { maxAge: 60000 },
                  secret: 'woot',
                  resave: false,
                  saveUninitialized: false}));

app.use('/', weatherRoute)

app.get('/', function (req, res){
  res.render('./home/home', {message: req.flash('error')})
})

var port = process.env.PORT || 8000

app.listen(port, function () {
  console.log('express is running on port 8000')
})
