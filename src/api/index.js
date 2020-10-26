import axios from 'axios';

export const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const getAllCharacters = (url = BASE_URL) => axios.get(url);
export const getLocation = (locationId) => axios.get(`https://rickandmortyapi.com/api/location/${locationId}`);