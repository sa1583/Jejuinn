import { apiInstance } from './index';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../store/user';

const api = apiInstance();

const Access_token = () => {
  const token = useSelector(selectAccessToken);
  return token;
};

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

const guestHouseCreate = (body) => {
  const config = {
    headers: {
      access_token: `Bearer ${Access_token()}`,
    },
  };
  return api.post('/auth/guest-house', body, config);
};

const guestHouseUpdate = (guestHouseUid, body) => {
  const config = {
    headers: {
      access_token: `Bearer ${Access_token()}`,
    },
  };
  return api.put(`/auth/guest-houses/${guestHouseUid}`, body, config);
};

const guestHouseDelete = (guestHouseUid) => {
  const config = {
    headers: {
      access_token: `Bearer ${Access_token()}`,
    },
  };
  return api.delete(`/auth/guest-houses/${guestHouseUid}`, config);
};

const myGuestHouseList = () => {
  const config = {
    headers: {
      access_token: `Bearer ${Access_token()}`,
    },
  };
  return api.get('/auth/my-guest-house', config);
};

const myStaffList = (guestHouseUid) => {
  const config = {
    headers: {
      access_token: `Bearer ${Access_token()}`,
    },
  };
  return api.get(`/auth/guest-house/staff/${guestHouseUid}`, config);
};

const myJobOfferList = (guestHouseUid) => {
  const config = {
    headers: {
      access_token: `Bearer ${Access_token()}`,
    },
  };
  return api.get(`/auth/job-offer/${guestHouseUid}`, config);
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
};
