import { Box, Grid, styled, Button } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import Profile from '../../components/myPage/Profile';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CustomButton = styled(Button)({
  border: '1px solid #FF7600',
  variant: 'outlined',
  color: '#FF7600',
  width: '100%',
  borderRadius: '62px',
  fontFamily: 'border',
  height: '5vh',
  '&:hover': {
    border: '1px solid #FF7600',
    backgroundColor: '#FFFFFF',
  },
});

const CustomSelectButton = styled(Button)({
  border: '1px solid #FF7600',
  variant: 'outlined',
  color: 'white',
  backgroundColor: '#FF7600',
  width: '100%',
  borderRadius: '62px',
  fontFamily: 'border',
  height: '5vh',
  '&:hover': {
    border: '1px solid #FF7600',
    backgroundColor: 'orange',
  },
});

export default function MyPage({ content }) {
  const comp = content;
  const [selectedButton, setSelectedButton] = useState('mypage');
  const location = useLocation();

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
    setSelectedButton(location.pathname.split('/').at(-1));
  });

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item md={4}>
          <WhiteBox cpn={<Profile />} />
          {selectedButton === 'mypage' ? (
            <CustomSelectButton
              sx={{
                marginBottom: '8px',
                marginTop: '16px',
              }}
            >
              마이 페이지
            </CustomSelectButton>
          ) : (
            <CustomButton
              sx={{
                marginBottom: '8px',
                marginTop: '16px',
              }}
              onClick={onMypage}
            >
              마이 페이지
            </CustomButton>
          )}
          {selectedButton === 'resume' ? (
            <CustomSelectButton sx={{ mb: '8px' }}>
              지원서 관리
            </CustomSelectButton>
          ) : (
            <CustomButton onClick={onApply} sx={{ mb: '8px' }}>
              지원서 관리
            </CustomButton>
          )}
          {selectedButton === 'guesthouse' ? (
            <CustomSelectButton>게스트하우스 관리</CustomSelectButton>
          ) : (
            <CustomButton onClick={onGuestHouse}>
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
