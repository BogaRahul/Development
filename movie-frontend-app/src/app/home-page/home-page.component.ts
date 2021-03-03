import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as fromStore from '../store';

import { ApiRequestService } from '../apirequestservice/apirequestservice';
import { Movie } from '../model/movie';
import { GetMovies } from '../store/actions/movies.actions';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  title = 'movie-frontend-app';

  movies$: Observable<Movie[]>;

  moviesList = {};
  favoritesList = [];
  expand = false;
  fav_expanded: boolean = false;

  isLoading: boolean = true;

  @ViewChild('favorite') favElement: ElementRef;

  constructor(
    private store: Store<fromStore.MoviesState>,
    private apiRequestService: ApiRequestService
    ) {
      this.apiRequestService.getConfiguration();
    }

    ngOnInit(): void {
      this.store.dispatch(new GetMovies('now_playing'));
      this.movies$ = this.store.select('allMovies').pipe(
        map((data) => data.data),
        map((data) => {
          data.forEach((movie) => {
            movie.image =
              movie.poster_path != null
                ? this.getImage(movie.poster_path)
                : null;
          });
          return data;
        })
      );

      this.store.select('allMovies')
        .subscribe(data => this.isLoading = data.loading);

    // this.onTrendClick(MovieTrend.NOW_PLAYING)
  }

  onSearchClick(input): void {
    this.moviesList = {};
    this.apiRequestService
      .getMovies(input)
      .pipe(map((response) => response.results))
      .subscribe((data) => this.setMovies(data));
  }

  setMovies(movies): void {
    this.moviesList = {};
    movies.forEach((movie) => {
      movie.isFavorite = false;
      // this.moviesList[movie.imdbID] = movie;
      movie.image =
        movie.poster_path != null ? this.getImage(movie.poster_path) : null;
      this.moviesList[movie.id] = movie;
    });
    console.log(this.moviesList);
  }

  getImage(id): string {
    return this.apiRequestService.getImage(id);
  }

  onTrendClick(trend: string, page?: string) {
    this.store.dispatch(new GetMovies(trend));
    // this.favoritesList.forEach((id) => {
    //   console.log(this.moviesList[id]);
    // });
    // this.apiRequestService
    //   .getMoviesByTrend(trend, page)
    //   .pipe(map((response) => response['results']))
    //   .subscribe((data) => this.setMovies(data));
  }

  // onCardClick(id: string): void {
  //   this.apiRequestService.getMovie(id)
  //     .subscribe(movieDetails => {
  //       console.log(movieDetails);
  //     });
  //   this.expand = !this.expand;
  // }

  openFavorites(): void {
    this.fav_expanded = !this.fav_expanded;
  }

  closeFavorite(): void {
    console.log('CLICK OUTSIDE');
    this.fav_expanded = false;
  }

  addFavorite(id): void {
    this.moviesList[id].isFavorite = true;
    this.favoritesList.push(this.moviesList[id]);
    // console.log(this.favoritesList);
    // console.log(this.moviesList[id]);
  }

  removeFavorite(id): void {
    this.moviesList[id].isFavorite = false;
    const index = this.favoritesList.find((x) => x.imdbID === id);
    this.favoritesList.splice(index, 1);
    // console.log(this.favoritesList);
  }
}
