import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGoogleToken, getUserInfoByToken } from '../../store/user';
import { getGoogleAccessToken } from '../../api/google';

export default function GoogleRedirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth_code = window.location.search.split('=')[1].split('&')[0];

  async function getGoogleUser() {
    // 인가코드로 구글 서버에서 accessToken 가져오기
    const access_token = (await getGoogleAccessToken(auth_code)).data
      .access_token;
    const payload = (await dispatch(getGoogleToken(access_token))).payload;
    dispatch(getUserInfoByToken(payload.accesstoken));
    navigate('/');
  }
  useEffect(() => {
    getGoogleUser();
  });

  return <div></div>;
}
