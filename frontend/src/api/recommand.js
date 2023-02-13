import { apiInstance } from '.';

const api = apiInstance();

const getRecommandedList = (workUid) => {
  return api.get(`api/job-offer/recommend?workUid=${workUid}`);
};

export { getRecommandedList };
