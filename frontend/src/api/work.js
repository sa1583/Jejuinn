import { apiInstance } from './index';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../store/user';

const api = apiInstance();

const Access_token = () => {
  const token = useSelector(selectAccessToken);
  return token;
};

const allWorkList = () => {
  return api.get(`/api/job-offer?pageNumber=${1}`);
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

function createWork(body, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.post('/auth/work', body, config);
}

function updateWork(body, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.put('/auth/work', body, config);
}

function deleteWork(workUid, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.delete(`/auth/work/${workUid}`, config);
}

const getMyWorks = (token, guestHouseUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.get(`/auth/recruitment-work-list/${guestHouseUid}`, config);
  // return [{ uid: 1 }, { uid: 2 }, { uid: 3 }];
};

const getMyRecruitments = (guestHouseUid) => {
  return api.get(`/api/guest-house-recruitment/${guestHouseUid}`);
};

const updateRecruitment = (body, token) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.put('/auth/job-offer', body, config);
};

const createRecruitment = (body, token) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.post('/auth/job-offer', body, config);
};

export {
  recruitmentDetail,
  allWorkList,
  filteredWorkList,
  createWork,
  updateWork,
  deleteWork,
  getMyWorks,
  getMyRecruitments,
  createRecruitment,
  updateRecruitment,
};
