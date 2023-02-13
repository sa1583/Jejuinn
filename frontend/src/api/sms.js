import { apiInstance } from '.';

const api = apiInstance();

const sendMessageByIds = (body, token) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.post('/auth/interview/phone', body, header);
};

export { sendMessageByIds };
