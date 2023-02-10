import { Grid, Box } from '@mui/material';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { useParams } from 'react-router-dom';
import WorkListBox from '../../components/work/WorkListBox';
import RecruitmentInfo from '../../components/work/RecruitmentInfo';
import RecruitmentWrite from '../../components/work/RecruitmentWrite';

export default function WorkDetail() {
  const { recruitmentUid } = useParams();
  const [images, setImages] = useState([]);
  const [works, setWorks] = useState([]);
  const [geustHouseId, setGuestHouseId] = useState();
  const [onRecruitmentWrite, setOnRecruitmentWrite] = useState(false);

  async function getWork() {
    const data = await recruitmentDetail(recruitmentUid);
    console.log(data.data);
    setImages(data.data.images);
    setWorks(data.data.works);
    setGuestHouseId(data.data.recruitment.guestHouseUid);
  }

  const onClick = () => {
    const prev = onRecruitmentWrite;
    setOnRecruitmentWrite(!prev);
  };

  useEffect(() => {
    getWork();
  }, []);
  // 받아온 데이터 피그마에 있는 모양으로 렌더링하기
  // 공고 갯수 만큼 반복하면서 WorkDetailContent 컴포넌트 재사용

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      {/* <h1 style={{ color: '#FF7600' }}>{recruitment.recruitment.title}</h1> */}
      <WhiteBox
        cpn={<HouseInfo geustHouseId={geustHouseId} images={images} />}
      />
      {onRecruitmentWrite ? (
        <RecruitmentWrite onClick={onClick} />
      ) : (
        <RecruitmentInfo recruitmentUid={recruitmentUid} onClick={onClick} />
      )}
      <h2 style={{ color: '#FF7600' }}>해당 게스트하우스에서 진행중인 채용</h2>

      <WorkListBox works={works} />
    </Box>
  );
}
