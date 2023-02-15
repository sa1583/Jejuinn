import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSpotInfo, getSpotsPin } from '../../api/staffPick';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import MapApi from '../../components/mapApi/MapApi';
import StaffPickCreateForm from '../../components/staffPickCreateComponent/StaffPickCreateForm';
import StaffPickCreateInfo from '../../components/staffPickCreateComponent/StaffPickCreateInfo';

export default function StaffPickCreate() {
  const [nowPick, setNowPick] = useState({});

  const [nowPickId, setNowPickId] = useState('');

  const handlePinClick = async (marker) => {
    setNowPickId(marker.id);
    const data = (await getSpotInfo(marker.id)).data.travelPlace;
    setNowPick(data);
  };

  const [spots, setSpots] = useState([]);
  const getSpotsPins = async () => {
    const SpotsList = (await getSpotsPin()).data;
    setSpots(SpotsList);
  };
  useEffect(() => {
    getSpotsPins();
  }, []);

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '28%' }}>
      <h1
        style={{
          fontSize: '2.5rem',
          fontFamily: 'GmarketSansBold',
          padding: '5%',
          marginTop: 0,
          marginBottom: '60px',
          textAlign: 'center',
          color: '#FF7600',
        }}
      >
        놀고먹기 등록
      </h1>
      <Box sx={{ paddingX: '5%', paddingBottom: '30px' }}>
        <Typography
          variant="h5"
          style={{
            fontSize: 22,
            color: 'black',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          ① &nbsp;리뷰를 남기고자 하는 장소의 핀을 아래 지도에서 선택해주세요!
        </Typography>
        <MapApi
          handlePinClick={handlePinClick}
          spots={spots}
          pickedId={nowPickId}
          high={'23rem'}
        />
        <br />
        <WhiteBox
          cpn={
            <StaffPickCreateInfo
              nowPick={nowPick}
              getSpotsPins={getSpotsPins}
            />
          }
        />
      </Box>

      <StaffPickCreateForm nowPickId={nowPickId} />
    </Box>
  );
}
