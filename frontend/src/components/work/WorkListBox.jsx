import { Grid } from '@mui/material';
import WorkDetail from './WorkDetail';
import WhiteBox from '../whiteBox/WhiteBox';
import { v4 as uuidv4 } from 'uuid';

export default function WorkListBox({ works }) {
  return (
    <>
      <Grid container spacing={4}>
        {works?.map((work) => (
          <Grid item md={4} key={uuidv4()}>
            <WhiteBox cpn={<WorkDetail work={work} />} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
