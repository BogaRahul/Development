import { MoviesActions, Types } from '../actions/movies.actions';
import { Movie } from '../../model/movie';


// const initial_state: Movie[] = [
//   {
//     id: 1,
//     title: 'Wonder Woman 1984',
//   },
// ];

export function MoviesReducer(
  state: Movie[],
  actions: MoviesActions
) {
  console.log(state, actions.type);

  switch (actions.type) {
    case Types.GET_MOVIES :
      return state;
    case Types.GET_MOVIES_SUCCESS :
      console.log(state);
      return [...state, actions.payload];
    case Types.GET_MOVIES_FAILURE :
      return 'Failed';
    default:
      return state;
  }
}
