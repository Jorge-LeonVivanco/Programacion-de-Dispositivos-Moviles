import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
  standalone: false
})
export class DateTimePage implements OnInit {

  fechaNaci: Date = new Date();
  customPickerOptions ={
    
  }
  
  constructor() { }

  ngOnInit() {
  }

}
