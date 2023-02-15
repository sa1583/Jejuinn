import GuestHouseList from '../../components/guestHouseList/GuestHouseList';
import GuestHouseFilter from '../../components/guestHouseList/GuestHouseFilter';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { getGuestHouses } from '../../api/guestHouse';
import SpeedDialComponent from '../../components/speedDial/SpeedDialComponent';
import ModeEditOutlined from '@mui/icons-material/ModeEditOutlined';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../store/user';

export default function GuestHouse() {
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLogin);

  const [guestHouses, setGuestHouses] = useState([]);

  async function getGuestHouseList() {
    const { data } = await getGuestHouses(filter);
    if (filter.pageNumber === 1) setGuestHouses(data.content);
    else setGuestHouses((prev) => prev.concat(data.content));
  }

  const [filter, setFilter] = useState({
    areaName: '전체',
    pageNumber: 1,
    styles: [],
    word: '',
  });

  const handleLoadPages = () => {
    setFilter((prev) => {
      const newFilter = prev;
      newFilter.pageNumber += 1;
      return newFilter;
    });
  };

  const SearchByFilter = (areaName, pageNumber, styles, word) => {
    setFilter({
      areaName,
      pageNumber,
      styles,
      word,
    });
  };

  useEffect(() => {
    getGuestHouseList();
  }, [filter]);

  const actions = [
    {
      icon: <ModeEditOutlined />,
      name: '글 작성',
      handle: () => navigate(`/guesthouse/create`),
    },
  ];

  return (
    <div>
      <Box sx={{ paddingY: '3rem', paddingX: '19%' }}>
        {isLogin && <SpeedDialComponent actions={actions} />}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <WhiteBox
              cpn={<GuestHouseFilter handleFilter={SearchByFilter} />}
            />
          </Grid>
          <Grid item xs={12}>
            <GuestHouseList
              guestHouses={guestHouses}
              plusPageNum={handleLoadPages}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
