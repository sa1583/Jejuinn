import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNaverAuthToken, getUserInfoByToken } from '../../store/user';

export default function NaverRedirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAccessToken = () => {
    window.location.href.includes('access_token') && fetchToken();
  };

  const fetchToken = async () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    const data = dispatch(getNaverAuthToken(token));
    dispatch(getUserInfoByToken(data));
    return navigate('/');
  };

  useEffect(() => {
    userAccessToken();
  });
  return <div></div>;
}
