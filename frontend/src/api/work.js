import instance from './index';

// 특정 게스트하우스에 대한 모집공고 리스트 확인
const getMyRecruitments = (guestHouseUid) => {
  return instance.get(`/api/guest-house-recruitment/${guestHouseUid}`);
};

// 모집중인 직무 모두 보기
const allWorkList = () => {
  return instance.get(`/api/job-offer?pageNumber=${1}`);
};

// recruitmentUid를 통해 모집공고 세부 정보 제공
const recruitmentDetail = (recruitmentUid) => {
  return instance.get(`/api/job-offer/${recruitmentUid}`, {}, {});
};

// 직무 디테일 조회
const getWorkDetail = (workUid) => {
  return instance.get(`/api/work/${workUid}`);
};

// 공고 작성
const createRecruitment = (body, token) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return instance.post('/auth/job-offer', body, config);
};

// 공고 수정
const updateRecruitment = (body, token, recruitmentUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return instance.put(`/auth/job-offer/${recruitmentUid}`, body, config);
};

// 특정 게스트하우스에 대한 직무 리스트 확인
const getMyWorks = (token, guestHouseUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.get(`/auth/recruitment-work-list/${guestHouseUid}`, config);
};

// 직무 작성
function createWork(body, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.post('/auth/work', body, config);
}

// 직무 수정
const updateWork = (body, token) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.put('/auth/work', body, config);
};

// 직무 삭제
function deleteWork(workUid, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.delete(`/auth/work/${workUid}`, config);
}

// 직무 검색
const filterWorks = (info) => {
  let query = `/api/job-offer/search?areaName=${info.selectedArea}&pageNumber=${info.pageNumber}&`;
  if (info.styleTags.length === 0) query += 'styles=&';
  info.styleTags.map((style) => {
    query += `styles=${style}`;
  });
  query += `word=${info.word}&entryDate=${info.startDate}`;
  return instance.get(query);
};

export {
  recruitmentDetail,
  allWorkList,
  filterWorks,
  createWork,
  updateWork,
  deleteWork,
  getMyWorks,
  getWorkDetail,
  getMyRecruitments,
  createRecruitment,
  updateRecruitment,
};
