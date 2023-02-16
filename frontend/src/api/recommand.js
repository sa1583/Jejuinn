import instance from '.';

// 게스트하우스 추천 직원 리스트 가져오기
const getRecommandedList = (workUid) => {
  return instance.get(`api/job-offer/recommend?workUid=${workUid}`);
};

// 지원자 uid로 지원자 상세정보 요청
const getApplicantDetail = (userUid, workUid, token) => {
  const header = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.get(`/auth/job-search/${userUid}/${workUid}`, header);
};

export { getRecommandedList, getApplicantDetail };
