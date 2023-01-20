import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import LogIn from './routes/logIn/LogIn';
import SignUp from './routes/signUp/SignUp';
import SignUpAgree from './components/signUp/SignUpAgree';
import SignUpInfo from './components/signUp/SignUpInfo';
import SignUpComplete from './components/signUp/SignUpComplete';
import KakaoLogin from './routes/kakaoLogin/KakaoLogin';
import GuestHouseList from './routes/guestHouseList/GuestHouseList';
import WorkList from './routes/workList/WorkList';
import StaffPickList from './routes/staffPickList/StaffPickList';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/index';

const signUp1 = <SignUpAgree />;
const signUp2 = <SignUpInfo />;
const signUp3 = <SignUpComplete />;
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'login/',
        element: <LogIn />,
      },
      {
        path: 'signup1/',
        element: <SignUp content={signUp1} />,
      },
      {
        path: 'signup2/',
        element: <SignUp content={signUp2} />,
      },
      {
        path: 'signup3/',
        element: <SignUp content={signUp3} />,
      },
      {
        path: 'login/kakao/',
        element: <KakaoLogin />,
      },
      {
        path: 'guesthouselist/',
        element: <GuestHouseList />,
      },
      {
        path: 'worklist/',
        element: <WorkList />,
      },
      {
        path: 'staffpicklist/',
        element: <StaffPickList />,
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
