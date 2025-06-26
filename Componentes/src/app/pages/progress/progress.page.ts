import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: false
})
export class ProgressPage implements OnInit {

  porcentaje: number = 0.05;

  constructor() { }

  ngOnInit(): void { }

  // Añadimos el tipo explícito para 'event' y el tipo de retorno
  rangeChange(event: any): void {
    // console.log(event.detail.value); // 1 - 100
    this.porcentaje = event.detail.value / 100;
  }

}