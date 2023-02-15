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
  height: '5vh',
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
});

export default function Profile() {
  const userInfo = useSelector(selectUserInfo);

  const navigate = useNavigate();
  return (
    <Stack direction="column" alignItems="center">
      <Avatar
        src={
          userInfo.profileImgUrl
            ? userInfo.profileImgUrl
            : images.sample_profile
        }
        alt="프로필 사진 들어가용~"
        style={{
          width: '18vw',
          height: '18vw',
          marginBottom: '35px',
          // cursor: 'pointer',
          boxShadow:
            'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;',
        }}
      />
      <h1 style={{ marginTop: 0 }}>{userInfo.username}</h1>
    </Stack>
  );
}
