import React from 'react';
import { Button } from '@mui/material';
import DaumPostcode from 'react-daum-postcode';

const PopupPostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const setAddress = props.setAddress;

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
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);
    setAddress(fullAddress);

    props.onClose();
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
