import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getKakaoAccessToken } from '../../api/kakao';
import { getKakaoToken, getUserInfoByToken } from '../../store/user';

export default function KakaoRedirect() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.search.split('=')[1];

  async function getKakaoUser() {
    const access_token = (await getKakaoAccessToken(token)).data.access_token;
    const { payload } = await dispatch(getKakaoToken(access_token));
    dispatch(getUserInfoByToken(payload));
    navigate('/');
  }

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
    getKakaoUser();
  });

  return <></>;
}
