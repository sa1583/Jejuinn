import { Grid, Box } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import WhiteBox from '../whiteBox/WhiteBox';
import MyResumeApplyCareer from './MyResumeApplyCareer';
import { myCareerList } from '../../api/apply';

export default function MyResumeApplyCareerBox() {
  const [careers, setCareers] = useState(myCareerList());
  // useEffect(() => {
  //   setCareers();
  // }, []);
  return (
    <>
      {careers.map((career) => {
        <MyResumeApplyCareer career={career} />;
        // <Box key={career} sx={{ paddingY: '1%' }}>
        //   {/* <WhiteBox cpn={<MyResumeApplyCareer career={career} />} /> */}
        // </Box>;
      })}
    </>
  );
}
