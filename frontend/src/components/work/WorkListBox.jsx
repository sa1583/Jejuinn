import { Grid } from '@mui/material';
import WorkDetail from './WorkDetail';
import MyWorkList from './MyWorkList';
import WhiteBox from '../whiteBox/WhiteBox';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../store/user';

export default function WorkListBox({ works }) {
  const isLogin = useSelector(selectIsLogin);

  return (
    <>
      <Grid container spacing={4}>
        {isLogin ? (
          <Grid item>
            <MyWorkList />
          </Grid>
        ) : null}
        <Grid item md={12}>
          <h2>진행중인 채용공고</h2>
        </Grid>

        {works.map((work) => (
          <Grid item md={4} key={uuidv4()}>
            <WhiteBox cpn={<WorkDetail work={work} />} />
          </Grid>
        ))}
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
