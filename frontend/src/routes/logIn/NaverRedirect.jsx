import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfoByToken, getOurTokensFromServer } from '../../store/user';

export default function NaverRedirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAccessToken = () => {
    window.location.href.includes('access_token') && fetchToken();
  };

  const fetchToken = async () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    const state = window.location.href.split('&')[1].split('=')[1];
    const { payload } = await dispatch(
      getOurTokensFromServer({ token, state }),
    );
    dispatch(getUserInfoByToken(payload.accessToken));
    return navigate('/');
  };

  useEffect(() => {
    userAccessToken();
  });
  return <div></div>;
}
