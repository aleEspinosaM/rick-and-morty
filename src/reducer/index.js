import {
  GET_CHARACTERS_FAILED, 
  GET_CHARACTERS_STARTED, 
  GET_CHARACTERS_SUCCESS,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILED,
  SET_PAGE,
  SET_TERM,
  SET_LOCATION_ID,
  RESET_LOCATION,
} from '../actions';
import {API_STATUS} from '../constants';

export const initialState = {
    characters: [],
    isLoadingCharacters: API_STATUS.IDLE,
    isLoadingLocation: API_STATUS.IDLE,
    locationId: null,
    location: {},
    data: [],
    page: 1,
    pages: 0,
    next: null,
    prev: null,
    error: null,
    term: '',
}

export default function rootReducer(state, {type, payload}) {
  switch (type) {
    case RESET_LOCATION: 
      return {
        ...state,
        isLoadingLocation: API_STATUS.IDLE,
        locationId: null,
        location: {}
      }
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        isLoadingLocation: API_STATUS.RESOLVED,
        location: payload
      }
    case GET_LOCATION_FAILED:
      return {
        ...state,
        isLoadingLocation: API_STATUS.REJECTED,
        error: payload
      }
    case SET_LOCATION_ID: 
      return {
        ...state,
        locationId: payload
      }
    case SET_TERM:
      return {
        ...state,
        term: payload,
      }
    case SET_PAGE:
      return {
        ...state,
        page: payload,
        term: '',
      }
    case GET_CHARACTERS_STARTED:
      return {
        ...state,
        isLoadingCharacters: API_STATUS.PENDING,
      }
      case GET_CHARACTERS_FAILED:
        return {
          ...state,
          isLoadingCharacters: API_STATUS.REJECTED,
          error: payload,
        }
      case GET_CHARACTERS_SUCCESS:
        return {
          ...state,
          characters: payload.results,
          isLoadingCharacters: API_STATUS.RESOLVED,
          pages: payload.info.pages,
          next: payload.info.next,
          prev: payload.info.prev,
        }
      default: 
        return {...state}
  }
};