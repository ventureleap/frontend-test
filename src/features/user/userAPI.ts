import axios from 'axios';
import { Login } from '../../types';

export function loginUser(user: Login) {
  return axios.post('/users/login', user, {});
}

export function registerUser(user: Login) {
  return axios.post('users', user);
}
