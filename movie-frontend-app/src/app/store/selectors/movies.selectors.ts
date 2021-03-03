import * as fromAllMovies from '../reducers/movies.reducers';
import * as fromModule from '../reducers';
import { createSelector } from '@ngrx/store';
import { Movie } from 'src/app/model/movie';



export const getAllMoviesState = createSelector(
  fromModule.getMoviesState,
  (state: fromModule.MoviesState) => state.allMovies
);

export const getAllMovies = createSelector(
  getAllMoviesState,
  (state) => state.data as Movie[]
);

export const isLoading = createSelector(
  getAllMoviesState,
  (state: fromAllMovies.State) => state.loading
);