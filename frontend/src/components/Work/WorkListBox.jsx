import { Grid } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import JobDetail from './JobDetail';

export default function WorkListBox() {
  // 결과 페이지의 컴포넌트 클릭하면 디테일 페이지로 이동
  const navigate = useNavigate();

  return (
    <Grid container spacing={4}>
      <Grid item md={4}>
        <JobDetail />
      </Grid>

      <Grid item md={4}>
        <JobDetail />
      </Grid>

      <Grid item md={4}>
        <JobDetail />
      </Grid>
    </Grid>
  );
}
