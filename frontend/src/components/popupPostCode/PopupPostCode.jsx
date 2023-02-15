import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import DaumPostcode from 'react-daum-postcode';
import { getPosByAddress } from '../../api/address';

const PopupPostCode = ({
  setAddress,
  setDetailAddress,
  setAreaName,
  setPos,
  onClose,
}) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용

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
    setAddress(data.address);
    setDetailAddress(extraAddress);
    setAreaName(data.bname1 ? data.bname1 : data.sigungu);

    handleComplete(data);

    onClose();
  };

  const handleComplete = async ({ address }) => {
    const {
      data: { documents },
    } = await getPosByAddress(address);
    setPos({
      id: 1,
      lat: documents[0].y,
      lng: documents[0].x,
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
        variant="contained"
        sx={{
          display: 'absolute',
          width: '100%',
          height: '50px',
          '&:hover': {
            background: '#FF7600',
          },
        }}
        onClick={() => {
          onClose();
        }}
      >
        닫기
      </Button>
    </div>
  );
};

export default PopupPostCode;
