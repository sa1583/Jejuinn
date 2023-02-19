import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getReviewDetail, getSpotInfo, getSpotsPin } from '../../api/staffPick';
import MapApi from '../../components/mapApi/MapApi';
import StaffPickCreateInfo from '../../components/staffPickCreateComponent/StaffPickCreateInfo';
import StaffPickUpdateForm from '../../components/staffPickUpdateComponent/StaffPickUpdateForm';
import WhiteBox from '../../components/whiteBox/WhiteBox';

export default function StaffPickUpdate() {
  const location = useLocation();
  const pageId = location.pathname.split('update/')[1];

  const [nowPick, setNowPick] = useState({});
  const [nowPickId, setNowPickId] = useState('');
  const getReviewContent = async () => {
    const data = (await getReviewDetail(pageId)).data;
    setNowPickId(data.travelPlaceUid);
    const nowPickData = (await getSpotInfo(data.travelPlaceUid)).data
      .travelPlace;
    setNowPick(nowPickData);
    const allSpots = (await getSpotsPin()).data;
    setSpots(allSpots);
  };
  const [spots, setSpots] = useState([]);

  const handlePinClick = async (marker) => {
    setNowPickId(marker.id);
    const data = (await getSpotInfo(marker.id)).data.travelPlace;
    setNowPick(data);
  };

  useEffect(() => {
    getReviewContent();
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
        놀고먹기 수정
      </h1>
      <Box sx={{ paddingX: '5%', paddingBottom: '30px' }}>
        <WhiteBox cpn={<StaffPickCreateInfo nowPick={nowPick} />} />
      </Box>

      <StaffPickUpdateForm nowPickId={nowPickId} />
    </Box>
  );
}
