const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/weather'
const Weather = require('./models/Weather')

// console.log(Movie);

mongoose.connect(url, {
  useMongoClient:true
})

mongoose.Promise = global.Promise



var newWeather = new Weather({
country:'Singapore',
description: 'Super hot',
precipitation: 23,
max_temp: 32,
min_temp: 20,
})

//created newMovie in BSON format. binary, due to the id generated(diff from JSON)
// console.log(newMovie);

newWeather.save(function (err,data){
  if(err) throw err;

  console.log('new weather created');
  console.log(data);
})
