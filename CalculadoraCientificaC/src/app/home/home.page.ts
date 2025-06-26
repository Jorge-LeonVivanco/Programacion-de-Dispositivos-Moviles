import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage {
  displayValue: string = '';      
  historial: string[] = [];       

  constructor(private router: Router) {
    const storedHistory = sessionStorage.getItem('historial');
    if (storedHistory) {
      this.historial = JSON.parse(storedHistory);
    }
  }

  appendToDisplay(value: string): void {
    if (value === '.' && this.displayValue.endsWith('.')) return;
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
      const expression = this.prepareExpression(this.displayValue);
      const result = this.evaluateExpression(expression);

      const operation = `${this.displayValue} = ${result}`;
      this.historial.push(operation);
      sessionStorage.setItem('historial', JSON.stringify(this.historial));

      this.displayValue = result.toString();
    } catch (e) {
      this.displayValue = 'Error';
      console.error('Error during calculation: ', e);
    }
  }

  // 🔥 Prepara la expresión para evaluación
  prepareExpression(expr: string): string {
    return expr
      .replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)')
      .replace(/log\(([^)]+)\)/g, 'Math.log10($1)')
      .replace(/ln\(([^)]+)\)/g, 'Math.log($1)')
      .replace(/sin\(([^)]+)\)/g, 'Math.sin($1)')
      .replace(/cos\(([^)]+)\)/g, 'Math.cos($1)')
      .replace(/tan\(([^)]+)\)/g, 'Math.tan($1)')
      .replace(/asin\(([^)]+)\)/g, 'Math.asin($1)')
      .replace(/acos\(([^)]+)\)/g, 'Math.acos($1)')
      .replace(/atan\(([^)]+)\)/g, 'Math.atan($1)')
      .replace(/\^/g, '**'); // Potencia
  }

  evaluateExpression(expression: string): number {
    try {
      const result = Function(`"use strict"; return (${expression})`)();
      if (isNaN(result) || result === Infinity || result === -Infinity) {
        throw new Error('Resultado inválido');
      }
      return result;
    } catch (error) {
      console.error('Expression evaluation error:', error);
      return NaN;
    }
  }

  // 🔥 Historial completo
  clearHistory(): void {
    this.historial = [];
    sessionStorage.removeItem('historial');
  }
}
