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

// 현재 게스트 하우스에서 일하는 직원목록
const myActiveStaffList = (token, guestHouseUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.get(
    `/auth/guest-house/staff/active?guestHouseUid=${guestHouseUid}`,
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

// 내가 좋아요 한 게스트 하우스 목록
const getMyLikedGuestHouseList = (token) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.get('/auth/guest-house-list/like', header);
};

// 게스트 하우스 좋아요
const likeGuestHouse = (token, id) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.put(`/auth/guest-house/like/${id}`, {}, header);
};

// 게스트 하우스 좋아요 취소
const dislikeGuestHouse = (token, id) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.put(`/auth/guest-house/dislike/${id}`, {}, header);
};

// 문자 보내기
const sendMessage = (token, guestHouseUid, userUid) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  const body = {
    guestHouseUid,
    userUid,
  };
  return instance.post('/auth/interview/phone', body, header);
};

// 직무 id로 게스트하우스 id조회
const getGuestHouseUidByWorkUid = (workUid, token) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.get(`/auth/get-guest-house/${workUid}`, header);
};

// 스태프 채용
const hireStaff = (guestHouseUid, staffUid, workName, token) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.post(
    `/auth/guest-house/staff?guestHouseUid=${guestHouseUid}&userUid=${staffUid}&workName=${workName}`,
    {},
    header,
  );
};

// 스태프 업무 종료
const fireStaff = (guestHouseUid, staffUid, token) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.delete(
    `/auth/guest-house/staff?guestHouseUid=${guestHouseUid}&staffUid=${staffUid}`,
    header,
  );
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
  myActiveStaffList,
  myJobOfferList,
  myApplicantList,
  getMyGuestHouses,
  getGuestHouses,
  getMyLikedGuestHouseList,
  likeGuestHouse,
  dislikeGuestHouse,
  sendMessage,
  getGuestHouseUidByWorkUid,
  hireStaff,
  fireStaff,
};
