import WorkWriteComponent from '../../components/work/WorkWriteComponent';
import { Box } from '@mui/material';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { useParams } from 'react-router-dom';
import RecruitmentInfo from '../../components/work/RecruitmentInfo';
import WorkUpdateComponent from '../../components/work/WorkUpdateComponent';

export default function WorkWrite() {
  const { recruitmentUid } = useParams();
  const { workUid } = useParams();

  const [images, setImages] = useState([]);
  const [recruitmentInfo, setRecruitmentInfo] = useState({});
  const [guesthouseUid, setGuesthouseUid] = useState('');

  async function getWork() {
    const data = (await recruitmentDetail(recruitmentUid)).data;
    setImages(data.images);
    setRecruitmentInfo(data.recruitment);
    setGuesthouseUid(data.recruitment.guestHouseUid);
  }

  useEffect(() => {
    getWork();
  }, []);

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <WhiteBox
        cpn={<HouseInfo geustHouseId={guesthouseUid} images={images} />}
      />
      <RecruitmentInfo recruitmentUid={recruitmentUid} />
      {workUid != 'undefined' ? (
        <WorkUpdateComponent />
      ) : (
        <WorkWriteComponent />
      )}
    </Box>
  );
}
