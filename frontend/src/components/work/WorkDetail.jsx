import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function JobDetail({ work }) {
  const navigate = useNavigate();
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
