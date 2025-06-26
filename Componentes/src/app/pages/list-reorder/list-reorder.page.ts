import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reorder',
  templateUrl: './list-reorder.page.html',
  styleUrls: ['./list-reorder.page.scss'],
  standalone:false
})
export class ListReorderPage implements OnInit 
  {

  reorderEnable: boolean = true;

  personajes: string [] = ['Aquaman', 'Superman', 'Batman', 'Mujer Maravilla', 'CR7']

  constructor() { }

  ngOnInit() {
  }

}
