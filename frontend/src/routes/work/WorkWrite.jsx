import { Box, styled, Button } from '@mui/material';
import { selectAccessToken } from '../../store/user';
import { useSelector } from 'react-redux';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useState, useEffect } from 'react';
import { recruitmentDetail, createWork, updateWork } from '../../api/work';
import { useNavigate, useParams } from 'react-router-dom';
import RecruitmentInfo from '../../components/work/RecruitmentInfo';
import WorkCreateForm from '../../components/work/WorkCreateForm';
import { useLocation } from 'react-router';

const CustomButton = styled(Button)({
  variant: 'contained',
  width: '100%',
  height: '7vh',
  color: '#FFFFFF',
  borderRadius: '62px',
  backgroundColor: '#FF7600',
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

export default function WorkWrite() {
  const { recruitmentUid } = useParams();
  const { workUid } = useParams();
  const [guesthouseUid, setGuesthouseUid] = useState();

  const [workInfo, setWorkInfo] = useState({
    workName: '',
    gender: '무관',
    salary: '',
    workTime: '',
    workDescription: '',
    intake: '',
    workDays: 2,
    daysOff: 2,
    minWorkPeriod: '',
    entryDate: '',
    recruitmentUid: parseInt(recruitmentUid),
  });

  const WorkInfoInput = (
    workName,
    gender,
    salary,
    workTime,
    workDescription,
    intake,
    workDays,
    daysOff,
    minWorkPeriod,
    entryDate,
  ) => {
    setWorkInfo({
      ...workInfo,
      workName,
      gender,
      salary,
      workTime,
      workDescription,
      intake,
      workDays,
      daysOff,
      minWorkPeriod,
      entryDate,
    });
  };

  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  async function getGuesthouseUid() {
    const data = (await recruitmentDetail(recruitmentUid)).data;
    setImages(data.images);
    setGuesthouseUid(data.recruitment.geustHouseUid);
  }

  const location = useLocation();

  const onClick = () => {
    if (location.pathname.split('/')[2] === 'create') {
      fetch(createWork(workInfo, accessToken));
    } else {
      fetch(updateWork(workInfo, accessToken));
    }
    navigate(`/worklist/`);
  };

  useEffect(() => {
    getGuesthouseUid();
  }, []);

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <WhiteBox
        cpn={<HouseInfo geustHouseId={guesthouseUid} images={images} />}
      />
      <RecruitmentInfo recruitmentUid={recruitmentUid} />
      <form>
        <WorkCreateForm handleInput={WorkInfoInput} />
      </form>
      <br />
      <CustomButton
        type="submit"
        disabled={
          !workInfo.workName ||
          !workInfo.entryDate ||
          !workInfo.salary ||
          !workInfo.workDescription
        }
        onClick={onClick}
      >
        저장
      </CustomButton>
    </Box>
  );
}
