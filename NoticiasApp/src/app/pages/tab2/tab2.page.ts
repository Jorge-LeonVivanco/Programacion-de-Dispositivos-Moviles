import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';
import { ArticlesComponent } from 'src/app/components/articles/articles.component';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll | undefined;  // Inicializado como undefined

  public categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadArticles(this.selectedCategory);
  }

  // Cargar artículos para la categoría seleccionada
  loadArticles(category: string) {
    this.newsService.getTopHeadlinesByCategory(category)
      .subscribe((articles) => {
        this.articles = [...articles];  // Asignamos los artículos obtenidos
      });
  }

  // Cambiar la categoría al seleccionar una nueva en el segmento
  segmentChanged(event: Event) {
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.loadArticles(this.selectedCategory);  // Cargar artículos para la nueva categoría
  }

  // Función para cargar más artículos (paginación)
  loadData(event: any) {
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory, true)
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
        this.articles = [...this.articles, ...articles];  // Correcto: agregamos los artículos nuevos a los existentes
        event.target.complete();  // Completa el evento de carga infinita
      });
  }
}
