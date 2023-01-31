import axios from 'axios';

/**
 *
 * @param {number} lng 경도 longitude
 * @param {number} lat 위도 latitude
 * @returns 입력한 위도 경도에 해당되는 좌표의 주소 정보
 */
export default function getAddressBySpot(lng, lat) {
  const KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  return axios({
    url: 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json',
    headers: {
      Authorization: `KakaoAK ${KEY}`,
    },
    params: {
      x: lng,
      y: lat,
    },
  });
}
