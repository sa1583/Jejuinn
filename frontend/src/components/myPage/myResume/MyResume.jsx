import { Box } from '@mui/material';
import MyResumeInfo from './MyResumeInfo';
import MyResumeApply from './MyResumeApply';
import MyResumeWrite from './MyResumeWrite';
import { useEffect, useState } from 'react';
import { getResume } from '../../../api/resume';
import NaverAuth from '../../naverAuth/NaverAuth';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../../../store/user';

export default function MyResume() {
  const [onModify, setOnModify] = useState(false);
  const [resume, setResume] = useState();
  const [isAuth, setIsAuth] = useState(false);

  const userInfo = useSelector(selectUserInfo);
  const accessToken = useSelector(selectAccessToken);

  // const userInfo = { ...userInfoTest, authorities: ['naver'] };

  const changeApplyComp = () => {
    setOnModify(!onModify);
  };

  useEffect(() => {
    // resume 요청해서 있으면 가져오고 없으면 null
    async function getAndSetResume() {
      const res = await getResume(accessToken, userInfo.uid);
      // const res = getResume(accessToken, userInfoTest.uid);
      setResume(res.data);
    }
    getAndSetResume();
    // setResume({});
    console.log(onModify);
  }, []);

  useEffect(() => {
    console.log(
      'useEffect',
      userInfo.authorities.indexOf({ authorityName: 'ROLE_AUTH' }),
    );
    userInfo?.authorities?.map((auth) => {
      if (auth.authorityName == 'ROLE_AUTH') setIsAuth(true);
    });
  }, [userInfo]);

  return (
    <>
      {isAuth ? (
        <Box sx={{ p: '3%' }}>
          <MyResumeInfo />
          <hr />
          {resume ? (
            onModify ? (
              <MyResumeWrite
                resume={resume}
                changeApplyComp={changeApplyComp}
              />
            ) : (
              <MyResumeApply
                resume={resume}
                changeApplyComp={changeApplyComp}
              />
            )
          ) : (
            <MyResumeWrite resume={resume} changeApplyComp={changeApplyComp} />
          )}
        </Box>
      ) : (
        <NaverAuth />
      )}
    </>
  );
}
