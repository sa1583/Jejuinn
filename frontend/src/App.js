import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import LogIn from './routes/logIn/LogIn';
import SignUp from './routes/signUp/SignUp';
import GuestHouse from './routes/guestHouse/GuestHouse';
import GuestHouseDetail from './routes/guestHouseDetail/GuestHouseDetail';
import WorkList from './routes/work/WorkList';
import WorkDetail from './routes/work/WorkDetail';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/index';
import KakaoRedirect from './routes/logIn/KakaoRedirect';
import NaverRedirect from './routes/logIn/NaverRedirect';
import GoogleRedirect from './routes/logIn/GoogleRedirect';
import FacebookRedirect from './routes/logIn/FacebookRedirect';
import Main from './routes/main/Main';
import StaffPick from './routes/staffPick/StaffPick';
import StaffPickDetail from './routes/staffPickDetail/StaffPickDetail';
import StaffPickCreate from './routes/staffPickCreate/StaffPickCreate';
import SendSMS from './components/sendSMS/SendSMS';
import { createTheme, ThemeProvider } from '@mui/material';
import MyPage from './routes/myPage/MyPage';
import MyMain from './components/myPage/MyMain';
import MyResume from './components/myPage/MyResume';
import MyGuestHouse from './components/myPage/MyGuestHouse';
import SignUpBox from './components/signUp/SignUpBox';
import FindPassword from './routes/logIn/FindPassword';
import MyApplicantList from './components/myPage/MyApplicantList';
import VideoInterview from './routes/videoInterview/VideoInterview';

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
        path: 'signup1',
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
        path: 'login/facebook',
        element: <FacebookRedirect />,
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
        path: 'worklist',
        element: <WorkList />,
      },
      {
        path: 'worklist/detail',
        element: <WorkDetail />,
      },
      {
        path: 'staffpicklist',
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
        path: 'login/findpassword',
        element: <FindPassword />,
      },
      {
        path: 'interview',
        element: <VideoInterview />,
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
