import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNaverTokens, getUserInfoByToken } from '../../store/user';

export default function NaverRedirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAccessToken = () => {
    window.location.href.includes('access_token') && fetchToken();
  };

  const fetchToken = async () => {
    const code = window.location.href.split('=')[1].split('&')[0];
    const accessToken = dispatch(getNaverTokens(code));
    dispatch(getOurTokens(accessToken));
    dispatch(getUserInfoByToken(data));
    return navigate('/');
  };

  useEffect(() => {
    userAccessToken();
  });
  return <div></div>;
}
