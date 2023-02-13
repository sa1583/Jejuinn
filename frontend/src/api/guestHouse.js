import { apiInstance } from './index';

const api = apiInstance();

const allGuestHouseList = (pageNumber) => {
  return api.get(`/api/guest-houses?pageNumber=${pageNumber}`);
};

const getMyGuestHouses = (token, userUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.get(`/auth/my-guest-houses/${userUid}`, config);
  // return { data: [{ uid: 1 , title:'간장남'}] };
  // return { data: [{ uid: 1 , guestHouseName:'간장남'}, { uid: 2 , guestHouseName:'게토'}] };
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
      'Content-Type': 'multipart/form-data',
    },
  };
  return api.post(`/auth/guest-house`, body, config);
};

const guestHouseUpdate = (token, guestHouseUid, body) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  console.log('body', body);
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

const myJobOfferList = (guestHouseUid) => {
  return api.get(`/api/on-recruitment/${guestHouseUid}`);
};

const myApplicantList = (token, workUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.get(`/auth/recruitment/${workUid}`, config);
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
  getMyGuestHouses,
};
