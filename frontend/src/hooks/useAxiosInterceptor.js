import instance from '../api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  logout,
  renewAccessTokenByRefreshToken,
  selectRefreshToken,
} from '../store/user';
import { useDispatch, useSelector } from 'react-redux';

export const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = useSelector(selectRefreshToken);

  const handleError = (err) => {
    console.log(err.response.status);
    if (err.response.status === 401) {
      const api = err.request.responseURL.split('jejuinn.com')[1];
      console.log('api', api);
      console.log('refreshToken', refreshToken);
      if (api === '/api/users/refresh') {
        dispatch(logout);
        navigate('/login');
      } else {
        try {
          if (refreshToken === null)
            throw new Error('there is no refreshToken');
          dispatch(renewAccessTokenByRefreshToken(refreshToken));
        } catch (error) {
          navigate('/login');
        }
      }
    }
    return Promise.reject(err);
  };
  const handleResponse = (response) => {
    console.log('response', response);
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
