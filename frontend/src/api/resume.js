import instance from './index';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../store/user';

function getResume(accessToken, userUid) {
  const header = {
    headers: {
      accessToken: `Bearer ${accessToken}`,
    },
  };
  return instance.get(`/auth/job-search/${userUid}`, header);
}

// 지원서 작성
const registMyResume = (token, body) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.post('/auth/job-search', body, header);
};

// 지원서 수정
const modifyMyResume = (token, body) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.put('/auth/job-search', body, header);
};

// 자동추천 온/오프
const changeAutoApply = (token, uid) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.put(`/auth/auto-apply/${uid}`, {}, header);
};

export { getResume, registMyResume, modifyMyResume, changeAutoApply };
