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
      accessToken: `Bearer ${Access_token()}`,
    },
  };
  return api.post('/auth/job-offer', body, config);
};

function createWork(body, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.post('/auth/work', body, config);
}

function getMyGuestHouses() {
  // return api.post('/auth/myhouses', body, config);

  return [['게토'], ['게토']];
}

function updateWorkDetail() {
  return api.put();
}

function deleteWorkDetail(workUid, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.delete(`/auth/work/${13}`, config);
}

export {
  recruitmentDetail,
  allWorkList,
  filteredWorkList,
  writeRecruitment,
  createWork,
  getMyGuestHouses,
  updateWorkDetail,
  deleteWorkDetail,
};
