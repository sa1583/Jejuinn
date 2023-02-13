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

const getMyInterestAttractions = (accessToken) => {
  const header = {
    headers: {
      accessToken: `Bearer ${accessToken}`,
    },
  };
  return instance.get('/auth/travel-place/reviews/like', header);
};

export { getMyApplyList, getMyInterestGuestHouses, getMyInterestAttractions };
