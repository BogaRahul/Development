import { ApiRequestService } from './../../apirequestservice/apirequestservice';
import * as actions from './../actions/movies.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MoviesEffects {

    constructor(
        private actions$: Actions,
        private apiService: ApiRequestService
    ) {}

    getMovies$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.Types.GET_MOVIES),
            switchMap((): any => {
                const movieTrend = '';
                return this.apiService.getMoviesByTrend(movieTrend)
                    .pipe(
                        map(data => new actions.GetMoviesSuccess(data)),
                        catchError(error => of(new actions.GetMoviesFailure(error)))
                    );
            })
        )
    }) 
}