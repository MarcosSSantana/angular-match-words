import { Component, OnInit, inject } from '@angular/core';
import { WordsService } from 'src/app/services/words.service';
// import Lista from 'src/assets/data/match_words.json';
import { Categoria } from 'src/assets/interface/match.interface';



@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  listCategorias!: Categoria[];

  constructor(private service: WordsService) {
  }
  ngOnInit(): void {
    this.service.getCategorias().subscribe({
      next: (res) => {
        this.listCategorias = res;
      },
      error: (res) => console.log(res)
    })

    // if (Lista) {
    //   this.listCategorias = Lista.categorias;
    //   console.log(this.listCategorias);
    // }
  }

}
