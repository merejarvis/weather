
const request= require('request')


function weatherQuery (req, res){

  var url = 'http://api.worldweatheronline.com/premium/v1/weather.ashx?'
  var location = 'q=' + req.body.location
  var date = 'date=' + req.body.date
  var num = 'num_of_days=1'
  var api = 'key=' + process.env.weather_key
  var format= 'format=JSON'
  var tp = 'tp=1'

  var urlStr = url + api + '&' + location + '&' + date+ '&' + num + '&' + format + '&' + tp

  request (urlStr, function (error, response, body) {
      if(JSON.parse(body).data.hasOwnProperty('error')){
        req.flash('error', 'Invalid location/ date.')
        res.redirect('/')
      }
      else{
        var hourly= JSON.parse(body).data.weather[0].hourly
        var arrs = []
        var date = JSON.parse(body).data.weather[0].date
        var city = JSON.parse(body).data.request[0].query
        var current_time= JSON.parse(body).data.current_condition[0].observation_time
        var current_temp= JSON.parse(body).data.current_condition[0].temp_C
        var current_desc= JSON.parse(body).data.current_condition[0].weatherDesc[0].value
        var current_precip= JSON.parse(body).data.current_condition[0].precipMM
        var current_icon = JSON.parse(body).data.current_condition[0].weatherIconUrl[0].value

        for(var i = 0; i<hourly.length; i++){
          var obj = {}

          if (hourly[i].time.length === 1){
            obj.time = '000' + hourly[i].time
          }else if (hourly[i].time.length === 3){
            obj.time = '0' + hourly[i].time
          }else{
            obj.time = hourly[i].time
          }

          obj.temp = hourly[i].tempC
          obj.desc = hourly[i].weatherDesc[0].value
          obj.precip = hourly[i].precipMM
          obj.rain = hourly[i].chanceofrain
          obj.icon = hourly[i].weatherIconUrl[0].value

          arrs.push(obj)
        }
        console.log(arrs);
        res.render('./weather/weather', {arrs: arrs, city: city, current_time: current_time, current_temp: current_temp, current_desc: current_desc, date: date, current_icon:current_icon})
      }
  })
}


  module.exports= {weatherQuery}
