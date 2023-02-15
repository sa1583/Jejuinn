import { Grid } from '@mui/material';
import { Box } from '@mui/system';
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
    <Box sx={{ paddingY: '3rem', paddingX: '19%' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={4}>
          <Grid item xs={12}>
            <WhiteBox cpn={<StaffPickCreateInfo nowPick={nowPick} />} />
          </Grid>
        </Grid>

        <Grid item xs={12} lg={8}>
          <WhiteBox
            cpn={
              <MapApi
                handlePinClick={handlePinClick}
                spots={spots}
                pickedId={nowPickId}
                high={'23rem'}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <WhiteBox cpn={<StaffPickUpdateForm nowPickId={nowPickId} />} />
        </Grid>
      </Grid>
    </Box>
  );
}
