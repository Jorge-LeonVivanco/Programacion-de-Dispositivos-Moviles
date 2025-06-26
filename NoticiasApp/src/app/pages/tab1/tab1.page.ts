import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from 'src/app/interfaces';  // Asegúrate de que la ruta sea correcta
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false  // Hacemos el componente standalone
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll | undefined;  // Propiedad marcada como undefined

  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}  // Cambié newService a newsService para coherencia

  ngOnInit(): void {
    this.loadArticles();  // Cargar artículos al iniciar
  }

  // Método para cargar artículos iniciales
  loadArticles() {
    this.newsService.getTopHeadLines()
      .subscribe((articles: Article[]) => {
        this.articles.push(...articles);  // Usamos spread operator para agregar los artículos
      });
  }

  // Función para cargar más artículos (paginación)
  loadData(event: any) {
    this.newsService.getTopHeadlinesByCategory('business', true)
      .subscribe((articles) => {
        // Si los artículos no son nuevos (no se agregan nuevos artículos), deshabilitamos el infinite scroll
        if (articles.length === this.articles.length) {
          // Comprobamos si infiniteScroll está definido antes de deshabilitarlo
          if (this.infiniteScroll) {
            this.infiniteScroll.disabled = true;  // Deshabilitamos el infiniteScroll
          }
          event.target.complete();  // Completa el evento de carga infinita
          return;
        }

        // Agregar los nuevos artículos a la lista existente
        this.articles = [...this.articles, ...articles];
        event.target.complete();  // Completa el evento de carga infinita
      });
  }
}
