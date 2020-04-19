import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/movie`);
    return res.data || [];
  },
  getById: async (id) => {
    let res = await axios.get('/api/movie/' + id ); 
    return res.data || [];
  }
}