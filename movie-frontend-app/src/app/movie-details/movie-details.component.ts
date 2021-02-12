import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiRequestService } from '../apirequestservice/apirequestservice';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movieID: string;
  private routeSub$: Subscription;
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private apirequest: ApiRequestService
  ) { 
    apirequest.getConfiguration();
    this.routeSub$ =this.route.params.subscribe(params => {
      this.movieID = params.id;
    })
  }

  ngOnInit(): void {
    this.apirequest.getMovie(this.movieID)
      .subscribe(movie => {
        console.log(movie);
        movie['image'] = movie['poster_path'] != null ? this.apirequest.getImage(movie['poster_path']) : null;
        this.movie = movie;
      })
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }

}
