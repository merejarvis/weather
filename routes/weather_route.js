const express = require('express')
const router = express.Router()
const request = require('request')
const weatherController = require('../controllers/weather_controller')

router.get('/', function (req, res){
  res.render('./home/home')
})

router.post('/', weatherController.weatherQuery)

// router.get('/weather', function(req, res){
//   res.render('./weather/weather')
// })

module.exports = router
