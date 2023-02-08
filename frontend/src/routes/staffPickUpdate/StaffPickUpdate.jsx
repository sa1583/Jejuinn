import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getSpotInfo, getSpotsPin } from '../../api/staffPick';
import MapApi from '../../components/mapApi/MapApi';
import WhiteBox from '../../components/whiteBox/WhiteBox';

export default function StaffPickUpdate() {
  const [nowPick, setNowPick] = useState({});
  const [nowPickId, setNowPickId] = useState('');

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
            cpn={
              <MapApi
                handlePinClick={handlePinClick}
                spots={spots}
                // setNewPin={setNewPin}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <WhiteBox cpn={<StaffPickCreateForm nowPickId={nowPickId} />} />
        </Grid>
      </Grid>
    </Box>
  );
}
