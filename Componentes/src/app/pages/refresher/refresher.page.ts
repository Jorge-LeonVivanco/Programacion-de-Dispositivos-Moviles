import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.page.html',
  styleUrls: ['./refresher.page.scss'],
  standalone: false
})
export class RefresherPage implements OnInit {

  items: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  doRefresh( event:any ) {

    setTimeout(() => {
      this.items = Array(20);
      event.target.complete();
    }, 1500);

  }

}
