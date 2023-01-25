import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGoogleAuthToken, getUserInfoByToken } from '../../store/user';

export default function GoogleRedirect() {
  console.log('여기서 훅 호출이 안돼...');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAccessToken = () => {
    window.location.href.includes('access_token') && fetchToken();
  };

  const fetchToken = async () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    const data = dispatch(getGoogleAuthToken(token));
    dispatch(getUserInfoByToken(data));
    return navigate('/');
  };

  useEffect(() => {
    userAccessToken();
  });
  return <div></div>;
}
