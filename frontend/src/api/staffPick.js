import { apiInstance } from './index';

const api = apiInstance();

// const getTokenHeader = (token) => {
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };
function getSpots() {
  return api.get('/api/spot');
}

function getReviews(uid) {
  return api.get(`/api/spot/${uid}`);
}

export { getSpots, getReviews };
