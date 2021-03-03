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
import { effects } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers/index';


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    HomePageComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    }),
    HttpClientModule,
    AppRoutingModule,
    ClickOutsideModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
