import * as Actions from '../actions/movies.actions';
import { Movie } from '../../model/movie';

export interface State {
  data: Movie[];
  loading: boolean;
}

export const initial_state: State  = {
  data: [],
  loading: false
};

export function reducer(state: State = initial_state, action: Actions.ActionsType): State {
  switch(action.type) {
    case Actions.Types.GET_MOVIES: {
      return {
        ...state,
        loading: true
      }
    }

    case Actions.Types.GET_MOVIES_SUCCESS: {
      // console.log(action.payload);
      const arr: Movie[] = action.payload;
      return {
        // ...state,
        data: arr,
        loading: false
      }
    }

    case Actions.Types.GET_MOVIES_FAILURE: {
      return {
        ...state,
        loading: false
      }
    }
  }

  return state;
}

// const moviesReducer = createReducer(
//   initial_state,
//   on(moviesActions.GetMovies, state => ({
//     ...state,
//     loading: true
//   })),
//   on(moviesActions.GetMoviesSuccess, state => ({
//     ...state,
//     loading: false
//   })),
//   on(moviesActions.GetMoviesFailure, state => ({
//     ...state,
//     loading: false
//   }))
// )



