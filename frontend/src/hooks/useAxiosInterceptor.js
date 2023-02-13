import instance from '../api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getUserInfoByToken,
  logout,
  renewAccessTokenByRefreshToken,
  selectAccessToken,
  selectRefreshToken,
  selectUserInfo,
} from '../store/user';
import { useDispatch, useSelector } from 'react-redux';

export const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const userInfo = useSelector(selectUserInfo);

  const handleError = async (err) => {
    console.log(err.response.status);
    if (err.response.status === 401) {
      const api = err.request.responseURL.split('jejuinn.com')[1];
      if (api === '/api/users/refresh') {
        dispatch(logout(accessToken, userInfo.uid));
        navigate('/login');
      } else {
        try {
          if (refreshToken === null) {
            throw new Error('there is no refreshToken');
          }
          const accessToken = await dispatch(
            renewAccessTokenByRefreshToken(refreshToken),
          );
          dispatch(getUserInfoByToken(accessToken));
        } catch (error) {
          navigate('/login');
        }
      }
    }
    return Promise.reject(err);
  };
  const handleResponse = (response) => {
    return response;
  };

  const responseInterceptor = instance.interceptors.response.use(
    (response) => handleResponse(response),
    (error) => handleError(error),
  );

  useEffect(() => {
    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor]);
};
