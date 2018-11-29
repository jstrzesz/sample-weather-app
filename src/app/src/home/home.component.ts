import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  input: String;
  city: String;
  country: String;
  temperature: Number;
  forecast: String;

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
        this.city = data.city;
        this.temperature = Math.ceil(data.temp);
        this.country = data.country;
        this.forecast = data.forecast;
      })
  }

  // get5DayForecast() {
  //   return this.httpClient.post('/forecast', {
  //     params: {
  //       input: this.input
  //     }
  //   })
  //   .subscribe(data => {
  //     console.log(data, 'line 45')
  //   })
  // }

  ngOnInit() {
  }

}
