import GuestHouseList from '../../components/guestHouseList/GuestHouseList';
import GuestHouseFilter from '../../components/guestHouseList/GuestHouseFilter';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { allGuestHouseList } from '../../api/guestHouse';

export default function GuestHouse() {
  const [guestHouses, setGuestHouses] = useState([]);

  async function getGuestHouseList() {
    const data = await allGuestHouseList(1);
    console.log(data.data.content);
    setGuestHouses(data.data.content);
  }

  const [filter, setFilter] = useState({
    style: '전체',
    section: '전체',
    word: '',
  });

  const getFilter = (pickForm) => {
    setFilter(pickForm);
    // 여기엔 이제 api 통신
  };

  useEffect(() => {
    getGuestHouseList();
  }, []);

  return (
    <div>
      <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <WhiteBox
              cpn={<GuestHouseFilter getFilter={getFilter} filter={filter} />}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <WhiteBox cpn={<GuestHouseList guestHouses={guestHouses} />} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
