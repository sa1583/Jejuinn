import { Grid } from '@mui/material';

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
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        {props.content}
      </Grid>
    </Grid>
  );
}
