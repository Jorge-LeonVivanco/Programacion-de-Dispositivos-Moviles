import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
  standalone: false
})
export class ModalPage implements OnInit {

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() 
  {

  }

 async mostrarModal()
  {
    const modal = await this.modalCtrl.create
  ({
  component: ModalInfoPage,
  componentProps:
  {
    nombre: 'Jorge Leon',
    pais: 'México'
  },
  cssClass: 'my-custom-class'
  });
  await modal.present();

  const resp = await modal.onDidDismiss();

  }

}
