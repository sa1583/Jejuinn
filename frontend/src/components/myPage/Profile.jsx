import { Box, styled, Button, Avatar } from '@mui/material';
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
        paddingTop: '1rem',
        paddingBottom: '3rem',
        paddingX: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 onClick={onMypage}>장정민</h1>
      <Avatar
        src={images.sample_profile}
        alt="프로필 사진 들어가용~"
        style={{
          width: '20rem',
          height: '20rem',
          marginBottom: '20px',
          cursor: 'pointer',
        }}
      />
      <CustomButton>개인정보 수정</CustomButton>
    </Box>
  );
}
