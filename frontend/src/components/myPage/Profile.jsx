import { styled, Button, Avatar, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { images } from '../../assets/images';
import WhiteBox from '../whiteBox/WhiteBox';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../store/user';

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
  const userInfo = useSelector(selectUserInfo);

  const navigate = useNavigate();
  const onMypage = () => {
    navigate('/mypage');
  };
  return (
    <WhiteBox
      cpn={
        <Stack direction="column" alignItems="center" sx={{ p: '2%' }}>
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
        </Stack>
      }
    />
  );
}
