import { apiInstance } from './index';

const api = apiInstance();

const allWorkList = () => {
  return api.get('/api/job-offer');
};

const filteredWorkList = (filterValues) => {
  console.log(filterValues);
  const config = {
    body: {
      filterValues,
    },
  };
  return api.post('/api/job-offer/filter', config, {});
  // props 정상적으로 작동하는지 확인해보려고 만든 리턴
  // API 연결 후 위의 리턴 주석 해지
  // return [['work1'], ['work5']];
};

const recruitmentDetail = (recruitmentUid) => {
  return api.get(`/api/job-offer/${recruitmentUid}`, {}, {});
};

export { recruitmentDetail, allWorkList, filteredWorkList };
