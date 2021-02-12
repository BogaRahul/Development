import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiRequestService } from '../apirequestservice/apirequestservice';

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

  constructor(private apiRequestService: ApiRequestService){}


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.apiRequestService.getConfiguration();
    this.moviesList = {};
    this.apiRequestService.getMovies('tremor')
      .pipe(map(response => response.results))
      .subscribe((data) => 
        this.setMovies(data)
      );
  }

  onSearchClick(input): void {
    this.moviesList = {};
    this.apiRequestService.getMovies(input)
      .pipe(map(response => response.results))
      .subscribe(data => this.setMovies(data));
  }

  setMovies(movies): void {
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

  onCardClick(id: string): void {
    this.apiRequestService.getMovie(id)
      .subscribe(movieDetails => {
        console.log(movieDetails);
      });
    this.expand = !this.expand;
  }

  addFavorite(id): void {
    this.moviesList[id].isFavorite = true;
    this.favoritesList.push(id);
    console.log(this.favoritesList);
  }

  removeFavorite(id): void{
    this.moviesList[id].isFavorite = false;
    const index = this.favoritesList.find(x => x.imdbID === id);
    this.favoritesList.splice(index, 1);
    console.log(this.favoritesList);
  }



}
