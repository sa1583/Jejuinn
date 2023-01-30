import axios from 'axios';

function apiInstance() {
  const instance = axios.create({
    // ec2 주소
    baseURL: 'https://i8a603.p.ssafy.io:8080',
    headers: {
      'Content-Type': 'application/json:charset=utf-8',
    },
  });
  return instance;
}

export { apiInstance };
