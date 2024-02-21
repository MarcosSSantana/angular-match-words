import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ReplyButtonComponent } from './components/reply-button/reply-button.component';
import { MatchComponent } from './pages/match/match.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { APP_BASE_HREF } from '@angular/common';

// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { getDatabase, provideDatabase } from '@angular/fire/database';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ReplyButtonComponent,
    MatchComponent,
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore()),
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/mach-words/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
