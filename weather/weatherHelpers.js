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
        } else if (forecast.includes('rain') || forecast.inclues('rainy')) {
          forecastArray.push('rain')
        }
      if (text === 'day') {
        forecastArray.push('day');
      } else if (text === 'night') {
        forecastArray.push('night');
      }
      forecastArray = forecastArray.join('-');
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
  },
  createWeatherLabelForFiveDayForecast: (forecast) => {
    let label = '';
    return new Promise((resolve, reject) => {
      forecast = forecast.split(' ');
      if (forecast.includes('clear')) {
        label = 'sunny';
      } else if (forecast.includes('sunny') && !forecast.includes('partly')) {
        label = 'sunny';
      } else if (forecast.includes('sunny') && forecast.includes('partly')) {
        label = 'partly sunny';
      } else if (forecast.includes('cloudy') && !forecast.includes('partly')) {
        label = 'cloudy';
      } else if (forecast.includes('cloudy') && forecast.includes('partly')) {
        label = 'partly cloudy';
      } else if (forecast.includes('clouds')) {
        label = 'cloudy';
      } else if (forecast.includes('rain') || forecast.includes('rainy')) {
        label = 'rainy';
      } else if (forecast.includes('snow') || forecast.includes('snowy')) {
        label = 'snowy';
      } else if (forecast.includes('fog') || forecast.includes('foggy')) {
        label = 'foggy';
      } else if (forecast.includes('wind') || forecast.includes('windy') || forecast.includes('winds')) {
        label = 'windy';
      } else if (forecast.includes('storms') || forecast.includes('stormy') || forecast.includes('storms') || 
                  forecast.includes('thunderstorm') || forecast.includes('thunderstorms')) {
        label = 'stormy';
      }
      if (label === 'sunny' || label === 'partly sunny' || label === 'partly cloudy' || label === 'cloudy' || 
          label === 'rainy' || label === 'snowy' || label === 'foggy' || label === 'windy' || label === 'stormy') {
            resolve(label);
          } else {
            reject('labelling failed')
          }
    })
  }
}