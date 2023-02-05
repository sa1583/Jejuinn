import { Box, Grid, styled, Button } from '@mui/material';
import MyResumeInfo from './MyResumeInfo';
import MyResumeApply from './MyResumeApply';
import MyResumeWrite from './MyResumeWrite';
import { useState } from 'react';
import { getResume } from '../../api/resume';
import { useEffect } from 'react';


export default function MyResume() {
  const [onModify, setOnModify] = useState(false);
  const [resume, setResume] = useState(getResume())
  // resume 요청해서 있으면 가져오고 없으면 null

  const changeApplyComp = () => {
    setOnModify(!onModify);
  };
  console.log(onModify);

  return (
    <Box sx={{ paddingY: '3%', paddingX: '3%' }}>
      <MyResumeInfo />
      <hr />
      {resume ? 
        (onModify ? <MyResumeWrite resume={resume} changeApplyComp={changeApplyComp} />
          : <MyResumeApply resume={resume} changeApplyComp={changeApplyComp} />)
        : <MyResumeWrite resume={resume} changeApplyComp={changeApplyComp} />}
      
    </Box>
  );
}
