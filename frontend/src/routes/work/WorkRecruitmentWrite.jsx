import RecruitmentWrite from '../../components/work/RecruitmentWrite';
import WorkWrite from '../../components/work/WorkWrite';
import { useParams } from 'react-router-dom';
import { Button, styled, Box } from '@mui/material';
import {
  createWork,
  getMyRecruitments,
  updateWork,
  createRecruitment,
  updateRecruitment,
} from '../../api/work';
import { selectAccessToken } from '../../store/user';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const CustomButton = styled(Button)({
  variant: 'contained',
  width: '100%',
  height: '7vh',
  color: '#FFFFFF',
  borderRadius: '62px',
  backgroundColor: '#FF7600',
  fontFamily: 'border',
  size: 'large',
  '&:hover': {
    backgroundColor: '#FF7600',
    borderColor: '#FF7600',
  },
  '&:active': {
    backgroundColor: '#FF7600',
    borderColor: '#FF7600',
  },
});

export default function WorkRecruitmentWrite() {
  const { recruitmentUid } = useParams();
  const { workUid } = useParams();
  const accessToken = useSelector(selectAccessToken);
  const [workInfo, setWorkInfo] = useState(
    getMyRecruitments(recruitmentUid).work,
  );
  const [recruitmentInfo, setRecruimentInfo] = useState(
    getMyRecruitments(recruitmentUid),
  );

  const onWorkWrite = (input) => {
    console.log(input);
    setWorkInfo(input);
  };

  const onRecruitmentWrite = (input) => {
    console.log(input);
    setRecruimentInfo(input);
  };

  const onClick = () => {
    if (workUid === 'undefined') {
      fetch(createWork(workInfo, accessToken));
    } else {
      // 기존 폼에 가져온 데이터 업로드
      fetch(updateWork(workInfo, accessToken));
    }

    if (recruitmentUid === 'undefined') {
      console.log('공고 없어~');
      fetch(createRecruitment(recruitmentInfo, accessToken));
    } else {
      // 기존 폼에 가져온 데이터 업로드
      console.log(recruitmentUid);

      fetch(updateRecruitment(recruitmentInfo, accessToken));
    }
  };

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <div>!!!!!!!!!!이미지!!!!!!!!!!</div>
      <RecruitmentWrite
        onRecruitmentWrite={onRecruitmentWrite}
        currentRecruitmentInfo={recruitmentInfo}
      />
      <WorkWrite onWorkWrite={onWorkWrite} currentWorkInfo={workInfo} />
      <Box sx={{ paddingTop: '2rem' }}>
        <CustomButton onClick={onClick}>저장</CustomButton>
      </Box>
    </Box>
  );
}
