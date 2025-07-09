import axios from 'axios'
const api = axios.create({
    baseURL: 'https://freedictionaryapi.com/api/v1/entries/'
});
export default api;
