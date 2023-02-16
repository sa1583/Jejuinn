import { Box, Button, Stack } from '@mui/material';
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
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box>
        <h4 style={{ color: '#FF7600', marginBottom: '2px' }}>
          {myStaff.username}
        </h4>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <h3 style={{ marginTop: '0', marginRight: '10px' }}>
            {myStaff.workName}
          </h3>
          <p style={{ marginTop: '0px' }}>
            {myStaff.startDate} - {myStaff.endDate}
          </p>
        </Box>
      </Box>
      <Button onClick={handleFireStaff}>종료</Button>
    </Stack>
  );
}
