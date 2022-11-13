import axios from 'axios';

export function getApplications() {
  return axios.get('/applications');
}
