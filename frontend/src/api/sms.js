import instance from '.';

const sendMessageByIds = (body, token) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.post('/auth/interview/phone', body, header);
};

// 화상채팅 url 메일로 전송
const snedVideoInterviewUrl = (guestHouseUid, userUid, url) => {
  const body = {
    guestHouseUid,
    url,
    userUid,
  };
  return instance.post('/api/openvidu/link', body);
};

export { sendMessageByIds, snedVideoInterviewUrl };
