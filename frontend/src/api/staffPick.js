import { apiInstance } from './index';

const api = apiInstance();

// 로그인한 유저만 보낼 수 있는 api에 헤더 access_token 넣기
const getAdminTokenHeader = (token) => `Bearer ${token}`;

function getSpots() {
  return api.get('/api/spot');
}

function getReviews(uid) {
  return api.get(`/api/all-spot/${uid}`);
}

function getReview(uid) {
  return api.get(`/api/spot/{uid}`);
}

// 새로운 명소 생성시 인풋값에 따라 이름 추천
function getRecommendName(parameter) {
  // const setParams = { params: { query: `${parameter}` } };

  return api.get(`/api/travelPlace/search/name?query=${parameter}`);
}

export { getSpots, getReviews, getReview, getRecommendName };
