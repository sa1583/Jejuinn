import GuestHouseList from '../../components/guestHouseList/GuestHouseList';
import GuestHouseFilter from '../../components/guestHouseList/GuestHouseFilter';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

export default function GuestHouse() {
  const [filter, setFilter] = useState({
    style: '전체',
    section: '전체',
    inp: '',
  });

  const getFilter = (pickForm) => {
    setFilter(pickForm);
    // 여기엔 이제 api 통신
  };

  return (
    <div>
      <Box sx={{ paddingY: '3rem', paddingX: '19%' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <WhiteBox
              cpn={<GuestHouseFilter getFilter={getFilter} filter={filter} />}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <WhiteBox cpn={<GuestHouseList />} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
