import WorkWriteComponent from '../../components/work/WorkWriteComponent';
import { Box, styled, Button } from '@mui/material';
import { selectAccessToken } from '../../store/user';
import { useSelector } from 'react-redux';
import { createWork } from '../../api/work';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import RecruitmentInfo from '../../components/work/RecruitmentInfo';
import PropTypes from 'prop-types';
import WorkCreateForm from '../../components/work/WorkCreateForm';

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

  // 서버로 전송할 데이터 기본 값 설정
  const [workInfo, setWorkInfo] = useState({
    workName: '',
    gender: '',
    salary: '',
    workTime: '',
    workDescription: '',
    intake: '',
    workDays: 2,
    daysOff: 2,
    minWorkPeriod: '',
    entryDate: '', // 오늘 날짜로 지정하고 싶어!
    recruitmentUid,
  });
  // workInfo.recruitmentUid = parseInt(recruitmentUid);

  // 변경되어 들어오는 값들 받는 함수? 변수? 뭐 그런거! 이걸로 받아서 보낼 정보 설정하는 함수 호출
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
    recruitmentUid,
  ) => {
    setWorkInfo({
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
      recruitmentUid,
    });
  };

  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [guesthouseUid, setGuesthouseUid] = useState('');
  // const [works, setWorks] = useState([]);
  // const [updateWork, setUpdateWork] = useState([]);

  async function getGuesthouseUid() {
    const data = (await recruitmentDetail(recruitmentUid)).data;
    setImages(data.images);
    setGuesthouseUid(data.recruitment.guestHouseUid);
    // setWorks(data.works);
  }

  const onClick = (e) => {
    console.log(e);
    // e에서 값 뽑아서 fetch
    // fetch(createWork(workInfo, accessToken));
    navigate(`/worklist/`);
  };

  // console.log(workInfo);
  // function WorkCreate() {
  //   console.log(workInfo);
  // }

  // useEffect(() => {
  //   getGuesthouseUid();
  // }, []);

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <WhiteBox
        cpn={<HouseInfo geustHouseId={guesthouseUid} images={images} />}
      />
      <RecruitmentInfo recruitmentUid={recruitmentUid} />
      <form>
        {/* <WorkWriteComponent handleInput={WorkInfoInput} /> */}
        <WorkCreateForm handleInput={WorkInfoInput} />
      </form>
      <br />
      <CustomButton
        //         // disabled={
        //         //   !name ||
        //         //   !email ||
        //         //   !phoneNumber ||
        //         //   !address ||
        //         // }
        //         onClick={(e) => submit(e)}
        //         sx={{
        //           marginTop: '8rem',
        //           height: '3.5rem',
        //           width: '40%',
        //           fontSize: '1.8vh',
        //           fontColor: 'white',
        //           borderRadius: '50px',
        //           '&:hover': {
        //             background: '#FF7600',
        //           },
        type="submit"
        onClick={onClick}
      >
        저장
      </CustomButton>
    </Box>
  );
}
