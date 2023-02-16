import { Box, Button, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { fireStaff } from '../../../api/guestHouse';
import { images } from '../../../assets/images';
import { selectAccessToken } from '../../../store/user';

export default function MyStaff({ myStaff, guestHouseUid, loadMyStaff }) {
  const accessToken = useSelector(selectAccessToken);

  const handleFireStaff = async () => {
    await fireStaff(guestHouseUid, myStaff.uid, accessToken);
    loadMyStaff();
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-evenly"
      spacing={2}
    >
      <Typography variant="h5">{myStaff.username}</Typography>
      <Typography variant="h6">{myStaff.workName}</Typography>
      <Typography variant="h6">{myStaff.startDate} ~</Typography>
      <Button onClick={handleFireStaff}>종료</Button>
    </Stack>
  );
}
