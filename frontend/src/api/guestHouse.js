import { apiInstance } from './index';

const api = apiInstance();

const guestHouseDetail = (guestHouseUid) => {
  return api.get(`/api/guest-houses/${guestHouseUid}`);
};

const allGuestHouseList = () => {
  return api.get('/api/guest-houses');
};

const getMyGuestHouses = (token, userUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  // return api.get(`/auth/my-guest-houses/${userUid}`, config);
  return { data: [{ uid: 1 }, { uid: 2 }] };
};

export { guestHouseDetail, allGuestHouseList, getMyGuestHouses };
