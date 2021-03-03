import { Action, createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/model/movie';

export enum Types {
  GET_MOVIES = '[MOVIES] Get Movies',
  GET_MOVIES_SUCCESS = '[MOVIES] Get Movies Success',
  GET_MOVIES_FAILURE = '[MOVIES] Get Movies Failure'
}
export class GetMovies implements Action {
  readonly type = Types.GET_MOVIES;
  constructor(public payload: string){}
}

export class GetMoviesSuccess implements Action {
  readonly type = Types.GET_MOVIES_SUCCESS;
  constructor(public payload: Movie[]){}
}
export class GetMoviesFailure implements Action {
  readonly type = Types.GET_MOVIES_FAILURE;
  constructor(public payload: any){}
}

export type ActionsType = GetMovies | GetMoviesSuccess | GetMoviesFailure;

// export const GetMovies = createAction(Types.GET_MOVIES);
// export const GetMoviesSuccess = createAction(Types.GET_MOVIES_SUCCESS, props<{movies: Movie[]}>());
// export const GetMoviesFailure = createAction(Types.GET_MOVIES_FAILURE, props<{error:any}>());
