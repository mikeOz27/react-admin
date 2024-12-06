import axios from 'axios';
import env from '../constants/apiConst';

const { BASE_URL } = env
const url = BASE_URL;

const api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
