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
  // const userUid = useSelector(selectUserInfo).uid;
  const userUid = 1;
  const token = useSelector(selectAccessToken);

  const [myWorks, setMyworks] = useState([]);
  const [myGuestHouses, setMyGuestHouses] = useState([]);

  const onSelect = (input) => {
    navigate(`/work-recruitment-write/${input}/undefined`);
  };

  const isOnWrite = useSelector(selectIsOnWrite);
  const OnClick = () => {
    const guestHouseUid = myGuestHouses[0].uid;
    navigate(`/work-recruitment-write/${guestHouseUid}/undefined`);
  };

  async function setHouseAndWork() {
    const myGuestHousesFromServer = (await getMyGuestHouses(token, userUid))
      .data;
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
    if (selectedRecruitment.length == 0) {
      navigate('/recruitment-write');
    }
  }

  useEffect(() => {
    setHouseAndWork();
  }, []);

  return (
    <>
      {myGuestHouses.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item md={12}>
            <h2>나의 채용공고</h2>
            {/* 게스트 하우스가 2개 이상이면 선택 후 작성하는 버튼, 하나면 바로 작성하는 버튼 
            클릭하면 해당 게스트하우스 아이디 넘겨주면서 공고, 직무 작성/수정 페이지로 이동*/}
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

/* 
2. 채용공고 유무에 따른 작성방식 결정
    채용공고 O
        - 일하기 목록에서 버튼 눌렀을 때: 직무만 작성
        - 채용 공고 내부에서 버튼 눌렀을 때: 직무만 작성
    채용공고 X: 
        - 일하기 목록에서 버튼 눌렀을 때 : 둘다 작성하는 페이지로 이동 후 작성
    * 둘 다 작성하는 페이지 만들기
    * 게스트하우스 선택하는 컴포넌트 

- 삭제/ 수정 워크 디테일 컴포넌트 안에 본인이 등록한 직무일 때만 버튼 보이게 하기 
- 수정: 폼은 그대로 가져오기  
  */
