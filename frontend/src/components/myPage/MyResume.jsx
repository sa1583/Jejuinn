import { Box, Grid, styled, Button } from '@mui/material';
import MyResumeInfo from './MyResumeInfo';
import MyResumeApply from './MyResumeApply';
export default function MyResume() {
  return (
    <Box sx={{ paddingY: '3%', paddingX: '3%' }}>
      <MyResumeInfo />
      <hr />
      <MyResumeApply />
    </Box>
  );
}
