import WorkWriteComponent from '../../components/work/WorkWriteComponent';
import { Grid, Box } from '@mui/material';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { useParams } from 'react-router-dom';
import RecruitmentInfo from '../../components/work/RecruitmentInfo';
import RecruitmentWrite from '../../components/work/RecruitmentWriteComponent';
import WorkDetailComponent from '../../components/work/WorkDetail';
import WorkListBox from '../../components/work/WorkListBox';
import WorkInfo from '../../components/work/WorkInfo';

export default function WorkWrite() {
  const { recruitmentUid } = useParams();
  const { workUid } = useParams();
  const [images, setImages] = useState([]);
  const [works, setWorks] = useState([]);
  const [work, setWork] = useState([]);
  const [otherWorks, setOtherWorks] = useState([]);
  const [onRecruitmentWrite, setOnRecruitmentWrite] = useState(false);
  const [recruitmentInfo, setRecruitmentInfo] = useState({});

  async function getWork() {
    const data = (await recruitmentDetail(recruitmentUid)).data;
    console.log(data);
    setImages(data.images);
    setWorks(data.works);
    setRecruitmentInfo(data.recruitment);
  }

  function OtherWork() {
    works.map((work) => {
      work.uid != workUid
        ? setOtherWorks((prevArray) => [...prevArray, work])
        : setWork(work);
    });
  }

  const onClick = () => {
    const prev = onRecruitmentWrite;
    setOnRecruitmentWrite(!prev);
  };

  useEffect(() => {
    getWork();
  }, []);
  useEffect(() => {
    OtherWork();
  }, [works]);
  console.log(recruitmentInfo);
  // 받아온 데이터 피그마에 있는 모양으로 렌더링하기
  // 공고 갯수 만큼 반복하면서 WorkDetailContent 컴포넌트 재사용

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <WhiteBox
        cpn={
          <HouseInfo
            geustHouseId={recruitmentInfo.guestHouseUid}
            images={images}
          />
        }
      />
      <RecruitmentInfo id={recruitmentUid} onClick={onClick} />
      <div>직무 작성/수정 컴포넌트 가져와~</div>
      {/* 수정/ 작성 분리 해야하나..? 
      <WorkWriteComponent /> */}
    </Box>
  );
}
