import { Component, OnInit } from '@angular/core';
import { DataService }       from '../../services/data.service';
import { Observable }        from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone:false
})
export class ListPage implements OnInit {

  usuarios!: Observable<any>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.usuarios = this.dataService.getUsuarios();
  }

  favorite(user: any) {
    console.log('favorite', user);
  }

  share(user: any) {
    console.log('share', user);
  }

  delete(user: any) {
    console.log('delete', user.name);
  }

}
