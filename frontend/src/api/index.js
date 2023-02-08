import axios from 'axios';

function apiInstance() {
  const instance = axios.create({
    // ec2 주소
    baseURL: 'https://jejuinn.com',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return instance;
}

export { apiInstance };
