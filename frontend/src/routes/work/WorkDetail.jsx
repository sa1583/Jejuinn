import { Box, Button } from '@mui/material';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { useParams } from 'react-router-dom';
import RecruitmentInfo from '../../components/work/RecruitmentInfo';
import { getMyGuestHouses } from '../../api/guestHouse';
import WorkListBox from '../../components/work/WorkListBox';
import WorkInfo from '../../components/work/WorkInfo';
import { selectUserInfo, selectAccessToken } from '../../store/user';
import { useSelector } from 'react-redux';

export default function WorkDetail() {
  const { recruitmentUid } = useParams();
  const { workUid } = useParams();

  const userUid = useSelector(selectUserInfo).uid;
  const accessToken = useSelector(selectAccessToken);
  const [myGuestHousesUid, setMyGuestHousesUid] = useState([]);
  const [images, setImages] = useState([]);
  const [works, setWorks] = useState([]);
  const [work, setWork] = useState([]);
  const [otherWorks, setOtherWorks] = useState([]);
  const [onRecruitmentWrite, setOnRecruitmentWrite] = useState(false);
  const [recruitmentInfo, setRecruitmentInfo] = useState({});

  async function getWork() {
    const data = (await recruitmentDetail(recruitmentUid)).data;
    setImages(data.images);
    setWorks(data.works);
    setRecruitmentInfo(data.recruitment);
  }

  async function getGuesthousesUidList() {
    const data = (await getMyGuestHouses(accessToken, userUid)).data;
    data.map((guesthouse) => {
      setMyGuestHousesUid((prevArray) => [...prevArray, guesthouse.uid]);
    });
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
    getGuesthousesUidList();
  }, []);
  useEffect(() => {
    OtherWork();
  }, [works]);

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      {/* <h1 style={{ color: '#FF7600' }}>{recruitment.recruitment.title}</h1> */}
      <WhiteBox
        cpn={
          <HouseInfo
            geustHouseId={recruitmentInfo.guestHouseUid}
            images={images}
          />
        }
      />
      {myGuestHousesUid.includes(recruitmentInfo.guestHouseUid) ? (
        // 공고 안에 있는 워크리스트라 작성자 정보가 없슴...
        <Button onClick={onClick}>수정</Button>
      ) : null}
      <RecruitmentInfo id={recruitmentUid} onClick={onClick} />
      <WorkInfo work={work} />
      <h2 style={{ color: '#FF7600' }}>
        해당 게스트하우스에서 진행중인 다른 채용
      </h2>
      <WorkListBox works={otherWorks} />
    </Box>
  );
}

// 공고
// 직무 작성은 지금 만들어 놓은거에 그냥 공고 아이디 추가해서 요청 보내면 됨
// 없을 때 - 이게 문제
// 공고작성이랑 직무 작성을 컴포넌트 구성을 어떻게 할지...
//
