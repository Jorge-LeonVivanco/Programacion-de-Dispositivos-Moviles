import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article, NewsResponse } from '../interfaces';  
import { environment } from 'src/environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { ArticlesByCategoryAndPage } from '../interfaces';

const apiUrl = environment.apiUrl;  // URL base para la función de Firebase

@Injectable({
  providedIn: 'root',
})
export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};  // Almacena artículos por categoría y página

  constructor(private http: HttpClient) {}

  private executeQuery<T>(endpoint: string, params: any): Observable<T> {
  return this.http.get<T>(environment.apiUrl, { params });
}


  getTopHeadLines(): Observable<Article[]> {
    const params = {
      category: 'business',
      country: 'us'
    };

    return this.executeQuery<NewsResponse>('', params)  // endpoint no se usa porque el proxy lo resuelve
      .pipe(
        map(({ articles }) => articles),
        catchError(this.handleError)
      );
  }

  getTopHeadlinesByCategory(category: string, loadMore: boolean = false): Observable<Article[]> {
    const params = {
      category: category,
      country: 'us'
    };

    if (loadMore) {
      return this.getArticlesByCategory(category, true);
    }

    if (this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string, loadMore: boolean = false): Observable<Article[]> {
    if (!this.articlesByCategoryAndPage[category]) {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      };
    }

    if (loadMore) {
      this.articlesByCategoryAndPage[category].page += 1;
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;
    const pageSize = 10;

    const params = {
      category: category,
      country: 'us',
      page: `${page}`,
      pageSize: `${pageSize}`
    };

    return this.executeQuery<NewsResponse>('', params)
      .pipe(
        map(({ articles }) => {
          if (articles.length === 0) {
            return this.articlesByCategoryAndPage[category].articles;
          }

          if (loadMore) {
            this.articlesByCategoryAndPage[category].articles = [
              ...this.articlesByCategoryAndPage[category].articles,
              ...articles
            ];
          } else {
            this.articlesByCategoryAndPage[category].articles = articles;
          }

          return this.articlesByCategoryAndPage[category].articles;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    if (error.status === 429) {
      console.error('API limit reached. Please wait and try again later.');
      return of([]);
    }
    console.error('An error occurred:', error);
    return of([]);
  }
}
