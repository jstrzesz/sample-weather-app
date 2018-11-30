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
  console.log(req.body.params.input, 'line 11');
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
  let forecastInfo = {};
    api.get5DayForecast(req.body.params.input)
    .then(data => {
      console.log(data.city, 'line 35');
      forecastInfoArray = data.list.map(day => {
        return {
          city: data.city.name,
          country: data.city.country,
          population: data.city.population,
          day: day.dt_txt.slice(5, 10),
          hour: day.dt_txt.slice(-8),
          date: day.dt,
          temp: day.main.temp,
          min_temp: Math.ceil(day.main.temp_min),
          max_temp: Math.ceil(day.main.temp_max),
          pressure: day.main.pressure,
          weather: day.weather[0].main,
          weatherDesc: day.weather[0].description,
          windSpeed: day.wind.speed,
          windDir: day.wind.deg,
          date_text: day.dt_txt
        }
        // forecastInfoArray.push(forecastInfo);
      })
      res.send(forecastInfoArray);
    })
    // .then(result1 => {
    //   // console.log(result1, 'line 73')
    //   let weatherInfo = [];
    //   result1.forEach(day => {
    //     // console.log(result1, 'line 76')
    //     weather.createWeatherLabelForFiveDayForecast(day.weatherDesc)
    //       .then(result2 => {
    //         // console.log(result2, 'line 77')
    //         db.findImage(result2, (req, response) => {
    //           // console.log(response, 'line 80')
    //           day.img = response[0].img;
    //           // console.log(day, 'line 82')
    //           result1.push(day);
    //           // console.log(weatherInfo, 'line 81')
    //           console.log(result1, 'line 78 index.js')
    //           weatherInfo = result1;
    //         })
    //         // console.log(result1, 'line 87')
    //       })
    //       // console.log(weatherInfo.text, 'line 78');
    //     })
    //     console.log(weatherInfo, 'line 92')
    //     res.send(weatherInfo);
// console.log(weatherInfo.text, 'line 79')
  })
    // res.send(forecastInfoArray);
// })

app.post('/weatherIcon', (req, res) => {
  // console.log(req.body.params)
  weather.createWeatherLabelForFiveDayForecast(req.body.params.text)
  .then(result => {
    let weatherInfo = {};
    // console.log(result, 'line 103')
    db.findImage(result, (request, response) => {
      // console.log(response, 'line 106')
      weatherInfo.img = response[0].img;
      res.send(weatherInfo);
    })
})
})

app.post('/images', (req, res) => {
  console.log(req.body.params)
  const imgObj = {
    text: req.body.params.text,
    img: req.body.params.path
  }
  db.saveImage(imgObj);
})

app.listen(port, () => {
  console.log(`sample-weather-app listening on ${port}`)
});