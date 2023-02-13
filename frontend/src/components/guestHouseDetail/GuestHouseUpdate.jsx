import { Box } from '@mui/material';
import MyGuestHouseCreateForm from '../myGuestHouseCreate/MyGuestHouseCreateForm';
import WhiteBox from '../whiteBox/WhiteBox';

export default function GuestHouseUpdate() {
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <WhiteBox cpn={<MyGuestHouseCreateForm />} />
    </Box>
  );
}
