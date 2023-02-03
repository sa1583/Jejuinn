import { Box, styled, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { images } from '../../assets/images';

const CustomButton = styled(Button)({
  color: '#FFFFFF',
  backgroundColor: '#D4D4D4',
  width: '100%',
  borderRadius: '62px',
  fontFamily: 'border',
  height: '5vh',
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
});

export default function Profile() {
  const navigate = useNavigate();
  const onMypage = () => {
    navigate('/mypage');
  };
  return (
    <Box
      sx={{
        paddingY: '3rem',
        paddingX: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h2 onClick={onMypage}>장정민</h2>
      <img
        src={images.sample_profile}
        alt="프로필 사진 들어가용~"
        style={{
          marginBottom: '16px',
          height: '100%',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      />
      <CustomButton>개인정보 수정</CustomButton>
    </Box>
  );
}
