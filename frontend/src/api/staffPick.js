import instance from './index';

// 명소 리뷰 작성
function createSpotReview(token, body) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return instance.post('/auth/travel-place/reviews', body, config);
}

// 명소 리뷰 수정
function updateSpotReview(token, body, uid) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return instance.put(`/auth/travel-place/reviews/${uid}`, body, config);
}

// 명소 리스트 핀
function getSpotsPin() {
  return instance.get('/api/travel-place/pins');
}

// 명소 리스트 이미지
function getSpotsImg(pageNumber) {
  return instance.get(`/api/travel-places?pageNumber=${pageNumber}`);
}

// 명소 리스트 필터
function getSpotsByFilter(filter) {
  return instance.get(
    `/api/travel-place/search?areaName=${filter.areaName}&category=${filter.category}&word=${filter.word}&pageNumber=1`,
  );
}

// 선택한 명소의 디테일
function getSpotInfo(uid) {
  return instance.get(`/api/travel-places/${uid}`);
}

// 선택한 명소의 리뷰 리스트
function getReviews(uid) {
  return instance.get(`/api/travel-place/${uid}/reviews`);
}

// 새로운 명소 생성시 인풋값에 따라 이름 추천
function getRecommendName(parameter) {
  return instance.get(`/api/travel-place/search/name?query=${parameter}`);
}

// 리뷰 디테일 정보
function getReviewDetail(uid) {
  return instance.get(`/api/travel-place/reviews/${uid}`);
}

// 새로운 명소 등록
function createNewSpot(data) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return instance.post('/api/travel-place', data, config);
}

// 리뷰 디테일 삭제
function deleteReviewDetail(reviewUid, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };

  return instance.delete(`/auth/travel-place/reviews/${reviewUid}`, config);
}

// 좋아요 누른 리뷰 리스트
function likedReviewLikst(token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };

  return instance.get(`/auth/travel-place/reviews/like`, config);
}

// 리뷰 좋아요 누르기
function likeReview(token, uid) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };

  return instance.put(`/auth/travel-place/reviews/${uid}/like`, {}, config);
}

// 리뷰 좋아요 취소
function dislikeReview(token, reviewUid) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.put(
    `/auth/travel-place/reviews/${reviewUid}/dislike`,
    {},
    config,
  );
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
  deleteReviewDetail,
  updateSpotReview,
  likedReviewLikst,
  likeReview,
  dislikeReview,
};
