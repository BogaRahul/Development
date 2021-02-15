import { style } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiRequestService } from '../apirequestservice/apirequestservice';
import { Cast, Crew } from '../model/cast';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movieID: string;
  private routeSub$: Subscription;
  movie: any;
  cast: Cast[] = [];
  crew: Crew[] = [];


  @ViewChild('container') container: ElementRef;

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
        this.setCastForMovie();
        this.setCrewForMovie();
      });
  }

  setCastForMovie() {
    this.apirequest.getCastAndCrew(this.movieID)
      .pipe(map(data => data.cast))
        .subscribe((cast: Cast[]) => {
          for(let i = 0; i < cast.length; i++) {
            if(i === 20) break;
            cast[i].image = cast[i].profile_path != null ? this.apirequest.getImage(cast[i].profile_path) : null;
            this.cast.push(cast[i]);
          }
          // console.log(this.cast);
      })
  }

  setCrewForMovie() {
    this.apirequest.getCastAndCrew(this.movieID)
      .pipe(map(data => data.crew))
        .subscribe((crewArray: Crew[]) => {
          console.log(crewArray);
          for(let i = 0; i< crewArray.length ; i++) {
            if(crewArray[i].profile_path == null) continue;
            if(this.crew.length === 20) break;
            crewArray[i].image = crewArray[i].profile_path != null ? this.apirequest.getImage(crewArray[i].profile_path) : null;
            this.crew.push(crewArray[i]);
          }
          console.log(this.crew);
      })
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }

}
