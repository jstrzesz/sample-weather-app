import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


@Injectable() 
export class AppComponent {
  title = 'sample-weather-app';
  character;

  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get('/api/south_park')
      .subscribe(res => {
        // console.log(res);
        this.character = res;
      });
  }

  ngOnInit() {
    this.getData();
  }
}
