import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import MapApi from '../../components/mapApi/MapApi';
import StaffPickCreateForm from '../../components/staffPickCreateComponent/StaffPickCreateForm';
import StaffPickCreateInfo from '../../components/staffPickCreateComponent/StaffPickCreateInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';

export default function StaffPickCreate() {
  const [nowPick, setNowPick] = useState('');

  const handlePinClick = (id) => {
    console.log(id);
    setNowPick(id);
  };

  const setNewPin = (e) => {
    const lat = e._lat;
    const lng = e._lng;
    setNowPick([lat, lng]);
  };

  const spots = [
    { id: 1, lat: 33.4485, lng: 126.5631 },
    { id: 2, lat: 33.478, lng: 126.4948 },
    { id: 3, lat: 33.4664, lng: 126.6694 },
    { id: 4, lat: 33.2856, lng: 126.4449 },
  ];
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid item xs={12}>
            <WhiteBox cpn={<StaffPickCreateInfo nowPick={nowPick} />} />
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <WhiteBox
            cpn={
              <MapApi
                HandlePinClick={handlePinClick}
                spots={spots}
                setNewPin={setNewPin}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <WhiteBox cpn={<StaffPickCreateForm />} />
        </Grid>
      </Grid>
    </Box>
  );
}
