const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const api = require('../api_helpers/api_helper');
const weather = require('../weather/weatherHelpers');
const db = require('../database/databaseHelpers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/currentWeather', (req, res) => {
  console.log(req.body.params, 'line 11');
  let weatherInfo = {};
  Promise.all([
    api.getCurrentWeather(req.body.params.input),
    weather.createDayNightLabel(req.body.params.hour)
  ])
    .then(data => {
      console.log(data, 'line 15')
      weatherInfo.time_of_day = data[1];
      weatherInfo.city = data[0].name;
      weatherInfo.country = data[0].sys.country;
      weatherInfo.temp = Math.ceil(data[0].main.temp);
      weatherInfo.humidty = data[0].main.humidty;
      weatherInfo.forecast = data[0].weather[0].description;
      weatherInfo.lowTemp = data[0].main.temp_min;
      weatherInfo.highTemp = data[0].main.temp_max;
      weatherInfo.sunrise = data[0].sys.sunrise;
      weatherInfo.sunset = data[0].sys.sunset;
      weatherInfo.timeStamp = data[0].dt;
      if (weatherInfo.country === 'US') {
        weatherInfo.temp = (weatherInfo.temp * 9/5) + 32;
      }
    })
    .then(() => weather.createWeatherText(weatherInfo.time_of_day, weatherInfo.forecast))
    .then(result => {
      console.log(result, 'line 35')
      db.findImage(result, (req, response) => {
        weatherInfo.img = response[0].img;  
        res.send(weatherInfo);
      });
    })
})


app.post('/forecast', (req, res) => {
  console.log(req.body.params.input, 'line 24')
  let forecastInfoArray = [];
  let converted;
  let converted2;
  let converted3;
    api.get5DayForecast(req.body.params.input)
    .then(data => {
      console.log(data.city, 'line 35');
      forecastInfoArray = data.list.map(day => {
        if (data.city.country === 'US') {
          converted = (Number(day.main.temp) * 9/5) + 32;
          converted2 = (Number(Math.ceil(day.main.temp_min)) * 9/5) + 32;
          converted3 = (Number(Math.ceil(day.main.temp_max)) * 9/5) + 32;
        } else {
          converted = day.main.temp;
          converted2 = Math.ceil(day.main.temp_min);
          converted3 = Math.ceil(day.main.temp_max);
        }
        return {
          city: data.city.name,
          country: data.city.country,
          population: data.city.population,
          day: day.dt_txt.slice(5, 10),
          hour: day.dt_txt.slice(-8),
          date: day.dt,
          temp: converted,
          min_temp: converted2,
          max_temp: converted3,
          pressure: day.main.pressure,
          weather: day.weather[0].main,
          weatherDesc: day.weather[0].description,
          windSpeed: day.wind.speed,
          windDir: day.wind.deg,
          date_text: day.dt_txt
        }
      })
      res.send(forecastInfoArray);
    })
  })

app.post('/weatherIcon', (req, res) => {
  weather.createWeatherLabelForFiveDayForecast(req.body.params.text)
  .then(result => {
    let weatherInfo = {};
    db.findImage(result, (request, response) => {
      weatherInfo.img = response[0].img;
      res.send(weatherInfo);
    })
})
})

app.listen(port, () => {
  console.log(`sample-weather-app listening on ${port}`)
});