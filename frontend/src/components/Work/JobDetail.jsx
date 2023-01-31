import { Box, styled, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function WorkDetailJob() {
  const navigate = useNavigate();
  const CustomButton = styled(Button)({
    height: '5vh',
    '&:hover': {
      backgroundColor: '#FF7600',
    },
  });

  const onClick = () => {
    navigate(`/worklist/detail`);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '39px',
          boxShadow: '0px 2px 15px 0px rgba(0,0,0,0.75)',
        }}
      >
        <Box sx={{ padding: '3vh', height: '100%' }}>
          <h2>Title</h2>
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
              onClick={onClick}
            >
              지원하기
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
