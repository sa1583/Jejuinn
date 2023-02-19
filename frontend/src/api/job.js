import instance from '.';

/**
 * @param {string} accessToken
 * accessToken으로 내 지원목록 가져오기
 */
const getMyApplyList = (accessToken) => {
  const header = {
    headers: {
      accessToken: `Bearer ${accessToken}`,
    },
  };
  return instance.get('/auth/my-apply-list', header);
};

/**
 * @param {string} accessToken
 * accessToken으로 내가 관심있는 게스트하우스 목록 가져오기
 */
const getMyInterestGuestHouses = (accessToken) => {
  const header = {
    headers: {
      accessToken: `Bearer ${accessToken}`,
    },
  };
  return instance.get('/auth/guest-house-list/like', header);
};

// 내가 좋아요 누른 관광지 리스트 가져오기
const getMyInterestAttractions = (accessToken) => {
  const header = {
    headers: {
      accessToken: `Bearer ${accessToken}`,
    },
  };
  return instance.get('/auth/travel-place/reviews/like', header);
};

//내가 작성한 관광지 글 리스트 가져오기
const getMyReivewList = (accessToken) => {
  const header = {
    headers: {
      accessToken: `Bearer ${accessToken}`,
    },
  };
  return instance.get('/auth/my-travel-place/review', header);
};

// 직무 지원하기
const applyToWork = (body, token) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.post('/auth/job-search/apply', body, header);
};

export {
  getMyApplyList,
  getMyInterestGuestHouses,
  getMyInterestAttractions,
  getMyReivewList,
  applyToWork,
};
