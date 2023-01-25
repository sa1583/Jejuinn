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

export { getSpots };
