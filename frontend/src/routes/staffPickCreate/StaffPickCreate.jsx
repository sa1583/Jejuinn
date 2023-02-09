import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getSpotInfo, getSpotsPin } from '../../api/staffPick';
import MapApi from '../../components/mapApi/MapApi';
import StaffPickCreateForm from '../../components/staffPickCreateComponent/StaffPickCreateForm';
import StaffPickCreateInfo from '../../components/staffPickCreateComponent/StaffPickCreateInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';

export default function StaffPickCreate() {
  const [nowPick, setNowPick] = useState({});

  const [newSpotName, setNewSpotName] = useState('');
  const handleNewSpotName = (e) => {
    setNewSpotName(e.target.value);
  };

  const [nowPickId, setNowPickId] = useState('');

  const handlePinClick = async (marker) => {
    setNowPickId(marker.id);
    // setNowPick(id에 해당하는 명소 정보 axios로 받아서 리스트로 갱)
    // 그다음에 StaffPickCreateInfo 에서 nowPick에 대한 정보 출력 갱
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
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={4}>
          <Grid item xs={12}>
            <WhiteBox cpn={<StaffPickCreateInfo nowPick={nowPick} />} />
          </Grid>
        </Grid>

        <Grid item xs={12} lg={8}>
          <WhiteBox
            cpn={<MapApi handlePinClick={handlePinClick} spots={spots} />}
          />
        </Grid>
        <Grid item xs={12}>
          <WhiteBox cpn={<StaffPickCreateForm nowPickId={nowPickId} />} />
        </Grid>
      </Grid>
    </Box>
  );
}
