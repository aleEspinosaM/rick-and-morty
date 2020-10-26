export const GET_CHARACTERS_STARTED = 'GET_CHARACTERS_STARTED';
export const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
export const GET_LOCATION_FAILED = 'GET_LOCATION_FAILED';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_CHARACTERS_FAILED = 'GET_CHARACTERS_FAILED';
export const SET_PAGE = 'SET_PAGE';
export const SET_TERM = 'SET_TERM';
export const SET_LOCATION_ID = 'SET_LOCATION_ID';
export const RESET_LOCATION = 'RESET_LOCATION';

export const getCharactersStarted = () => ({type: GET_CHARACTERS_STARTED});
export const getCharactersFailed = (error) => ({type: GET_CHARACTERS_FAILED, payload: error});
export const getCharactersSuccess = (data) => ({type: GET_CHARACTERS_SUCCESS, payload: {...data}});
export const getLocationFailed = (error) => ({type: GET_LOCATION_FAILED, payload: error});
export const getLocationSuccess = (data) => ({type: GET_LOCATION_SUCCESS, payload: {...data}});
export const setPage = (url = '') => {
  const [_, page] = url.split('page=') || [];
  return {
    type: SET_PAGE,
    payload: page || 1,
  }
}
export const setTerm = (term) => ({type: SET_TERM, payload: term});
export const setLocationId = (locationId) => ({
  type: SET_LOCATION_ID, 
  payload: locationId.split('location/')[1]
});
export const resetLocation = () => ({type: RESET_LOCATION});
