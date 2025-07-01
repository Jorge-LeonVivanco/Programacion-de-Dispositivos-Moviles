import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor() {}

  renderPayPalButton(total: number, onSuccess: () => void, onError: (err: any) => void) {
    if ((window as any).paypal) {
      (window as any).paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: total.toString(), // Total en string
              },
            }],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log('Transaction completed by ' + details.payer.name.given_name);
            onSuccess();
          });
        },
        onError: (err: any) => {
          console.error(err);
          onError(err);
        }
      }).render('#paypal-button-container');
    } else {
      console.error('PayPal SDK no está cargado');
    }
  }
}
