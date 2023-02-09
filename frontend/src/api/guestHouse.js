import { apiInstance } from './index';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../store/user';

const api = apiInstance();

const allGuestHouseList = () => {
  return api.get('/api/guest-houses');
};

const getApplicantByUid = async (uid, token) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return await api.get(`/auth/job-search/${uid}`, config);
};

const guestHouseDetail = (guestHouseUid) => {
  return api.get(`/api/guest-houses/${guestHouseUid}`);
};

const guestHouseCreate = (token, body) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.post('/auth/guest-house', body, config);
};

const guestHouseUpdate = (token, guestHouseUid, body) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.put(`/auth/guest-houses/${guestHouseUid}`, body, config);
};

const guestHouseDelete = (token, guestHouseUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.delete(`/auth/guest-houses/${guestHouseUid}`, config);
};

const myGuestHouseList = (token, userUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.get(`/auth/my-guest-houses/${userUid}`, config);
};

const myStaffList = (token, guestHouseUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.get(
    `/auth/guest-house/staff?guestHouseUid=${guestHouseUid}`,
    config,
  );
};

const myJobOfferList = (token, guestHouseUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.get(`/auth/job-offer/${guestHouseUid}`, config);
};

const myApplicantList = (token, workUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.get(`/auth/recruitment/${workUid}`, config);
};

// 아직 api 구현 안됨
const myRecommendList = (token, workUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.get(`/auth/recommend/${workUid}`, config);
};

export {
  guestHouseDetail,
  allGuestHouseList,
  getApplicantByUid,
  guestHouseCreate,
  guestHouseUpdate,
  guestHouseDelete,
  myGuestHouseList,
  myStaffList,
  myJobOfferList,
  myApplicantList,
  myRecommendList,
};
