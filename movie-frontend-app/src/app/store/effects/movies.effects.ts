import { ApiRequestService } from './../../apirequestservice/apirequestservice';
import {
  Types,
  GetMoviesSuccess,
  GetMoviesFailure,
} from './../actions/movies.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Movie } from '../../model/movie';
import { Action, State } from '@ngrx/store';

@Injectable()
export class MoviesEffects {
  @Effect()
  getMovies$ =
    this.actions$.pipe(
      ofType(Types.GET_MOVIES),
      switchMap((action) => {
        const movieTrend = action['payload'];
        console.log(movieTrend);
         return this.apiService.getMoviesByTrend(movieTrend).pipe(
          map((movies) => {
              console.log(movies);
             return new GetMoviesSuccess(movies);
          }),
          catchError((error) => of(new GetMoviesFailure(error)))
        );
      })
    );
//   });

  constructor(
    private actions$: Actions,
    private apiService: ApiRequestService
  ) {}
}
