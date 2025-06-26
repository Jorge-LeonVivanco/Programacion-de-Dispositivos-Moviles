import { Component, OnInit } from '@angular/core';
import { MenuController }     from '@ionic/angular';
import { Observable }        from 'rxjs';
import { Componente }        from 'src/app/interfaces/interfaces';
import { DataService }       from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone:false
})
export class InicioPage implements OnInit {

  componentes!: Observable<Componente[]>;

  constructor(
    private menuCtrl: MenuController,
    private dataService: DataService
  ) {}

  // 2) Añadimos el :void para mayor claridad
  ngOnInit(): void {
    this.componentes = this.dataService.getMenuOpts();
  }

  // 3) También tipamos la función
  mostrarMenu(): void {
    this.menuCtrl.open('first');
  }

}
