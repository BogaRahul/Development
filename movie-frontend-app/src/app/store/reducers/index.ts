import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromMovies from './movies.reducers';

export interface MoviesState {
  allMovies: fromMovies.State;
}

export const reducers: ActionReducerMap<MoviesState> = {
  allMovies: fromMovies.reducer
}


export const getMoviesState = createFeatureSelector<MoviesState>(
  'movies'
);