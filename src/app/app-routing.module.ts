import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './pages/quiz/quiz.component';
import { MatchComponent } from './pages/match/match.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

const routes: Routes = [
  {path:'', redirectTo:'/categorias', pathMatch:'full'},
  {path:'quiz', component:QuizComponent},
  {path:'match/:id', component:MatchComponent},
  {path:'categorias', component:CategoriasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
