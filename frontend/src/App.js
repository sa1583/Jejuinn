import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import LogIn from './routes/logIn/LogIn';
import SignUp from './routes/signUp/SignUp';
import SignUpAgree from './components/signUp/SignUpAgree';
import SignUpInfo from './components/signUp/SignUpInfo';
import SignUpComplete from './components/signUp/SignUpComplete';
import GuestHouseList from './routes/guestHouseList/GuestHouseList';
import WorkList from './routes/work/WorkList';
import WorkDetail from './routes/work/WorkDetail';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/index';
import KakaoRedirect from './routes/logIn/KakaoRedirect';
import NaverRedirect from './routes/logIn/NaverRedirect';
import GoogleRedirect from './routes/logIn/GoogleRedirect';
import Main from './routes/main/Main';
import StaffPick from './routes/staffPick/StaffPick';
import StaffPickDetail from './routes/staffPickDetail/StaffPickDetail';


const signUp1 = <SignUpAgree />;
const signUp2 = <SignUpInfo />;
const signUp3 = <SignUpComplete />;
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
        element: <SignUp content={signUp1} />,
      },
      {
        path: 'signup2',
        element: <SignUp content={signUp2} />,
      },
      {
        path: 'signup3',
        element: <SignUp content={signUp3} />,
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
        path: 'guesthouselist',
        element: <GuestHouseList />,
      },
      {
        path: 'worklist',
        element: <WorkList />,
      },
      {
        path: 'worklist/detail/:recruitmentUid',
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
    ],
  },
]);

function App() {
  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </>
  );
}

export default App;
