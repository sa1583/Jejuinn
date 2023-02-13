import { Box, Grid, styled, Button } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import Profile from '../../components/myPage/Profile';
import { useNavigate } from 'react-router-dom';
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

export default function MyPage({ content }) {
  const comp = content;
  const [selectedButton, setSelectedButton] = useState('main');

  const navigate = useNavigate();
  const onApply = () => {
    navigate('/mypage/resume');
    setSelectedButton('apply');
  };
  const onGuestHouse = () => {
    navigate('/mypage/guesthouse');
    setSelectedButton('guestHouse');
  };

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item md={4}>
          <WhiteBox cpn={<Profile />} />
          <CustomButton
            sx={{
              marginBottom: '8px',
              marginTop: '16px',
            }}
            onClick={() => navigate('/mypage')}
          >
            마이 페이지
          </CustomButton>
          <CustomButton onClick={onApply} sx={{ mb: '8px' }}>
            지원서 관리
          </CustomButton>

          <CustomButton onClick={onGuestHouse}>게스트하우스 관리</CustomButton>
        </Grid>
        <Grid item md={8}>
          <WhiteBox cpn={comp} />
        </Grid>
      </Grid>
    </Box>
  );
}
