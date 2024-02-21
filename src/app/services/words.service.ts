import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/assets/interface/match.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private baseURL = ''
  private categorias: Categoria[] | any;
  private options: Categoria | any;
  constructor(private http: HttpClient) {
    this.baseURL = environment.firebaseUrl;
  }

  getCategorias(): Observable<Categoria[]> {
    this.categorias = this.http.get<Categoria>(`${this.baseURL}/categorias.json`);
    return this.categorias;
  }

  getOptions(id:number): Observable<Categoria> {
    this.options = this.http.get<Categoria>(`${this.baseURL}/categorias/${id}.json`);
    return this.options;
  }
  
}
