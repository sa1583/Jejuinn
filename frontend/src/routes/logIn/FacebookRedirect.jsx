import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFacebookToken, getUserInfoByToken } from '../../store/user';
import { getFacebookAccessToken } from '../../api/facebook';

export default function FacebookRedirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth_code = window.location.search.split('=')[1];

  async function getFacebookUser() {
    // 인가코드로 페이스북 서버에서 accessToken 가져오기
    const access_token = (await getFacebookAccessToken(auth_code)).data
      .access_token;
    // 페이스북 서버에서 받은 accessToken을 우리 BE서버로 보내서 정보 가져오기
    const { payload } = dispatch(getFacebookToken(access_token));
    dispatch(getUserInfoByToken(payload.accesstoken));
    navigate('/');
  }
  useEffect(() => {
    getFacebookUser();
  });

  return <div></div>;
}
