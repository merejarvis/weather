const express = require('express')
const router = express.Router()
const request = require('request')
const weatherController = require('../controllers/weather_controller')

router.get('/', function(req, res){
  res.send(process.env.weather_key)
  // res.render('./home/home')
})

router.post('/', function(req,res){
  res.send(req.body)
  // app.get('/', function (req, res) {
  // res.render('./home/home')
  // var url = 'http://api.worldweatheronline.com/premium/v1/weather.ashx?'
  // var location = 'q=Singapore'
  // var num = 'num_of_days=2'
  // var api = 'key=957eac45eb314be79e884311171710'
  // var format= 'format=JSON'
  // var tp = 'tp=1'
  //
  // var urlStr = url + api + '&' + location + '&' + num + '&' + format + '&' + tp
  //
  //
  //  request (urlStr, function (error, response, body) {
  //     res.send(JSON.parse(body))
  // });
  // })
})


module.exports = router
