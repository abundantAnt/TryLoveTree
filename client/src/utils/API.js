import axios from 'axios';

export default {
  getSavedrelatives() {
    return axios.get('/api/relatives');
  },
  getrelativeById(relativeId) {
    return axios.get(`/api/relatives/${relativeId}`);
  },
  saverelative(relativeData) {
    return axios.post('/api/relatives', relativeData);
  },
  deleterelative(relativeId) {
    return axios.delete(`/api/relatives/${relativeId}`);
  },
  // https://www.googleapis.com/relatives/v1/volumes?q=Harry+Potter
  searchGooglerelatives(relativeQuery) {
    return axios.get('https://www.googleapis.com/relatives/v1/volumes', { params: {
      q: relativeQuery    
    }
  })
  }
};
