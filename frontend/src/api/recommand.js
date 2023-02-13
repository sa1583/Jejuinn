import instance from '.';

const getRecommandedList = (workUid) => {
  return instance.get(`api/job-offer/recommend?workUid=${workUid}`);
};

export { getRecommandedList };
