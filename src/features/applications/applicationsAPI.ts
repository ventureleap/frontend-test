import axios from 'axios';
import { Application } from '../../types';

export function getApplications() {
  return axios.get('/applications');
}

export function createApplication(application: Application) {
  return axios.post('/applications', application);
}
