import { Box, styled, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import WhiteBox from '../whiteBox/WhiteBox';

const CustomButton = styled(Button)({
  height: '5vh',
  '&:hover': {
    backgroundColor: '#FF7600',
  },
});

export default function WorkDetailJob() {
  const navigate = useNavigate();

  const onJobDetail = () => {
    navigate('/worklist/detail');
  };

  return (
    <>
      <Box sx={{ padding: '3vh', height: '100%' }}>
        <h2 onClick={onJobDetail} style={{ color: '#FF7600' }}>
          Title
        </h2>
        <div>모집 상세 </div>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CustomButton
            variant="contained"
            sx={{
              alignItems: 'center',
              borderRadius: '62px',
              backgroundColor: '#FF7600',
              fontFamily: 'border',
            }}
            size="large"
          >
            지원하기
          </CustomButton>
        </Box>
      </Box>
    </>
  );
}
