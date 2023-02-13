import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jejuinn.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
