import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, selectAccessToken } from '../../store/user';
import { getMyGuestHouses } from '../../api/guestHouse';
import { getMyWorks, getMyRecruitments } from '../../api/work';
import { useState } from 'react';
import { SelectGusetHousePopover } from '../work/WorkWriteForms';
import { changeIsOnWrite, selectIsOnWrite } from '../../store/work';
import { Grid, Button } from '@mui/material';
import WorkWrite from './WorkWrite';
import WhiteBox from '../whiteBox/WhiteBox';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MyWorkDetail from './MyWorkDetail';
import { useNavigate } from 'react-router-dom';

export default function MyWorkList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userUid = useSelector(selectUserInfo).uid;
  const token = useSelector(selectAccessToken);

  const [myWorks, setMyworks] = useState([]);
  const [myGuestHouses, setMyGuestHouses] = useState([]);
  const [selectedGH, setSelectedGH] = useState('');

  const onSelect = (input) => {
    setSelectedGH(input);
    getRecruitment(input);
  };

  const isOnWrite = useSelector(selectIsOnWrite);
  const OnClick = () => {
    dispatch(changeIsOnWrite());
  };

  async function setHouseAndWork() {
    // 내 게하리스트 받아와
    const myGuestHousesFromServer = (await getMyGuestHouses(token, userUid))
      .data;
    console.log(myGuestHousesFromServer);
    // 게하 정보가 있으면 게하 목록 저장하고, 직무 목록 받아
    if (myGuestHousesFromServer.length > 0) {
      setMyGuestHouses((prevArray) => [
        ...prevArray,
        ...myGuestHousesFromServer,
      ]);
      myGuestHousesFromServer.map((myGuestHouse) => {
        getWorks(myGuestHouse.uid);
      });
    }
  }

  async function getWorks(ghuid) {
    const myworks = (await getMyWorks(token, ghuid)).data;
    setMyworks((prevArray) => [...prevArray, ...myworks]);
  }

  async function getRecruitment(ghuid) {
    const selectedRecruitment = (await getMyRecruitments(ghuid)).data;
    console.log(typeof selectedRecruitment);
    console.log(selectedRecruitment);
    if (selectedRecruitment === []) {
      console.log('왜않돼?');
      navigate('/recruitment-write');
    }
  }

  console.log(myWorks);
  useEffect(() => {
    setHouseAndWork();
  }, []);

  return (
    <>
      {myGuestHouses.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item md={12}>
            <span>나의 채용목록</span>
            {myGuestHouses.length > 1 ? (
              <SelectGusetHousePopover
                myGuestHouses={myGuestHouses}
                onSelect={onSelect}
              />
            ) : (
              <Button onClick={OnClick}>+</Button>
            )}
          </Grid>
          {
            // 직무 추가 (채용 공고가 존재하는지 확인해야 해요 -> 공고가 없으면 공고 작성 페이지로 이동)
            // selectedGH로 공고 아이디 찾아서 프롭스로 넘겨줘야함
            isOnWrite ? (
              <Grid item md={12}>
                <WhiteBox cpn={<WorkWrite OnClick={OnClick} />} />
              </Grid>
            ) : null
          }
          {
            // 나의 진행중인 채용 직무 목록
            myWorks.map((myWork) => (
              <Grid item md={4} key={uuidv4()}>
                <WhiteBox cpn={<MyWorkDetail work={myWork} />} />
              </Grid>
            ))
          }
        </Grid>
      ) : null}
    </>
  );
}
