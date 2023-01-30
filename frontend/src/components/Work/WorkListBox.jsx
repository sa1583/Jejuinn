import { Box } from '@mui/system';
import { data } from '../../practiceApi/staffPickList';
import { v4 as uuidv4 } from 'uuid';
import {
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkDetailJob from './JobDetail';
import WhiteBox from '../whiteBox/WhiteBox';

export default function WorkListBox() {
  // 결과 페이지의 컴포넌트 클릭하면 디테일 페이지로 이동
  const navigate = useNavigate();

  return (
    <Grid container spacing={4}>
      <Grid item md={4}>
        <WorkDetailJob />
      </Grid>

      <Grid item md={4}>
        <WorkDetailJob />
      </Grid>

      <Grid item md={4}>
        <WorkDetailJob />
      </Grid>
    </Grid>
  );
}
