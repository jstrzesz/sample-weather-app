import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.css']
})

export class FiveDayForecastComponent implements OnInit {
  @Input() data: Object;

  day: Object;

  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    console.log(this.data);
    this.day = this.data;
    console.log(this.day)
  }

}
