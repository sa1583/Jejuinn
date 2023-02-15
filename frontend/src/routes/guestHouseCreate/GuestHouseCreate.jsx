import { Box } from '@mui/material';
import MyGuestHouseCreateForm from '../../components/myGuestHouseCreate/MyGuestHouseCreateForm';

export default function GuestHouseCreate() {
  return (
    <div>
      <Box sx={{ paddingY: '3rem', paddingX: '28%' }}>
        <MyGuestHouseCreateForm />
      </Box>
    </div>
  );
}
