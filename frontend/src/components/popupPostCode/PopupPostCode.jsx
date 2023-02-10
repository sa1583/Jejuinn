import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import DaumPostcode from 'react-daum-postcode';

const PopupPostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const setAddress = props.setAddress;
  const setDetailAddress = props.setDetailAddress;
  const setAreaName = props.setAreaName;
  const setLng = props.setLng;
  const setLat = props.setLat;

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // console.log(data);
    // console.log(fullAddress);
    // console.log(data.zonecode);
    setAddress(data.address);
    setDetailAddress(`(${extraAddress})`);
    setAreaName(data.bname1 ? data.bname1 : data.sigungu);

    handleComplete(data);

    props.onClose();
  };

  const handleComplete = (data) => {
    const searchTxt = data.address; // 검색한 주소
    const config = {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
      },
    }; // 헤더 설정
    const url =
      'https://dapi.kakao.com/v2/local/search/address.json?query=' + searchTxt; // REST API url에 data.address값 전송
    axios.get(url, config).then(function (result) {
      // API호출
      if (result.data !== undefined || result.data !== null) {
        if (result.data.documents[0].x && result.data.documents[0].y) {
          // Kakao Local API로 검색한 주소 정보 및 위도, 경도값 저장
          // const address_name = result.data.documents[0].address.address_name;
          // const region_2depth_name =
          //   result.data.documents[0].address.region_2depth_name;
          setLng(result.data.documents[0].x);
          setLat(result.data.documents[0].y);
          // console.log(address_name, region_2depth_name);
          // console.log(lng, lat);
        }
      }
    });
  };

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '17%',
    width: '400px',
    height: '400px',
    padding: '7px',
    zIndex: 100,
  };

  return (
    <div>
      <DaumPostcode
        style={{ postCodeStyle, display: 'relative' }}
        onComplete={handlePostCode}
      />
      <Button
        style={{ display: 'absolute' }}
        onClick={() => {
          props.onClose();
        }}
      >
        닫기
      </Button>
    </div>
  );
};

export default PopupPostCode;
