import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import RecruitmentWrite from '../../components/work/RecruitmentWrite';
import WorkWrite from '../../components/work/WorkWrite';
import { useParams } from 'react-router-dom';
import { Button, styled, Box } from '@mui/material';
import { createWork, getMyRecruitments, updateWork } from '../../api/work';
import { selectAccessToken } from '../../store/user';
import { useSelector } from 'react-redux';
import { useState } from 'react';

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
  const { guestHouseUid } = useParams();
  const { workUid } = useParams();
  const accessToken = useSelector(selectAccessToken);
  // 게하 아이디로 공고 확인
  const recruitment = getMyRecruitments(guestHouseUid);

  // 있으면 공고 불러와서 RecruitmentWrite로 내용 전달
  if (recruitment) {
    // 수정 (PUT 메서드 호출)
  } else {
    // 없으면 작성 (POST 매서드 호출)
  }

  // 직무 생성하는 API 호출
  // 직무 작성하는 API 호출
  const workCreate = async (workInfo) => {
    const data = await createWork(workInfo, accessToken);
    console.log(data);
  };
  // 직무 수정하는 API 호출도 만들어야해요
  const workUpdate = async (workInfo) => {
    const data = await updateWork(workInfo, accessToken);
    console.log(data);
  };

  if (workUid === 'undefined') {
    const workInfo = OnWorkWrite();
    workCreate(workInfo);
  } else {
    const workInfo = OnWorkWrite();
    workUpdate(workInfo);
  }

  function OnWorkWrite(input) {
    const [workInfo, setWorkInfo] = useState(input);
    setWorkInfo({ ...workInfo, recruitmentUid: recruitment.uid });
    return workInfo;
  }

  const onRecruitmentWrite = (input) => {
    console.log(input);
  };

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <WhiteBox
        cpn={
          <HouseInfo
          // geustHouseId={recruitmentInfo.guestHouseUid}
          // images={images}
          />
        }
      />
      <RecruitmentWrite onRecruitmentWrite={onRecruitmentWrite} />
      <WorkWrite onWorkWrite={OnWorkWrite} />
      <Box sx={{ paddingTop: '2rem' }}>
        <CustomButton>저장</CustomButton>
      </Box>
    </Box>
  );
}
