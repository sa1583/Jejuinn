import axios from 'axios';
import { apiInstance } from './index';

const api = apiInstance();

function createComment(body, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.post('/auth/comment', body, config);
}

export { createComment };
