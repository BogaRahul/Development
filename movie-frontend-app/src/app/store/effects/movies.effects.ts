import { Injectable, Type } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, withLatestFrom, } from 'rxjs/operators';
import { of } from 'rxjs';

import { ApiRequestService } from './../../apirequestservice/apirequestservice';
import * as actions from './../actions/movies.actions';
import * as reducers from '../reducers/movies.reducers';
import { Store } from '@ngrx/store';
import { Movie } from '../../model/movie';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<reducers.State>,
    private apiService: ApiRequestService
  ) {}

  @Effect()
  getMovies$ =
    this.actions$.pipe(
      ofType(actions.Types.GET_MOVIES),
      // withLatestFrom(
      //   this.store.select(selectors.getAllMoviesState),
      //   (actions: any, state: any) => state
      // ),
      map((actions: actions.GetMovies) => actions.payload),
      switchMap((payload): any => {
        console.log(payload);
        return this.apiService.getMoviesByTrend(payload)
          .pipe(
            map(movies => {
              const allMovies: Movie[] = [];
              movies.results.forEach(element => {
                allMovies.push(element)
              });
              console.log(allMovies);
              return new actions.GetMoviesSuccess(allMovies);
            }),
            catchError(error => of(new actions.GetMoviesFailure({error})))
          );
        }
      )
    );
}
