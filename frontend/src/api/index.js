import axios from 'axios';

function apiInstance() {
  const instance = axios.create({
    // postman mock server url 추후 수정
    baseURL: 'https://1c03ef54-8003-470e-852c-9f2591a18909.mock.pstmn.io',
    headers: {
      'Content-Type': 'application/json:charset=utf-8',
    },
  });
  return instance;
}

export { apiInstance };
