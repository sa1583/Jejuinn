import { apiInstance } from '.';

const api = apiInstance();

async function loginNaver(token) {
  return api.post(
    '/api/users/social/naver',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export { loginNaver };
