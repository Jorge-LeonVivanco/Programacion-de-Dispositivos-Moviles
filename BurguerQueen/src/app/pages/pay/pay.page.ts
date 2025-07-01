import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonInput
} from '@ionic/angular/standalone';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CreateAccountComponent } from 'src/app/components/create-account/create-account.component';
import { ListProductsComponent } from 'src/app/components/list-products/list-products.component';
import { LoginComponent } from 'src/app/components/login/login.component';

import { UserOrderService } from 'src/app/services/user-order.service';
import { StripeService } from 'src/app/services/stripe.service';
import { ToastService } from 'src/app/services/toast.service';
import { OrdersService } from 'src/app/services/orders.service';

import { PaymentSheetEventsEnum, PaymentSheetResultInterface, Stripe } from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';

import { ICreatePaymentIntent } from 'src/app/models/create-payment-intent.model';
import { IPayment } from 'src/app/models/payment.model';
import { IOrder } from 'src/app/models/order.model';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    LoginComponent,
    CreateAccountComponent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    TranslatePipe,
    IonCardContent,
    IonButton,
    IonItem,
    ListProductsComponent,
    IonRadioGroup,
    IonRadio,
    FormsModule,
    IonInput
  ]
})
export class PayPage implements OnInit {

  private userOrderService = inject(UserOrderService);
  private router = inject(Router);
  private stripeService = inject(StripeService);
  private toastService = inject(ToastService);
  private translateService = inject(TranslateService);
  private ordersService = inject(OrdersService);

  public userSignal = this.userOrderService.userSignal;
  public numProductsSignal = this.userOrderService.numProductsSignal;
  public totalOrderSignal = this.userOrderService.totalOrderSignal;

  public showCreateAccount = false;
  public step = 1;
  public address = '';
  public showNewAddress = false;
  public paypalRendered = false;

  ngOnInit() {}

  ionViewWillEnter() {
    this.step = 1;
    this.setAddressDefault();

    Stripe.initialize({
      publishableKey: environment.stripe.publishKey
    });
  }

  backHome() {
    this.router.navigateByUrl('categories');
  }

  newAccount() {
    this.showCreateAccount = true;
  }

  seeLogin() {
    this.showCreateAccount = false;
  }

  nextStep() {
    this.step += 1;
    if (this.step === 3) {
      setTimeout(() => {
        this.renderPaypalButton();
      }, 0);
    }
  }

  previousStep() {
    this.step -= 1;
  }

  setAddressDefault() {
    this.address = this.userSignal() ? this.userSignal()!.address! : '';
    this.showNewAddress = false;
  }

  changeOptionAddress(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.value === 'address-default') {
      this.setAddressDefault();
    } else if (target.value === 'choose-address') {
      this.address = '';
      this.showNewAddress = true;
    }
  }

  payWithStripe() {
    const total = this.totalOrderSignal() * 100;

    const paymentIntent: ICreatePaymentIntent = {
      secretKey: environment.stripe.secretKey,
      amount: +total.toFixed(0),
      currency: 'USD',
      customer_id: environment.stripe.customerId
    };

    this.stripeService.createPaymentIntent(paymentIntent).then(async (payment: IPayment) => {
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: payment.paymentIntentClientSecret,
        customerEphemeralKeySecret: payment.ephemeralKey,
        customerId: payment.customer,
        merchantDisplayName: 'Burger Queen'
      });

      await Stripe.presentPaymentSheet().then((result: { paymentResult: PaymentSheetResultInterface }) => {
        if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
          this.createOrder();
        } else if (result.paymentResult === PaymentSheetEventsEnum.Failed) {
          this.toastService.showToast(this.translateService.instant('label.pay.fail'));
        }
      });
    });
  }

  renderPaypalButton() {
    const total = this.totalOrderSignal();
    const paypalContainer = document.getElementById('paypal-button-container');

    if (!paypalContainer) {
      console.error('El contenedor PayPal no existe');
      return;
    }

    if (this.paypalRendered) {
      paypalContainer.innerHTML = ''; // 🔥 Importante: limpiar antes de renderizar nuevamente
    }

    // @ts-ignore
    if (window.paypal) {
      // @ts-ignore
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: total.toFixed(2)
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log('Pago completado por', details.payer.name.given_name);
            this.createOrder();
            this.toastService.showToast(
              this.translateService.instant('label.pay.success', { address: this.address })
            );
          });
        },
        onError: (err: any) => {
          console.error('Error en el pago con PayPal:', err);
          this.toastService.showToast(this.translateService.instant('label.pay.fail'));
        }
      }).render('#paypal-button-container');

      this.paypalRendered = true;
    } else {
      console.error('PayPal SDK no está cargado');
    }
  }

  createOrder() {
    this.userOrderService.setAddress(this.address);
    const order = this.userOrderService.getOrder();

    this.ordersService.createOrder(order).then(() => {
      this.toastService.showToast(
        this.translateService.instant('label.pay.success', { address: this.address })
      );
      this.userOrderService.resetOrder();
      this.paypalRendered = false; // 🔥 Esto permite que PayPal se vuelva a renderizar si haces otro pedido
      this.router.navigateByUrl('categories');
    }).catch(() => {
      this.toastService.showToast(this.translateService.instant('label.pay.fail'));
    });
  }
}
