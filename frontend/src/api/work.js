import { apiInstance } from './index';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../store/user';

const api = apiInstance();

const Access_token = () => {
  const token = useSelector(selectAccessToken);
  return token;
};

const allWorkList = () => {
  return api.get('/api/job-offer');
};

const filteredWorkList = (filterValues) => {
  console.log(filterValues);
  const config = {
    body: {
      filterValues,
    },
  };
  return api.post('/api/job-offer/filter', config, {});
};

const recruitmentDetail = (recruitmentUid) => {
  return api.get(`/api/job-offer/${recruitmentUid}`, {}, {});
};

const writeRecruitment = (body) => {
  const config = {
    headers: {
      access_token: `Bearer ${Access_token()}`,
    },
  };
  return api.post('/auth/job-offer', body, config);
};

export { recruitmentDetail, allWorkList, filteredWorkList, writeRecruitment };
