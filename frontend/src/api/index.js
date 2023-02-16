import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jejuinn.com:8084',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
