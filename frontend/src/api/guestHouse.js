import { apiInstance } from './index';

const api = apiInstance();

const guestHouseDetail = (guestHouseUid) => {
  return api.get(`/api/guest-houses/${guestHouseUid}`);
};

const allGuestHouseList = () => {
  return api.get('/api/guest-houses');
};

const getApplicantByUid = async (uid, token) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return await api.get(`/auth/job-search/${uid}`, config);
};

export { guestHouseDetail, allGuestHouseList, getApplicantByUid };
