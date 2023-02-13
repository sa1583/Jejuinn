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
    await dispatch(getUserInfoByToken(payload.accesstoken));
    navigate('/');
  }

  useEffect(() => {
    if (!location.search) return;
    getKakaoUser();
  });

  return <></>;
}
