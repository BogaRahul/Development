import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ApiRequestService } from '../apirequestservice/apirequestservice';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { AppState } from '../app.state';
import { MoviesActions, Types, GetMovies } from '../store/actions/movies.actions';


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

  @ViewChild('favorite') favElement: ElementRef;

  constructor(
    private store: Store<AppState>,
    private apiRequestService: ApiRequestService
    ) {
    }

    ngOnInit(): void {
      // throw new Error('Method not implemented.');
      console.log('HOMEPAGE');
      this.apiRequestService.getConfiguration();
      // this.store.dispatch({type: actions.Types.GET_MOVIES});
      // this.movies$ = this.store.select(store => store.movies);
      this.store.dispatch(new GetMovies('now_playing'));
      this.movies$ = this.store.select(store => store.movies)

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
    this.favoritesList.forEach((id) => {
      console.log(this.moviesList[id]);
    });
    this.apiRequestService
      .getMoviesByTrend(trend, page)
      .pipe(map((response) => response['results']))
      .subscribe((data) => this.setMovies(data));
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
