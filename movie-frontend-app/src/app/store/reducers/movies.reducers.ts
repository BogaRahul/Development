import { MoviesActions, Types } from '../actions/movies.actions';
import { Movie } from '../../model/movie';
import { AppState } from '../../app.state';

export interface MoviesState  {
  list: Movie[],
  loading?: boolean,
  error?: Error
}

const initial_state: AppState = {
 list: [ {
  "adult": false,
  "backdrop_path": "/srYya1ZlI97Au4jUYAktDe3avyA.jpg",
  "genre_ids": [
      14,
      28,
      12
  ],
  "id": 464052,
  "original_language": "en",
  "original_title": "Wonder Woman 1984",
  "overview": "Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.",
  "popularity": 2614.604,
  "poster_path": "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  "release_date": "2020-12-16",
  "title": "Wonder Woman 1984",
  "video": false,
  "vote_average": 7,
  "vote_count": 3596
} as Movie] 
//  loading: false,
//  error: undefined
}

export function reducer(state: AppState = initial_state, 
  actions: MoviesActions) {


  switch(actions.type) {
    case Types.GET_MOVIES :
      console.log(state);
      return {
        ...state,
        loading: true
      } as MoviesState;
    
    case Types.GET_MOVIES_SUCCESS :
      return {
        ...state,
        loading: false
      } as MoviesState
    case Types.GET_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.payload
      } as MoviesState
      default: return state;
  }


}