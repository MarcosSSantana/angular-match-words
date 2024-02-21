import { Injectable } from '@angular/core';
import { Categoria } from 'src/assets/interface/match.interface';
import { WordsService } from './words.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private dataWordsSubject: BehaviorSubject<Categoria[] | null> = new BehaviorSubject<Categoria[] | null>(null);
  dataWords$: Observable<Categoria[] | null> = this.dataWordsSubject.asObservable();

  constructor(private service: WordsService) {
    this.loadDataWords();
  }

  private loadDataWords() {
    const storedData = sessionStorage.getItem('dataWords');
    
    if (storedData) {
      this.dataWordsSubject.next(JSON.parse(storedData));
    } else {
      console.log('buscou');

      this.service.getCategorias().subscribe({
        next: (res) => {
          sessionStorage.setItem('dataWords', JSON.stringify(res));
          this.dataWordsSubject.next(res);
        },
        error: (res) => console.log(res)
      });
    }
  }

}