import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
  standalone:false
})
export class ActionSheetPage implements OnInit {

  constructor(private actionSheetController: ActionSheetController) { }

  ngOnInit() {}

  onClick() {
    this.presentActionSheet();
  }

 async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: '¿Qué deseas hacer?',
    backdropDismiss: false,
    cssClass: 'custom-action-sheet', // clase personalizada opcional
    buttons: [
      {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash-outline',
        cssClass: 'danger-button',
        data: { action: 'delete' },
      },
      {
        text: 'Compartir',
        icon: 'share-social-outline',
        cssClass: 'share-button',
        data: { action: 'share' },
      },
      {
        text: 'Favorito',
        icon: 'heart-outline',
        cssClass: 'favorite-button',
        data: { action: 'favorite' },
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        icon: 'close-outline',
        cssClass: 'cancel-button',
        data: { action: 'cancel' },
      },
    ],
  });

  await actionSheet.present();
}

}
