import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { images } from '../../assets/images';

export default function BoxLoginSignup(props) {
  return (
    <Grid
      sx={{
        width: '25%',
        background: 'white',
        height: '700px',
        borderRadius: '15px',
        overflow: 'hidden',
        display: 'flex',
        minWidth: '410px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      }}
      container
    >
      <Grid
        item
        // xs={12}
        // lg={6}
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        {props.content}
      </Grid>
      {/* <Box component={Grid} item lg={6} display={{ xs: 'none', lg: 'block' }}>
        <img
          src={images.default_image}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box> */}
    </Grid>
  );
}
