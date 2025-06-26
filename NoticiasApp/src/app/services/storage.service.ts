import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  get getLocalArticles() {
    return [ ...this._localArticles]
  }

  // Inicialización del almacenamiento
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    this.loadFavorites ();
  }

  // Método para guardar o eliminar artículos
  async saveRemoveArticle(article: Article) {
    // Verifica si el artículo ya existe en la lista
    const exists = this._localArticles.find(localArticle => localArticle.title === article.title);

    if (exists) {
      // Si existe, lo eliminamos de la lista
      this._localArticles = this._localArticles.filter(localArticle => localArticle.title !== article.title);
    } else {
      // Si no existe, lo agregamos al principio de la lista
      this._localArticles = [article, ...this._localArticles];
    }

    // Guardamos la lista actualizada en el almacenamiento
    this._storage?.set('articles', this._localArticles);
  }


  async loadFavorites () {

    try {

      const articles = await this._storage?.get ('articles');
      this._localArticles = articles || [];

    } catch (error){

      
    }
  }

  articleInFavorites (article: Article) {
    return !!this._localArticles.find ( localArticle => localArticle.title === article.title );
      
  }
}
