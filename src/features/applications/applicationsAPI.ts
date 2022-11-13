import axios from 'axios';

export async function getApplications() {
  const response = await axios.get('/applications');

  return await response.data;
}
