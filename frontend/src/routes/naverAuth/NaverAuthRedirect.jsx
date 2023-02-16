import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  naverAuth,
  getUserInfoByToken,
  selectAccessToken,
} from '../../store/user';

export default function NaverAuthRedirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  const userAccessToken = () => {
    window.location.href.includes('access_token') && fetchToken();
  };

  const fetchToken = async () => {
    const socialToken = window.location.href.split('=')[1].split('&')[0];
    await dispatch(naverAuth({ accessToken, socialToken }));
    dispatch(getUserInfoByToken(accessToken));
    return navigate('/mypage/resume');
  };

  useEffect(() => {
    userAccessToken();
  });
  return <div></div>;
}
