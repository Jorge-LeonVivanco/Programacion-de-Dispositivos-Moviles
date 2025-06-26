import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
  standalone:false
})
export class CheckPage implements OnInit {

  data=[
  {
    name:"primary",
    Selected: false
  },
  {
    name:"secondary",
    Selected: false
  },
  {
    name:"tertiary",
    Selected: false
  },
  {
    name:"success",
    Selected: true
  }
]


  constructor() { }

  ngOnInit() {
  }

}
