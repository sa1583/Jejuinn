import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import StaffPickCreateForm from '../../components/staffPickCreateComponent/StaffPickCreateForm';
import WhiteBox from '../../components/whiteBox/WhiteBox';

export default function StaffPickCreate() {
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid item xs={12}>
            <WhiteBox />
          </Grid>
          <Grid item xs={12}>
            <WhiteBox />
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <WhiteBox cpn={<StaffPickCreateForm />} />
        </Grid>
      </Grid>
    </Box>
  );
}
