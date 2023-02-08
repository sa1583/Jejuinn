import { Grid, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import WorkDetail from './WorkDetail';
import WhiteBox from '../whiteBox/WhiteBox';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import WorkWrite from './WorkWrite';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../store/user';

export default function WorkListBox({ works }) {
  const isLogin = useSelector(selectIsLogin);
  const houseCount = 2;
  // 내 게하 보기 만들어 지면 게스트하우스 갯수 확인

  const [onWrite, setOnWrite] = useState(false);
  const OnClick = () => {
    // 채용 공고가 있는 경우 리스트에서 직무 바로 작성 가능
    // 채용 공고가 없는 경우 리스트에서 직무 바로 작성 불가 채용공고와 함께 작성해야함
    if (houseCount > 1) {
      // 게스트하우스 목록 받아와서 길이 확인하고
      // 해당 유저에 등록된 게하가 여러개면, 게하 선택하는 버튼 필요
    }
    const prev = onWrite;
    setOnWrite(!prev);
  };

  return (
    <>
      <Grid container spacing={4}>
        {onWrite ? (
          <Grid item md={12}>
            <WhiteBox cpn={<WorkWrite OnClick={OnClick} />} />
          </Grid>
        ) : null}
        {works.map((work) => (
          // 해당 직무 아이디가 아닐 때만 보여주기
          <Grid item md={4} key={uuidv4()}>
            <WhiteBox cpn={<WorkDetail work={work} />} />
          </Grid>
        ))}
        {isLogin && houseCount > 0 ? (
          onWrite ? null : (
            <Grid item md={4}>
              <Button onClick={OnClick}>+</Button>
            </Grid>
          )
        ) : null}
      </Grid>
    </>
  );
}
