import { Action } from "@ngrx/store";

export enum Types {
  GET_MOVIES = '[MOVIES] GET MOVIES',
  GET_MOVIES_SUCCESS = '[MOVIES1] GET MOVIES SUCCESS',
  GET_MOVIES_FAILURE = '[MOVIES1] GET MOVIES FAILURE'
}


export class GetMovies implements Action {
  readonly type = Types.GET_MOVIES;
}

export class GetMoviesSuccess implements Action {
  readonly type = Types.GET_MOVIES_SUCCESS;
  constructor(public payload: string){}
}
export class GetMoviesFailure implements Action {
  readonly type = Types.GET_MOVIES_FAILURE;
  constructor(public payload: Error){}
}

export type MoviesActions = GetMovies | GetMoviesSuccess | GetMoviesFailure;