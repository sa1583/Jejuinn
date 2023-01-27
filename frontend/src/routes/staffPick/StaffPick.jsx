import { useState } from 'react';
import MapApi from '../../components/mapApi/MapApi';
import StaffPickFilter from '../../components/staffPickComponent/StaffPickFilter';
import StaffPickSpotList from '../../components/staffPickComponent/StaffPickSpotList';
import StaffPickRank from '../../components/staffPickComponent/StaffPickRank';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';

export default function StaffPick() {
  const [filter, setFilter] = useState({
    type: '전체',
    section: '전체',
    inp: '',
  });

  const getFilter = (pickForm) => {
    setFilter(pickForm);
    // 여기엔 이제 api 통신
  };
  const [selectedSpot, setSelectedSpot] = useState({});

  const getReviews = (id) => {};

  // 반응형 안할꺼면 다 xs값에 md값 넣어주면 됨
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <WhiteBox
            cpn={<StaffPickFilter getFilter={getFilter} filter={filter} />}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <WhiteBox cpn={<MapApi />} />
        </Grid>

        <Box component={Grid} item md={4} display={{ xs: 'none', md: 'block' }}>
          <WhiteBox cpn={<StaffPickRank />} />
        </Box>
        <Grid item xs={12} md={8}>
          {selectedSpot !== {} && (
            <Grid item xs={12} md={12}>
              <WhiteBox />
            </Grid>
          )}
          <Grid item xs={12} md={12}>
            <WhiteBox cpn={<StaffPickSpotList />} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
