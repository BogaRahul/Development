import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiRequestService } from '../apirequestservice/apirequestservice';

enum MovieTrend {
  NOW_PLAYING = 'now_playing',
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
  UPCOMING = 'upcoming'
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  title = 'movie-frontend-app';
  moviesList = {};
  favoritesList = [];
  expand = false;
  fav_expanded: boolean = false;

  @ViewChild('favorite') favElement: ElementRef;

  constructor(private apiRequestService: ApiRequestService){}


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log("HOMEPAGE");
    this.apiRequestService.getConfiguration();
    this.onTrendClick(MovieTrend.NOW_PLAYING)
  }

  onSearchClick(input): void {
    this.moviesList = {};
    this.apiRequestService.getMovies(input)
      .pipe(map(response => response.results))
      .subscribe(data => this.setMovies(data));
  }

  setMovies(movies): void {
    this.moviesList = {};
    movies.forEach(movie => {
      movie.isFavorite = false;
      // this.moviesList[movie.imdbID] = movie;
      movie.image = movie.poster_path != null ? this.getImage(movie.poster_path) : null;
      this.moviesList[movie.id] = movie;

    });
    console.log(this.moviesList);
  }

  getImage(id): string {
    return this.apiRequestService.getImage(id);
  }

  onTrendClick(trend: string, page?: string) {
    this.favoritesList.forEach(id => {
      console.log(this.moviesList[id]);
    }); 
    this.apiRequestService.getMoviesByTrend(trend, page)
    .pipe(map(response => response['results']))
      .subscribe(data => this.setMovies(data));
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
    console.log("CLICK OUTSIDE");
    this.fav_expanded = false;
  }

  addFavorite(id): void {
    this.moviesList[id].isFavorite = true;
    this.favoritesList.push(this.moviesList[id]);
    // console.log(this.favoritesList);
    // console.log(this.moviesList[id]);
  }

  removeFavorite(id): void{
    this.moviesList[id].isFavorite = false;
    const index = this.favoritesList.find(x => x.imdbID === id);
    this.favoritesList.splice(index, 1);
    // console.log(this.favoritesList);
  }

}
