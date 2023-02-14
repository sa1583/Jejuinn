import instance from '.';

const allGuestHouseList = (pageNumber) => {
  return instance.get(`/api/guest-houses?pageNumber=${pageNumber}`);
};

const getMyGuestHouses = (token, userUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.get(`/auth/my-guest-houses/${userUid}`, config);
};

const getApplicantByUid = async (uid, token) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return await instance.get(`/auth/job-search/${uid}`, config);
};

const guestHouseDetail = (guestHouseUid) => {
  return instance.get(`/api/guest-houses/${guestHouseUid}`);
};

const guestHouseCreate = (token, body) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return instance.post(`/auth/guest-house`, body, config);
};

const guestHouseUpdate = (token, guestHouseUid, body) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  console.log('body', body);
  return instance.put(`/auth/guest-houses/${guestHouseUid}`, body, config);
};

const guestHouseDelete = (token, guestHouseUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.delete(`/auth/guest-houses/${guestHouseUid}`, config);
};

const myGuestHouseList = (token, userUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.get(`/auth/my-guest-houses/${userUid}`, config);
};

const myStaffList = (token, guestHouseUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.get(
    `/auth/guest-house/staff?guestHouseUid=${guestHouseUid}`,
    config,
  );
};

const myJobOfferList = (guestHouseUid) => {
  return instance.get(`/api/on-recruitment/${guestHouseUid}`);
};

const myApplicantList = (token, workUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.get(`/auth/recruitment/${workUid}`, config);
};

// guestHouse검색
const getGuestHouses = (info) => {
  let query = `/api/guest-house/search?areaName=${info.areaName}&pageNumber=${info.pageNumber}&`;
  if (info.styles.length === 0) query += 'styles=&';
  info.styles.map((style) => {
    query += `styles=${style}&`;
  });
  query += `word=${info.word}`;
  return instance.get(query);
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
  getGuestHouses,
};
