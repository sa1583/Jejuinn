import { apiInstance } from './index';

const api = apiInstance();

const allWorkList = () => {
  return api.get('/api/job-offer', {}, {});
};

const filteredWorkList = ({ filterValues }) => {
  const config = {
    body: {
      filterValues,
    },
  };
  return api.post('/api/job-offer/filter', config, {});
};

const workDetail = ({ recruitmentUid }) => {
  // 요청한 구인상세 내용 가져오는 API
  return api.get('/api/job-offer/{recruitmentUid}', {}, {});
  // [response body]
  // {uid, title, guestHouseName, address, addressDetail, image
  //  , work : [{workName, workType, workTime, effectiveDate }, {workName, ...}] },
};

export { workDetail, allWorkList, filteredWorkList };
