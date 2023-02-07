import { Grid, Box } from '@mui/material';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useState } from 'react';
import { useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { useParams } from 'react-router-dom';
import WorkListBox from '../../components/work/WorkListBox';

export default function WorkDetail() {
  const { recruitmentUid } = useParams();
  const [recruitment, setRecruitment] = useState({});
  const [images, setImages] = useState([]);
  const [works, setWorks] = useState([]);
  const [geustHouseId, setGuestHouseId] = useState();

  async function getWork() {
    const data = await recruitmentDetail(recruitmentUid);
    setRecruitment(data.data.recruitment);
    setImages(data.data.images);
    setWorks(data.data.works);
    setGuestHouseId(data.data.recruitment.guestHouseUid);
    // console.log(data.data);
  }

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
      <h2 style={{ color: '#FF7600' }}>
        {recruitment.title}(recruitment.title)
      </h2>
      <div>{recruitment.welfare} (recruitment.welfare)</div>
      <div>{recruitment.addInfo} (recruitment.addInfo)</div>
      <div>{recruitment.wanted} (recruitment.wanted)</div>
      <div>
        워크 아이디 부여되면 해당 워크 관련 정보 보여주고 아래 진행중인 채용
        목록에서는 제외
      </div>
      <Grid container>
        <Grid item xs={12} md={12} my={4}></Grid>
        <Grid item xs={12} md={12}></Grid>
        <Grid item xs={12} md={12} my={4}></Grid>

        <Grid item md={12}>
          <h2 style={{ color: '#FF7600' }}>
            해당 게스트하우스에서 진행중인 채용
          </h2>
        </Grid>

        <WorkListBox works={works} />

        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </Box>
  );
}
