const express = require('express');

module.exports = {
  createDayNightLabel: (number) => {
    let text;
    return new Promise((resolve, reject) => {
      if (number > 5 && number < 19) {
        text = 'day';
      } else if (number > -1 && number < 6 || number > 18) {
        text = 'night';
      }
      if (text === 'day' || text === 'night') {
        resolve(text, 'text')
      } else {
        reject('time of day label rejection')
      }
    })
  },
  createWeatherText: (text, forecast) => {
    let forecastArray = [];
    return new Promise((resolve, reject) => {
      forecast = forecast.split(' ');
      console.log(forecast, 'line 28')
      if (forecast.includes('clouds') || forecast.includes('cloudy')) {
        forecastArray.push('cloudy');
      } else if (forecast.includes('storm') || forecast.includes('thunderstorm')) {
          forecastArray.push('stormy');
        } else if (forecast.includes('clear') || forecast.includes('sunny')) {
          forecastArray.push('clear');
        } else if (forecast.includes('snow') || forecast.includes('snowy')) {
          forecastArray.push('snow');
        } else if (forecast.includes('clouds') || forecast.includes('cloudy')) {
          forecastArray.push('cloudy')
        }
      if (text === 'day') {
        forecastArray.push('day');
      } else if (test === 'night') {
        forecastArray.push('night');
      }
      forecastArray = forecastArray.join('-');
      console.log(forecastArray, 'line 33')
      if (forecastArray === 'clear-day' || forecastArray === 'clear-night' || 
          forecastArray === 'rain-day' || forecastArray === 'rain-night' ||
          forecastArray === 'cloudy-day' || forecastArray === 'cloudy-night' ||
          forecastArray === 'stormy-day' || forecastArray === 'stormy-night' ||
          forecastArray === 'snow-day' || forecastArray === 'snow-night') {
            resolve(forecastArray, 'forecast for image')
          } else {
            reject('forecast for Image failed')
          }
    })
  }
}