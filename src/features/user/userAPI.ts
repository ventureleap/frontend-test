import axios from 'axios';
import { apiUrl } from '../../config';
import { Login } from '../../types';

export function loginUser(user: Login) {
  return axios.post(`${apiUrl}users/login`, user);
}

export function registerUser(user: Login) {
  return axios.post(`${apiUrl}users`, user);
}
