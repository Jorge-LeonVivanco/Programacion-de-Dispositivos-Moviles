import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';  // Importación correcta del Router

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: false // No se modifica esto
})
export class HistorialPage implements OnInit, AfterViewInit {
  historial: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Recuperar historial guardado al cargar la página
    const storedHistory = sessionStorage.getItem('historial');
    if (storedHistory) {
      this.historial = JSON.parse(storedHistory);
    }
  }

  ngAfterViewInit() {
    // Esto se ejecuta después de que la vista se haya inicializado
    // Si los datos del historial cambiaron en ngOnInit, podemos forzar la actualización aquí.
    console.log("Historial después de inicializar la vista", this.historial);
  }

  regresar(): void {
    this.router.navigateByUrl('/');
  }
}
