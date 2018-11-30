const express = require('express');
const request = require('request');
const openWeatherKey = require('../config.js');

module.exports = {
  getCurrentWeather: (city) => {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?&q=${city}&APPID=${openWeatherKey.openWeatherApiKey}&units=metric`
      }
      request(options, (error, response) => {
        const parsedBody = JSON.parse(response.body);
        if (response) {
          resolve(parsedBody)
        } else {
          reject('failed')
        }
      })
    })
  },

  get5DayForecast: city => {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        url: `http://api.openweathermap.org/data/2.5/forecast?&q=${city}&APPID=${openWeatherKey.openWeatherApiKey}&units=metric`
      }
      request(options, (err, response) => {
        const parsed = JSON.parse(response.body);
        if (response) {
          resolve(parsed)
        } else {
          reject('failed to get forecast')
        }
      })
    })
  }
}