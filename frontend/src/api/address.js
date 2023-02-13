import axios from 'axios';

const getPosByAddress = async (address) => {
  const searchTxt = address; // 검색한 주소
  const config = {
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
    },
  }; // 헤더 설정
  const url =
    'https://dapi.kakao.com/v2/local/search/address.json?query=' + searchTxt; // REST API url에 data.address값 전송
  return await axios.get(url, config);
};

export { getPosByAddress };
