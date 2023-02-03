import { Box, Grid, styled, Button } from '@mui/material';
import MyResumeInfo from './MyResumeInfo';
import MyResumeApply from './MyResumeApply';
import MyResumeWrite from './MyResumeWrite';
import { useState } from 'react';
export default function MyResume() {
  const [onModify, setOnModify] = useState(false);
  const changeApplyComp = () => {
    setOnModify(!onModify);
  };
  console.log(onModify);

  return (
    <Box sx={{ paddingY: '3%', paddingX: '3%' }}>
      <MyResumeInfo />
      <hr />
      {onModify ? (
        <MyResumeWrite changeApplyComp={changeApplyComp} />
      ) : (
        <MyResumeApply changeApplyComp={changeApplyComp} />
      )}
    </Box>
  );
}
