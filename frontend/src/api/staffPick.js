import { apiInstance } from './index';

const api = apiInstance();

// 로그인한 유저만 보낼 수 있는 api에 헤더 access_token 넣기
const getAdminTokenHeader = (token) => `Bearer ${token}`;

function getSpotsPin() {
  return api.get('/api/travelPlace/pins');
}

function getSpotsImg() {
  return api.get('/api/travelPlace');
}

function getReviews(uid) {
  return api.get(`/api/all-spot/${uid}`);
}

function getSpotInfo(uid) {
  return api.get(`/api/travelPlace/${uid}`);
}

// 새로운 명소 생성시 인풋값에 따라 이름 추천
function getRecommendName(parameter) {
  return api.get(`/api/travelPlace/search/name?query=${parameter}`);
}

export { getSpotsPin, getReviews, getSpotInfo, getRecommendName, getSpotsImg };
