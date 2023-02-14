import GuestHouseList from '../../components/guestHouseList/GuestHouseList';
import GuestHouseFilter from '../../components/guestHouseList/GuestHouseFilter';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { Grid, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { allGuestHouseList } from '../../api/guestHouse';
import SpeedDialComponent from '../../components/speedDial/SpeedDialComponent';
import ModeEditOutlined from '@mui/icons-material/ModeEditOutlined';
import { useNavigate } from 'react-router-dom';

export default function GuestHouse() {
  const navigate = useNavigate();

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

  const goCreate = () => {};

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
        <SpeedDialComponent actions={actions} />
        <WhiteBox
          cpn={<GuestHouseFilter getFilter={getFilter} filter={filter} />}
        />
        {/* <Divider sx={{ paddingY: '15px' }} /> */}
        {/* <WhiteBox cpn={<GuestHouseList guestHouses={guestHouses} />} /> */}
        <GuestHouseList guestHouses={guestHouses} />
      </Box>
    </div>
  );
}
