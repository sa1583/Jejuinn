import { Box, Button, Stack } from '@mui/material';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { useNavigate, useParams } from 'react-router-dom';
import RecruitmentInfo from '../../components/work/RecruitmentInfo';
import { getMyGuestHouses } from '../../api/guestHouse';
import WorkListBox from '../../components/work/WorkListBox';
import WorkInfo from '../../components/work/WorkInfo';
import { selectUserInfo, selectAccessToken } from '../../store/user';
import { useSelector } from 'react-redux';

export default function WorkDetail() {
  const { recruitmentUid } = useParams();
  const { workUid } = useParams();
  const navigate = useNavigate();

  const userUid = useSelector(selectUserInfo);
  const accessToken = useSelector(selectAccessToken);
  const [myGuestHousesUid, setMyGuestHousesUid] = useState([]);
  const [images, setImages] = useState([]);
  const [works, setWorks] = useState([]);
  const [work, setWork] = useState([]);
  const [otherWorks, setOtherWorks] = useState([]);
  const [recruitmentInfo, setRecruitmentInfo] = useState({});

  async function getRecruitmentDetail() {
    const data = (await recruitmentDetail(recruitmentUid)).data;
    setImages(data.images);
    setWorks(data.works);
    setRecruitmentInfo(data.recruitment);
  }

  // 현재 보고 있는 직무의 게하가 나의 게하 목록에 있는지 확인하기 위해 필요함
  // 만약에 워크에서 게하 아이디 주면 더이상 필요 없는 코드 ()
  async function getGuesthousesUidList() {
    const data = (await getMyGuestHouses(accessToken, userUid.uid)).data;
    data?.map((guesthouse) => {
      setMyGuestHousesUid((prevArray) => [...prevArray, guesthouse.uid]);
    });
  }

  function OtherWork() {
    works?.map((work) => {
      work.workUid != workUid
        ? setOtherWorks((prevArray) => [...prevArray, work])
        : setWork(work);
    });
  }

  const onClick = () => {
    navigate(
      `/recruitment/update/${recruitmentInfo.uid}/${recruitmentInfo.guestHouseUid}`,
    );
  };

  useEffect(() => {
    getRecruitmentDetail();
    getGuesthousesUidList();
  }, []);

  useEffect(() => {
    setOtherWorks([]);
    OtherWork();
  }, [works, workUid]);

  return (
    <Box sx={{ paddingY: '2rem', paddingX: '19%' }}>
      <HouseInfo geustHouseId={recruitmentInfo.guestHouseUid} images={images} />
      <Stack direction="row">
        <Box sx={{ pt: '5%', pr: '5%' }} width="450px">
          <WhiteBox cpn={<RecruitmentInfo recruitmentUid={recruitmentUid} />} />
          {myGuestHousesUid.includes(recruitmentInfo.guestHouseUid) ? (
            <Button onClick={onClick}> 공고수정</Button>
          ) : null}
        </Box>
        <Box sx={{ pt: '5%', pr: '5%' }} width="450px">
          <WhiteBox cpn={<WorkInfo work={work} />} />
        </Box>
      </Stack>
      <h2 style={{ color: '#FF7600' }}>
        {works && works.length > 1
          ? '해당 게스트하우스에서 진행중인 다른 채용'
          : '해당 게스트하우스에서 진행중인 다른 채용이 없습니다.'}
      </h2>
      <WorkListBox works={otherWorks} />
    </Box>
  );
}
