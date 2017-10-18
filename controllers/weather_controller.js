const Weather = require('../models/Weather')
const request= require('request')


function weatherQuery (req, res){
// res.send(req.body)
  var url = 'http://api.worldweatheronline.com/premium/v1/weather.ashx?'
  var location = 'q=' + req.body.location
  var num = 'num_of_days=1'
  var api = 'key=' + process.env.weather_key
  var format= 'format=JSON'
  var tp = 'tp=1'

  var urlStr = url + api + '&' + location + '&' + num + '&' + format + '&' + tp

  request (urlStr, function (error, response, body) {
      var hourly= JSON.parse(body).data.weather[0].hourly
      var arrs = []
      var date = JSON.parse(body).data.weather[0].date

      var city = JSON.parse(body).data.request[0].query
      var current_time= JSON.parse(body).data.current_condition[0].observation_time
      var current_temp= JSON.parse(body).data.current_condition[0].temp_C
      var current_desc= JSON.parse(body).data.current_condition[0].weatherDesc[0].value
      var current_precip= JSON.parse(body).data.current_condition[0].precipMM

      for(var i = 0; i<hourly.length; i++){
        var obj = {}
        obj.time = hourly[i].time
        obj.temp = hourly[i].tempC
        obj.desc = hourly[i].weatherDesc[0].value
        obj.precip = hourly[i].precipMM
        obj.rain = hourly[i].chanceofrain

        arrs.push(obj)
      }
      console.log(arrs);
      res.render('./weather/weather', {arrs: arrs, city: city, current_time: current_time, current_temp: current_temp, current_desc: current_desc, date: date})
  })
}


  module.exports= {weatherQuery}
