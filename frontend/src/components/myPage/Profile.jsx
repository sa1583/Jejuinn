import { Avatar, Stack } from '@mui/material';
import { images } from '../../assets/images';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../store/user';

export default function Profile() {
  const userInfo = useSelector(selectUserInfo);

  const profileImage = () => {
    const purl = userInfo.profileImageUrl;
    if (purl.slice(0, 4) === 'http') {
      return purl;
    } else {
      return `${images.defalut_url}${purl}`;
    }
  };

  return (
    <Stack direction="column" alignItems="center">
      <Avatar
        src={userInfo.profileImageUrl ? profileImage() : images.sample_profile}
        alt="프로필 사진 들어가용~"
        style={{
          width: '18vw',
          height: '18vw',
          marginBottom: '35px',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px',
        }}
      />
      <h1 style={{ marginTop: 0 }}>{userInfo.username}</h1>
    </Stack>
  );
}
