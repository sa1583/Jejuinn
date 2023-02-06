import { Box, styled, Button } from '@mui/material';
import { recruitmentDetail } from '../../api/work';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const CustomButton = styled(Button)({
  height: '5vh',
  '&:hover': {
    backgroundColor: '#FF7600',
  },
});

export default function JobDetail({ work }) {
  const navigate = useNavigate();
  // const [work, setWork] = useState({});

  // async function getWork() {
  //   const work = await recruitmentDetail(recruitmentUid);
  //   console.log(work.data);
  // }
  // useEffect(() => {
  //   getWork();
  // }, []);
  const onRecruitmentDetail = () => {
    navigate(`/worklist/detail/${work.recruitmentUid}`);
  };
  return (
    <>
      <Box
        sx={{ padding: '3vh', height: '100%' }}
        onClick={onRecruitmentDetail}
      >
        <h2 style={{ color: '#FF7600' }}>{work.workName}</h2>
        <div>
          daysOff: {work.daysOff}, gender: {work.gender}, intake:{work.intake},
          minWorkPeriod: {work.minWorkPeriod},recruitmentUid:{' '}
          {work.recruitmentUid}, salary: {work.salary}, workDays:{' '}
          {work.workDays}, workName:{work.workName}, workTime: {work.workTime}
        </div>
      </Box>
    </>
  );
}
