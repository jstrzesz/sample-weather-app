const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const weather = require('../api_helpers/api_helper');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/currentWeather', (req, res) => {
  console.log(req.body.params.input, 'line 11');
  let weatherInfo = {};
  weather.getCurrentWeather(req.body.params.input)
    .then(data => {
      console.log(data, 'line 15')
      weatherInfo.city = data.name;
      weatherInfo.country = data.sys.country;
      weatherInfo.temp = Math.ceil(data.main.temp);
      weatherInfo.humidty = data.main.humidty;
      weatherInfo.forecast = data.weather[0].description;
      weatherInfo.lowTemp = data.main.temp_min;
      weatherInfo.highTemp = data.main.temp_max;
      weatherInfo.sunrise = data.sys.sunrise;
      weatherInfo.sunset = data.sys.sunset;
      weatherInfo.timeStamp = data.dt;
    })
    .then(() => res.send(weatherInfo))
})

app.post('/forecast', (req, res) => {
  console.log(req.body.params.input, 'line 24')
  let forecastInfoArray = [];
  let forecastInfo = {};
  weather.get5DayForecast(req.body.params.input)
    .then(data => {
      console.log(data, 'line 35');
      data.list.forEach(day => {
        forecastInfo.city = data.name;
        forecastInfo.country = data.country;
        forecastInfo.population = data.population;
        forecastInfo.date = day.dt;
        forecastInfo.temp = day.main.temp;
        forecastInfo.min_temp = day.main.temp_min;
        forecastInfo.max_temp = day.main.temp_max;
        forecastInfo.pressure = day.main.pressure;
        forecastInfo.weather = day.weather[0].main;
        forecastInfo.weatherDesc = day.weather[0].description;
        forecastInfo.windSpeed = day.wind.speed;
        forecastInfo.windDir = day.wind.deg;
        // forecastInfo.sys = day.sys;
        forecastInfo.date_text = day.dt_txt;
        forecastInfoArray.push(forecastInfo);
      })
      res.send(forecastInfoArray);
    })
})

app.listen(port, () => {
  console.log(`sample-weather-app listening on ${port}`)
});