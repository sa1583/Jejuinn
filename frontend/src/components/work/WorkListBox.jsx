import { Grid, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import WorkDetail from './WorkDetail';
import WhiteBox from '../whiteBox/WhiteBox';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import WorkWrite from './WorkWrite';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLogin } from '../../store/user';
import { getMyGuestHouses } from '../../api/work';
import { SelectGusetHousePopover } from '../work/WorkWriteForms';
import { changeIsOnWrite, selectIsOnWrite } from '../../store/work';

export default function WorkListBox({ works }) {
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const isOnWrite = useSelector(selectIsOnWrite);

  const myGuestHouses = getMyGuestHouses();
  const houseCount = myGuestHouses.length;
  console.log(isOnWrite);

  const OnClick = () => {
    dispatch(changeIsOnWrite());
  };

  // 게하 아이디로 모집공고 불러오기
  // 모집 공고가 있는지 없는지 확인
  // (채용공고 있어 ? 현재와 동일: 직무+ 공고 작성 페이지로 이동)

  return (
    <>
      <Grid container spacing={4}>
        {isOnWrite ? (
          <Grid item md={12}>
            <WhiteBox
              cpn={
                <WorkWrite OnClick={OnClick} myGuestHouses={myGuestHouses} />
              }
            />
          </Grid>
        ) : null}
        {works.map((work) => (
          // 해당 직무 아이디가 아닐 때만 보여주기
          <Grid item md={4} key={uuidv4()}>
            <WhiteBox cpn={<WorkDetail work={work} />} />
          </Grid>
        ))}
        <Grid item md={4}>
          {isLogin && houseCount > 0 ? (
            isOnWrite ? null : houseCount > 1 ? (
              <SelectGusetHousePopover myGuestHouses={myGuestHouses} />
            ) : (
              <Button onClick={OnClick}>+</Button>
            )
          ) : null}
        </Grid>
      </Grid>
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
