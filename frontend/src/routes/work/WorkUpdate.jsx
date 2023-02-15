import WorkUpdateComponent from '../../components/work/WorkUpdateComponent';
import { Box, styled, Button } from '@mui/material';
import { selectAccessToken } from '../../store/user';
import { useSelector } from 'react-redux';
import { updateWork } from '../../api/work';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { useNavigate, useParams } from 'react-router-dom';
import RecruitmentInfo from '../../components/work/RecruitmentInfo';

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

export default function WorkUpdate() {
  const { recruitmentUid } = useParams();
  const { workUid } = useParams();
  const [workInfo, setWorkInfo] = useState({});

  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [guesthouseUid, setGuesthouseUid] = useState('');
  const [works, setWorks] = useState([]);
  const [updatedWork, setUpdatedWork] = useState([]);

  async function getGuesthouseUid() {
    const data = (await recruitmentDetail(recruitmentUid)).data;
    setImages(data.images);
    setGuesthouseUid(data.recruitment.guestHouseUid);
    setWorks(data.works);
  }

  async function selectWork() {
    works.map((work) => {
      if (work.workUid == workUid) {
        setUpdatedWork(work);
      }
    });
  }

  const onClick = () => {
    console.log(workInfo);
    fetch(updateWork(workInfo, accessToken));
    navigate(`/worklist/detail/${recruitmentUid}/${workUid}`);
  };

  useEffect(() => {
    selectWork();
  }, [works]);

  const onWorkWrite = (input) => {
    console.log(input);
    setWorkInfo(input);
  };

  console.log(workInfo);

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
        <WorkUpdateComponent onWorkWrite={onWorkWrite} prework={updatedWork} />
      </form>
      <br />
      <CustomButton type="submit" onClick={onClick}>
        저장
      </CustomButton>
    </Box>
  );
}
