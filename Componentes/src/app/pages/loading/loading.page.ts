import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
  standalone:false
})
export class LoadingPage implements OnInit {

  constructor(private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

    // Función para mostrar el loading
  async mostrarLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando, por favor espera…',
      spinner: 'crescent',
      duration: 2000
    });
    await loading.present();
    await loading.dismiss();
  }

}
