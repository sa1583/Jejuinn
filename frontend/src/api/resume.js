import instance from './index';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../store/user';

const Access_token = () => {
  const token = useSelector(selectAccessToken);
  return token;
};

function myCareerList() {
  let header = {
    headers: {
      access_token: `Bearer ${Access_token}`,
    },
  };

  // return api.get('/auth/my-history/{userUid}', {}, header);

  // props 정상적으로 작동하는지 확인해보려고 만든 리턴
  // API 연결 후 위의 리턴 주석 해지

  return [['career1'], ['career2']];
}

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

export {
  myCareerList,
  getResume,
  registMyResume,
  modifyMyResume,
  changeAutoApply,
};
