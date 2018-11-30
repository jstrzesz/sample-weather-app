import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  input: String;
  weatherInfo = [];
  forecastInfo: any;
  dailyForecast: any;
  example: String = 'Hello';
  path: string;
  text: string;
  time: string;
  hour: string;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getCity(e) {
    this.input = e.target.value;
  }

  getImagePath(e) {
    this.path = e.target.value;
  }

  getImageText(e) {
    this.text = e.target.value;
  }

  submitImages() {
    return this.httpClient.post('/api/images', {
      params: {
        path: this.path,
        text: this.text
      }
    })
    .subscribe(res => {
      console.log(res)
    })
  }

  getCurrentTime() {
    this.time = new Date().toLocaleTimeString("en-US")
    const am_pm = this.time.slice(-2);
    if (am_pm === 'PM' && this.time.slice(0, 2) === '12' || am_pm === 'AM') {
      this.hour = this.time.slice(0, 2)
    } else if (am_pm === 'AM' && this.time.slice(0, 2) === '12'){
      this.hour = '00';
    } else if (am_pm === 'PM' && Number(this.time.slice(0, 2)) > 12) {
      this.hour = Number(this.time.slice(0, 2) + 12).toString();
    }
    this.time = this.time.slice(0, 5);
    console.log(this.time, am_pm, this.hour);
  }

  getCurrentWeather() {
    this.getCurrentTime();
    return this.httpClient.post('/api/currentWeather', {
      params: {
        input: this.input,
        hour: this.hour
      }
    })
      .subscribe(data => {
        console.log(data, 'line 25');
        this.weatherInfo.push(data);
      })
  }

  get5DayForecast() {
    this.getCurrentTime();
    return this.httpClient.post('/api/forecast', {
      params: {
        input: this.input,
        hour: this.hour
      }
    })
    .subscribe(data => {
      console.log(data, 'line 45')
      const dailyForecast = [];
      this.forecastInfo = data;
      this.forecastInfo.forEach(day => {
        if (day.hour === '12:00:00') {
          dailyForecast.push(day);
        }
      })
      this.dailyForecast = dailyForecast;
      this.getWeatherIcon();
      console.log(this.dailyForecast);
      // this.getWeatherImage();
      // this.redirectToFiveDayForecast();
    })
  }

  getWeatherIcon() {
    this.forecastInfo.forEach(day => {
      this.httpClient.post('/api/weatherIcon', {
        params: {
          text: day.weatherDesc
        }
      })
      .subscribe(result => {
        console.log(result)
        day.img = result;
      })
    })
  }

  // getWeatherImage() {
  //   this.dailyForecast.forEach(day => {
  //     if (day.weatherDesc === 'overcast clouds') {
  //       this.dailyForecast.img = '../../assets.img.cloudy_icon.png';
  //     }
  //   })
  // }

  redirectToFiveDayForecast() {
    this.router.navigate(['/fiveDayForecast']);
  }

  filterDayAndNightForForecast() {
    // this.forecastInfo.
  }

  ngOnInit() {
  }

}
