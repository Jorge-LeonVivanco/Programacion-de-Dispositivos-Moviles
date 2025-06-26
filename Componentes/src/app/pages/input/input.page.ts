import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
  standalone:false
})
export class InputPage implements OnInit {

  nombre: string = '';

  constructor() { }

  ngOnInit() {
  }

}
