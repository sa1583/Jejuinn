import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import LogIn from './routes/logIn/LogIn';
import SignUp from './routes/signUp/SignUp';
import GuestHouse from './routes/guestHouse/GuestHouse';
import GuestHouseDetail from './routes/guestHouseDetail/GuestHouseDetail';
import WorkList from './routes/work/WorkList';
import WorkRecruitmentWrite from './routes/work/WorkRecruitmentWrite';
import WorkWrite from './routes/work/WorkWrite';
import RecruitmentUpdate from './routes/work/RecruitmentUpdate';
import WorkDetail from './routes/work/WorkDetail';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/index';
import KakaoRedirect from './routes/logIn/KakaoRedirect';
import NaverRedirect from './routes/logIn/NaverRedirect';
import GoogleRedirect from './routes/logIn/GoogleRedirect';
import Main from './routes/main/Main';
import StaffPick from './routes/staffPick/StaffPick';
import StaffPickDetail from './routes/staffPickDetail/StaffPickDetail';
import StaffPickCreate from './routes/staffPickCreate/StaffPickCreate';
import SendSMS from './components/sendSMS/SendSMS';
import { createTheme, ThemeProvider } from '@mui/material';
import MyPage from './routes/myPage/MyPage';
import MyMain from './components/myPage/main/MyMain';
import MyResume from './components/myPage/myResume/MyResume';
import MyGuestHouse from './components/myPage/myGuestHouse/MyGuestHouse';
import SignUpBox from './components/signUp/SignUpBox';
import FindPassword from './routes/logIn/FindPassword';
import MyApplicantList from './components/myPage/myGuestHouse/MyApplicantList';
import GuestHouseCreate from './routes/guestHouseCreate/GuestHouseCreate';
import VideoInterview from './routes/videoInterview/VideoInterview';
import StaffPickUpdate from './routes/staffPickUpdate/StaffPickUpdate';
import MyRecommendList from './components/myPage/myGuestHouse/MyRecommendList';
import NaverAuthRedirect from './routes/naverAuth/NaverAuthRedirect';
import GuestHouseUpdate from './components/guestHouseDetail/GuestHouseUpdate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: 'login',
        element: <LogIn />,
      },
      {
        path: 'signup',
        element: <SignUp content={<SignUpBox />} />,
      },
      {
        path: 'login/kakao',
        element: <KakaoRedirect />,
      },
      {
        path: 'login/naver',
        element: <NaverRedirect />,
      },
      {
        path: 'login/google',
        element: <GoogleRedirect />,
      },
      {
        path: 'guesthouse',
        element: <GuestHouse />,
      },
      {
        path: 'guesthouse/detail/:id',
        element: <GuestHouseDetail />,
      },
      {
        path: 'guesthouse/update/:id',
        element: <GuestHouseUpdate />,
      },
      {
        path: 'worklist',
        element: <WorkList />,
      },
      {
        path: 'recruitment/create/:guesthouseUid',
        element: <WorkRecruitmentWrite />,
      },
      {
        path: 'recruitment/update/:recruitmentUid/:guesthouseUid',
        element: <RecruitmentUpdate />,
      },
      {
        path: 'work/create/:recruitmentUid/:guesthouseUid',
        element: <WorkWrite />,
      },
      {
        path: 'work/update/:workUid/:recruitmentUid',
        element: <WorkWrite />,
      },
      {
        path: 'worklist/detail/:recruitmentUid/:workUid',
        element: <WorkDetail />,
      },
      {
        path: 'staffpicklist',
        element: <StaffPick />,
      },
      {
        path: 'staffpicklist/:spotid',
        element: <StaffPick />,
      },
      {
        path: 'staffpicklist/detail/:id',
        element: <StaffPickDetail />,
      },
      {
        path: 'staffpicklist/create',
        element: <StaffPickCreate />,
      },
      {
        path: 'staffpicklist/update/:id',
        element: <StaffPickUpdate />,
      },
      {
        path: 'sendSMS',
        element: <SendSMS />,
      },
      {
        path: 'mypage',
        element: <MyPage content={<MyMain />} />,
      },
      {
        path: 'mypage/resume',
        element: <MyPage content={<MyResume />} />,
      },
      {
        path: 'mypage/guesthouse',
        element: <MyPage content={<MyGuestHouse />} />,
      },
      {
        path: 'mypage/guesthouse/applicantlist/:id',
        element: <MyPage content={<MyApplicantList />} />,
      },
      {
        path: 'mypage/guesthouse/recommendlist/:id',
        element: <MyPage content={<MyRecommendList />} />,
      },
      {
        path: 'login/findpassword',
        element: <FindPassword />,
      },
      {
        path: 'guesthouse/create',
        element: <GuestHouseCreate />,
      },
      {
        path: 'interview/:sessionId',
        element: <VideoInterview />,
      },
      {
        path: 'toauth/naver',
        element: <NaverAuthRedirect />,
      },
    ],
  },
]);

const theme = createTheme({
  typography: {
    fontFamily: ['SUIT-Regular'],
  },
  palette: {
    primary: {
      main: '#FF7600',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

function App() {
  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </>
  );
}

export default App;
