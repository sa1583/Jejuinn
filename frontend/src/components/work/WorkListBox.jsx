import { Grid } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import JobDetail from './JobDetail';
import WhiteBox from '../whiteBox/WhiteBox';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function WorkListBox({ works }) {
  // 결과 페이지의 컴포넌트 클릭하면 디테일 페이지로 이동
  return (
    <>
      <br />
      <h2> 검색결과</h2>
      <Grid container spacing={4}>
        {works.map((work) => (
          <Grid item md={4} key={uuidv4()}>
            <WhiteBox cpn={<JobDetail workid={work.recruitmentUid} />} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
