const express = require('express');
const request = require('request');
const openWeatherKey = require('../config.js');

module.exports = {
  getCurrentWeather: (city) => {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?&q=${city}&APPID=${openWeatherKey.openWeatherApiKey}&units=imperial`
      }
      console.log(options)
      request(options, (error, response) => {
        // console.log(response, 'line 14')
        const parsedBody = JSON.parse(response.body);
        // console.log(parsedBody, 'line 16')
        if (response) {
          resolve(parsedBody)
        } else {
          reject('failed')
        }
      })
    })
  },
  // getCurrentWeather: (city, callback) => {
  //   request(`http://api.openweathermap.org/data/2.5/weather?&q=${city}&APPID=${openWeatherKey.openWeatherApiKey}&units=imperial`, (error, response, body) => {
  //     if (error) {
  //       console.error(error)
  //     } else if (!error && response.statusCode === 200) {
  //       // console.log(body, 'line 30')
  //       callback(body);
  //     }
  //   })
  // },

  get5DayForecast: (city, callback) => {
    request(`http://api.openweathermap.org/data/2.5/weather?&q=${city}&APPID=${openWeatherKey.openWeatherApiKey}&units=imperial`, (error, response, body) => {
      if (error) {
        console.error(error);
      } else if (!error && response.statusCode === 200) {
        callback(body);
      }
    })
  }
}

// `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&apikey=a687587b77d66b53ca1b2305455c2480`