import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  displayValue: string = '';
  historial: string[] = [];

  constructor(private router: Router) {
    // Recuperar historial guardado al cargar la página
    const storedHistory = sessionStorage.getItem('historial');
    if (storedHistory) {
      this.historial = JSON.parse(storedHistory);
    }
  }

  appendToDisplay(value: string): void {
    if (value === '.' && this.displayValue.includes('.')) return;
    this.displayValue += value;
  }

  clearDisplay(): void {
    this.displayValue = '';
  }

  clearLast(): void {
    this.displayValue = this.displayValue.slice(0, -1);
  }

  calculate(): void {
    try {
      let result = eval(this.displayValue); // Cuidado con eval(), en producción busca alternativas más seguras
      const operation = `${this.displayValue} = ${result}`;
      this.historial.push(operation);

      // Guardar el historial en sessionStorage
      sessionStorage.setItem('historial', JSON.stringify(this.historial));

      // Mostrar el resultado en pantalla
      this.displayValue = result.toString();
    } catch (e) {
      this.displayValue = 'Error';
    }
  }

}
