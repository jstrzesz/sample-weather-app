import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private httpClient: HttpClient) { }

  getCity(e) {
    this.input = e.target.value;
  }

  getCurrentWeather() {
    return this.httpClient.post('/api/currentWeather', {
      params: {
        input: this.input
      }
    })
      .subscribe(data => {
        console.log(data, 'line 25');
        this.weatherInfo.push(data);
      })
  }

  get5DayForecast() {
    return this.httpClient.post('/api/forecast', {
      params: {
        input: this.input
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
      console.log(this.dailyForecast);
    })
  }

  filterDayAndNightForForecast() {
    // this.forecastInfo.
  }

  ngOnInit() {
  }

}
