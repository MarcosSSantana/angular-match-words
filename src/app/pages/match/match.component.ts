import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordsService } from 'src/app/services/words.service';
import Opcao from 'src/assets/data/match_words.json';
import { Categoria } from 'src/assets/interface/match.interface';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
})
export class MatchComponent implements OnInit {
  title: string = '';
  categoria?: Categoria;
  id: number = 0;
  pontos: number = 0;
  erros: number = 0;
  acertos: number = 0;
  isDisabled = true;
  time: number = 250;
  columnLeft = [
    { id: 0, texto: '', classe: '', check: true },
    { id: 1, texto: '', classe: '', check: true },
    { id: 2, texto: '', classe: '', check: true },
    { id: 3, texto: '', classe: '', check: true },
    { id: 4, texto: '', classe: '', check: true },
  ];

  columnRight = [
    { id: 0, texto: '', classe: '', check: true },
    { id: 1, texto: '', classe: '', check: true },
    { id: 2, texto: '', classe: '', check: true },
    { id: 3, texto: '', classe: '', check: true },
    { id: 4, texto: '', classe: '', check: true },
  ];

  choices = {
    L: { id: -1, texto: '', classe: '' },
    R: { id: -1, texto: '', classe: '' },
  };

  constructor(private route: ActivatedRoute, private service: WordsService) { }

  ngOnInit(): void {

    let idParam = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(idParam || '');

    this.service.getOptions(this.id).subscribe({
      next: (res) => {
        this.categoria = res;
        this.setWords();
      },
      error: (res) => console.log(res)
    })

    // if (Opcao) {
    //   this.categoria = Opcao.categorias.find(
    //     (categoria) => categoria.id === this.id
    //   );

    //   this.setWords();
    // }
  }

  setWords() {
    if (this.categoria) {
      this.acertos = 0;
      this.title = this.categoria?.categoria;
      let options: Categoria["options"] = this.categoria.options;
      options.sort(() => Math.random() - 0.5);

      let novoArray = options.slice(0, 5);

      this.columnLeft.forEach((item, i) => {
        item.texto = novoArray[i].pt;
        item.id = novoArray[i].id;
        item.check = true;
      });

      novoArray.sort(() => Math.random() - 0.5);

      this.columnRight.forEach((item, i) => {
        item.texto = novoArray[i].en;
        item.id = novoArray[i].id;
        item.check = true;
      });

      // console.log(this.categoria.options);
    }
  }

  choiceClick(id: number, column: string) {
    // console.log(id, column);
    if (column == 'L') {
      this.clearClasse(this.columnLeft);
      this.choices.L = this.columnLeft[id];
      this.choices.L.classe = 'border border-4 border-success';
    } else {
      this.clearClasse(this.columnRight);
      this.choices.R = this.columnRight[id];
      this.choices.R.classe = 'border border-4 border-success';
    }

    if (this.choices.L.id != -1 && this.choices.R.id != -1) {
      this.checkWin();
    }
  }

  checkWin() {
    //checa se é igual
    if (this.choices.L.id === this.choices.R.id) {
      //desabilita os dois e marca ponto
      this.pontos++;
      this.acertos++;
      this.setCheckChoice();
    } else {
      this.erros++;
    }
    //desmarca e limpa os ids
    this.clearChoices();

    setTimeout(() => {
      this.clearClasse(this.columnLeft);
      this.clearClasse(this.columnRight);
    }, this.time);
  }

  clearChoices() {
    this.choices = {
      L: { id: -1, texto: '', classe: '' },
      R: { id: -1, texto: '', classe: '' },
    };
  }

  clearClasse(column: any[]) {
    if (column) {
      column.forEach(
        (item) => (item.classe = item.check ? '' : 'border border-0')
      );
    }
    // this.columnRight.forEach(item => item.classe = item.check ? "" : "border border-0");
  }

  setCheckChoice() {

    this.columnLeft.forEach(
      (item) =>
        (item.check = item.id === this.choices.L.id ? false : item.check)
    );
    this.columnRight.forEach(
      (item) =>
        (item.check = item.id === this.choices.R.id ? false : item.check)
    );

    setTimeout(() => {
      if (this.acertos >= this.columnLeft.length) {
        this.setWords();
      }
    }, this.time);


  }
}
