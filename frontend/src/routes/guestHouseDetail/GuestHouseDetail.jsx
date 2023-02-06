import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import GuestHouseInfo from '../../components/guestHouseDetail/GuestHouseInfo';
import GuestHouseContent from '../../components/guestHouseDetail/GuestHouseContent';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SpeedDialComponent from '../../components/speedDial/SpeedDialComponent';
import MapApi from '../../components/mapApi/MapApi';

export default function GuestHouseDetail() {
  // 여기서 useEffect로 url 끝 번호를 따서
  // 글 번호로 axios 요청보내서 글 디테일 정보 받아와야함
  const location = useLocation();
  const [id, setId] = useState('');
  useEffect(() => {
    setId(location.pathname.split('detail/')[1]);
  }, []);

  const navigate = useNavigate();
  const goModifiy = () => {
    navigate('create');
  };

  const actions = [
    { icon: <ModeEditOutlinedIcon />, name: '글 수정', handle: goModifiy },
  ];

  const spots = [{ id: 1, lat: 33.4485, lng: 126.5631 }];
  
  return (
    <>
      <SpeedDialComponent actions={actions} />
      <Box sx={{ paddingY: '2rem', paddingX: '10%' }}>
        <h1 style={{ color: '#FF7600' }}>| 간장남게스트하우스</h1>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Grid item xs={12}>
              <WhiteBox cpn={<GuestHouseInfo />} />
            </Grid>
            <Grid item xs={12}>
              <WhiteBox cpn={<MapApi spots={spots} startSpot={spots} />} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid item xs={12}>
              <WhiteBox cpn={<GuestHouseContent />} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
