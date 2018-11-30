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
  city: String;

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

  getCurrentTime() {
    this.time = new Date().toLocaleTimeString("en-US")
    const am_pm = this.time.slice(-2);
    if (this.time[1] === ':') {
      this.time = `0${this.time}`;
      if (am_pm === 'PM' && this.time.slice(0, 2) === '12' || am_pm === 'AM') {
        this.hour = this.time.slice(0, 2)
      } else if (am_pm === 'AM' && this.time.slice(0, 2) === '12') {
        this.hour = '00';
      } else if (am_pm === 'PM' && Number(this.time.slice(0, 2)) < 12) {
        let num = Number(this.time.slice(0, 2));
        num += 12;
        this.hour = num.toString();
      }
    } else {
      if (am_pm === 'PM' && this.time.slice(0, 2) === '12' || am_pm === 'AM') {
        this.hour = this.time.slice(0, 2)
      } else if (am_pm === 'AM' && this.time.slice(0, 2) === '12'){
        this.hour = '00';
      } else if (am_pm === 'PM' && Number(this.time.slice(0, 2)) < 12) {
        let num = Number(this.time.slice(0, 2));
        num += 12;
        this.hour = num.toString();
      }
    }
    this.time = this.time.slice(0, 5);
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
        this.city = this.weatherInfo[0].city;
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
      this.city = dailyForecast[0].city;
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
        day.img = result;
      })
    })
  }

  redirectToFiveDayForecast() {
    this.router.navigate(['/fiveDayForecast']);
  }

  ngOnInit() {
  }

}
