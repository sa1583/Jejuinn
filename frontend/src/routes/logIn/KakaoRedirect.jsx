// import axios from 'axios';
// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

export default function KakaoRedirect() {
  // const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  // const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  // const location = useLocation();
  // const AUTHORIZE_CODE = location.search.split('=')[1];
  // const navigate = useNavigate();

  // 이거 이제 로직 바꿔서 나중에 redux로 사용하자
  // const getKakaoToken = () => {
  //   axios({
  //     method: 'post',
  //     url: 'https://kauth.kakao.com/oauth/token',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //     },
  //     data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
  //   })
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       if (data.access_token) {
  //         // localStorage.setItem('token', data.access_token);
  //       } else {
  //         navigate('/');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       navigate('/');
  //     });
  // };

  // 로그아웃 버튼도 밖으로 빼고 리덕스 사용해서 관리하자
  // const logout = () => {
  //   const ACCESS_TOKEN = localStorage.getItem('token');
  //   axios({
  //     method: 'post',
  //     url: 'https://kapi.kakao.com/v1/user/logout',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Authorization: `Bearer ${ACCESS_TOKEN}"`,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       localStorage.removeItem('token');
  //       navigate('/');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   if (!location.search) return;
  //   getKakaoToken();
  // });

  return (
    <div>
      카카오 로그인
      {/* <button onClick={logout}>로그아웃</button> */}
    </div>
  );
}
