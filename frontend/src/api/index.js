import axios from 'axios';

function apiInstance() {
  const instance = axios.create({
    // ec2 주소
    // baseURL: 'http://i8a603.p.ssafy.io:8080',
    baseURL: 'https://jejuinn.com',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return instance;
}

export { apiInstance };
