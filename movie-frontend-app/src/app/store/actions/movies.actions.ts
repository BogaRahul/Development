import { Movie } from './../../model/movie';
import { Action } from "@ngrx/store";

export enum Types {
  GET_MOVIES = '[MOVIES] GET MOVIES',
  GET_MOVIES_SUCCESS = '[MOVIES] GET MOVIES SUCCESS',
  GET_MOVIES_FAILURE = '[MOVIES] GET MOVIES FAILURE'
}


export class GetMovies implements Action {
  readonly type = Types.GET_MOVIES;
}

export class GetMoviesSuccess implements Action {
  readonly type = Types.GET_MOVIES_SUCCESS;
  constructor(public payload: Movie[]){}
}
export class GetMoviesFailure implements Action {
  readonly type = Types.GET_MOVIES_FAILURE;
  constructor(public payload: any){}
}

export type MoviesActions = GetMovies | GetMoviesSuccess | GetMoviesFailure;