import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import Header from './components/Header';
import LogIn from './routes/logIn/LogIn';
import SignUp from './routes/signUp/SignUp';
import SignUpAgree from './components/signUp/SignUpAgree';
import SignUpInfo from './components/signUp/SignUpInfo';
import SignUpComplete from './components/signUp/SignUpComplete';

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
    ],
  },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
