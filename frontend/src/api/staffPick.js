import { apiInstance } from './index';

const api = apiInstance();

// 로그인한 유저만 보낼 수 있는 api에 헤더 access_token 넣기
const getAdminTokenHeader = (token) => {
  return {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
};

function createSpotReview(token, body) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  return api.post('/auth/travel-place/reviews', body, config);
}

// 명소 리스트 핀
function getSpotsPin() {
  return api.get('/api/travel-place/pins');
}

// 명소 리스트 이미지
function getSpotsImg() {
  return api.get('/api/travel-places');
}

// 명소 리스트 필터
function getSpotsByFilter(filter) {
  return api.get(
    `/api/travel-place/search?areaName=${filter.areaName}&category=${filter.category}&word=${filter.word}&pageNumber=1`,
  );
}

// 선택한 명소의 디테일
function getSpotInfo(uid) {
  return api.get(`/api/travel-places/${uid}`);
}

// 선택한 명소의 리뷰 리스트
function getReviews(uid) {
  return api.get(`/api/travel-place/${uid}/reviews`);
}

// 새로운 명소 생성시 인풋값에 따라 이름 추천
function getRecommendName(parameter) {
  return api.get(`/api/travel-place/search/name?query=${parameter}`);
}

// 리뷰 디테일 정보
function getReviewDetail(uid) {
  return api.get(`/api/travel-place/reviews/${uid}`);
}

// 새로운 명소 등록
function createNewSpot(data) {
  return api.post('/api/travel-place', data);
}

export {
  getSpotsPin,
  getSpotInfo,
  getReviews,
  getRecommendName,
  getSpotsImg,
  getReviewDetail,
  getSpotsByFilter,
  createSpotReview,
  createNewSpot,
};
