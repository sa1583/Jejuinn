import { Box, Grid } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import MyGuestHouseCreateForm from '../../components/myGuestHouseCreate/MyGuestHouseCreateForm';

export default function GuestHouseCreate() {
  return (
    <div>
      <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
        <WhiteBox cpn={<MyGuestHouseCreateForm />} />
      </Box>
    </div>
  );
}
