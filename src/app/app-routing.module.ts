import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './pages/quiz/quiz.component';
import { MatchComponent } from './pages/match/match.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

const routes: Routes = [
  { path: '', component: CategoriasComponent, pathMatch: 'full' },
  { path: 'match/:id', component: MatchComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'quiz', component: QuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
