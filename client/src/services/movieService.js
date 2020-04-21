import axios from 'axios';

export default {
  getAll: async (searchTerm = undefined) => {
    let res = await axios.get(`/api/movie`,{params: {
      search: searchTerm
    }});
    
    return res.data || [];
  },
  getById: async (id) => {
    let res = await axios.get('/api/movie/' + id ); 
    return res.data || [];
  }
}