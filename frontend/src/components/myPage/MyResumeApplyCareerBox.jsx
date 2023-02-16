import { useState } from 'react';
import MyResumeApplyCareer from './MyResumeApplyCareer';
import { myCareerList } from '../../api/resume';
import WhiteBox from '../whiteBox/WhiteBox'
import { Box } from '@mui/material';

export default function MyResumeApplyCareerBox() {
  const [careers, setCareers] = useState(myCareerList());
  
  return (
    <Box>
      {careers.map((career) => (
        <Box sx={{ paddingY: '1%'}}>
          <WhiteBox cpn={<MyResumeApplyCareer career={career} />}/>
        </Box>
        ))}
    </Box>
  );
}
