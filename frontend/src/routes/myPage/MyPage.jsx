import { Box, Grid, styled, Button } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import Profile from '../../components/myPage/Profile';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../store/user';

const CustomButton = styled(Button)({
  color: 'grey',
  fontSize: '22px',
  width: '100%',
  height: '18vw',
  height: '6vh',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const CustomSelectButton = styled(Button)({
  color: 'black',
  fontSize: '22px',
  fontWeight: 'bold',
  width: '100%',
  height: '6vh',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

export default function MyPage({ content }) {
  const comp = content;
  const [selectedButton, setSelectedButton] = useState('mypage');
  const location = useLocation();
  const isLogin = useSelector(selectIsLogin);

  const navigate = useNavigate();
  const onMypage = () => {
    navigate('/mypage');
  };
  const onApply = () => {
    navigate('/mypage/resume');
  };
  const onGuestHouse = () => {
    navigate('/mypage/guesthouse');
  };

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    setSelectedButton(location.pathname.split('/').at(-1));
  });

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '19%' }}>
      <Grid container spacing={4} sx={{ paddingLeft: '0%' }}>
        <Grid item md={4}>
          <Profile />
          {selectedButton === 'mypage' ? (
            <CustomSelectButton
              disableTouchRipple
              sx={{
                marginTop: '16px',
              }}
              startIcon={<PersonIcon sx={{ color: '#FF7600' }} />}
            >
              마이페이지
            </CustomSelectButton>
          ) : (
            <CustomButton
              disableTouchRipple
              sx={{
                marginTop: '16px',
              }}
              startIcon={<PersonIcon sx={{ color: '#FF7600' }} />}
              onClick={onMypage}
            >
              마이페이지
            </CustomButton>
          )}
          {selectedButton === 'resume' ? (
            <CustomSelectButton
              disableTouchRipple
              startIcon={<DescriptionIcon sx={{ color: '#FF7600' }} />}
            >
              지원서 관리
            </CustomSelectButton>
          ) : (
            <CustomButton
              disableTouchRipple
              startIcon={<DescriptionIcon sx={{ color: '#FF7600' }} />}
              onClick={onApply}
            >
              지원서 관리
            </CustomButton>
          )}
          {selectedButton !== 'resume' && selectedButton !== 'mypage' ? (
            <CustomSelectButton
              disableTouchRipple
              startIcon={<HolidayVillageIcon sx={{ color: '#FF7600' }} />}
            >
              게스트하우스 관리
            </CustomSelectButton>
          ) : (
            <CustomButton
              disableTouchRipple
              startIcon={<HolidayVillageIcon sx={{ color: '#FF7600' }} />}
              onClick={onGuestHouse}
            >
              게스트하우스 관리
            </CustomButton>
          )}
        </Grid>
        <Grid item md={8}>
          <WhiteBox cpn={comp} />
        </Grid>
      </Grid>
    </Box>
  );
}
