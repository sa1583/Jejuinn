// import axios from 'axios';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getKakaoAuthToken,
  getKakaoUserInfo,
  getUserInfoByToken,
} from '../../store/user';

export default function KakaoRedirect() {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.search.split('=')[1];

  // const getKakaoAccess = async () => {
  //   const data = dispatch(getKakaoAuthToken(token));
  //   dispatch(getUserInfoByToken(data));
  // };

  // 이거 이제 로직 바꿔서 나중에 redux로 사용하자
  // 여기서 then에서 api(dispatch)로 백엔드에 accesstoken 보내쟝

  const getKakaoToken = () => {
    axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${token}`,
    })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        const access_token = res.access_token;
        const data = dispatch(getKakaoAuthToken(access_token));
        dispatch(getUserInfoByToken(data));
        navigate('/');

        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8080/api/users/social/kakao',
        //   headers: {
        //     access_token: `BEARER ${data.access_token}`,
        //   },
        // }).then((res) => {
        //   console.log(res);
        // });
      })
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  };

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

  useEffect(() => {
    if (!location.search) return;
    // getKakaoAccess()
    getKakaoToken();
  });

  return <></>;
}
