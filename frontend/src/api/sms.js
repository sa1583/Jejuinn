import instance from '.';

const sendMessageByIds = (body, token) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.post('/auth/interview/phone', body, header);
};

export { sendMessageByIds };
