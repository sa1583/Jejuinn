import { apiInstance } from './index';

const api = apiInstance();

const guestHouseDetail = (guestHouseUid) => {
  return api.get(`/api/guest-houses/${guestHouseUid}`);
};

const allGuestHouseList = () => {
  return api.get('/api/guest-houses');
};

export { guestHouseDetail, allGuestHouseList };
