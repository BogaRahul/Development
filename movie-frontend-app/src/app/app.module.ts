import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MoviesReducer } from './store/reducers/movies.reducers';
import { MoviesEffects } from './store/effects/movies.effects';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    HomePageComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([MoviesEffects]),
    StoreModule.forRoot({
      movies: MoviesReducer,
    }),
    HttpClientModule,
    AppRoutingModule,
    ClickOutsideModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
