import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.page.html',
  styleUrls: ['./infinite.page.scss'],
  standalone:false
})
export class InfinitePage implements OnInit {

  data: any [] = Array(20);

  constructor() { }

  ngOnInit() {
  }


  loadData(event: any){
    
    console.log (event);

    setTimeout(() =>{

    const nuevoArr = Array(20);
    this.data.push(...nuevoArr);  

    event.target.complete();
    }, 1500);

  }

}
