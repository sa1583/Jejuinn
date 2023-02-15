import WorkWriteComponent from '../../components/work/WorkWriteComponent';
import { Box } from '@mui/material';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { useParams } from 'react-router-dom';
import RecruitmentInfo from '../../components/work/RecruitmentInfo';
import WorkUpdateComponent from '../../components/work/WorkUpdateComponent';
import { async } from 'q';

export default function WorkWrite() {
  const { recruitmentUid } = useParams();
  const { workUid } = useParams();

  const [images, setImages] = useState([]);
  const [guesthouseUid, setGuesthouseUid] = useState('');
  const [works, setWorks] = useState([]);
  const [updateWork, setUpdateWork] = useState([]);

  async function getGuesthouseUid() {
    const data = (await recruitmentDetail(recruitmentUid)).data;
    setImages(data.images);
    setGuesthouseUid(data.recruitment.guestHouseUid);
    setWorks(data.works);
  }

  async function selectWork() {
    works.map((work) => {
      if (work.workUid == workUid) {
        setUpdateWork(work);
      }
    });
  }

  useEffect(() => {
    selectWork();
  }, [works]);

  useEffect(() => {
    getGuesthouseUid();
  }, []);

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <WhiteBox
        cpn={<HouseInfo geustHouseId={guesthouseUid} images={images} />}
      />
      <RecruitmentInfo recruitmentUid={recruitmentUid} />
      {workUid != 'undefined' ? (
        <WorkUpdateComponent prework={updateWork} />
      ) : (
        <WorkWriteComponent />
      )}
    </Box>
  );
}
