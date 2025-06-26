import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
  standalone: false
})
export class AlertPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async presentSingleButtonAlert() 
  {
    const alert = await this.alertController.create({
      header: 'Información',
      message: 'Esta es una alerta simple con un solo botón.',
      buttons: ['Entendido'],
    });

    await alert.present();
  }

  async presentMultipleOptionsAlert() {
  const alert = await this.alertController.create({
    header: 'Confirmación',
    message: '¿Deseas continuar con esta acción?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Operación cancelada');
        }
      },
      {
        text: 'Aceptar',
        role: 'confirm',
        handler: () => {
          console.log('Operación confirmada');
        }
      }
    ],
  });

  await alert.present();
}

async presentComplejoFormAlert() {
  const alert = await this.alertController.create({
    header: 'Registro de Usuario',
    inputs: [
      {
        name: 'nombre',
        type: 'text',
        placeholder: 'Nombre completo',
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Correo electrónico',
      },
      {
        name: 'fechaNacimiento',
        type: 'date',
        min: '1900-01-01',
        max: new Date().toISOString().split('T')[0], // hasta hoy
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Contraseña',
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Formulario cancelado');
        }
      },
      {
        text: 'Registrar',
        role: 'confirm',
        handler: (data) => {
          const { nombre, email, fechaNacimiento, password } = data;

          // Validaciones básicas
          if (!nombre || !email || !fechaNacimiento || !password) {
            console.log('Error: Todos los campos son obligatorios');
            return false;
          }

          if (!email.includes('@') || !email.includes('.')) {
            console.log('Error: El correo no es válido');
            return false;
          }

          if (password.length < 6) {
            console.log('Error: La contraseña debe tener al menos 6 caracteres');
            return false;
          }

          console.log(' Registro exitoso:', data);
          return true;
        }
      }
    ]
  });

  await alert.present();
}



}
