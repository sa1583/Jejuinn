import { Grid } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import JobDetail from './JobDetail';
import WhiteBox from '../../components/whiteBox/WhiteBox';

export default function WorkListBox() {
  // 결과 페이지의 컴포넌트 클릭하면 디테일 페이지로 이동

  return (
    <>
      <br />
      <h2> 검색결과</h2>
      <Grid container spacing={4}>
        {/* 반복
        works.map

        <Grid item md={4}>
          <WhiteBox cpn={<JobDetail />} />
        </Grid>
        */}
        <Grid item md={4}>
          <WhiteBox cpn={<JobDetail />} />
        </Grid>
        <Grid item md={4}>
          <WhiteBox cpn={<JobDetail />} />
        </Grid>
      </Grid>
    </>
  );
}
