import { Component, OnInit } from '@angular/core';
import quizz from 'src/assets/data/quizz_questions.json';
import { Question } from 'src/assets/interface/quizz.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  title: string = "";
  questions!: Question[];
  questionSelected!: Question;

  answers: string[] = [];
  answerSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  ngOnInit(): void {
    if (quizz) {
      this.questions = quizz.questions;

      this.title = quizz.title;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  nextStep() {
    this.questionIndex++;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = this.checkResult();
      this.finished = true;
      this.answerSelected = quizz.results[finalAnswer as keyof typeof quizz.results];
    }
  }

  checkResult(): string {
    const result: string = this.answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }

    })
    return result;

  }
}
