import { apiInstance } from './index';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../store/user';

const api = apiInstance();

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

export { myCareerList };
