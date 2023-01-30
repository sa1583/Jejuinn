import { images } from '../../assets/images';

export default function FacebookLogin() {
  const FACEBOOK_CLIENT_ID = process.env.REACT_APP_FACEBOOK_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const FACEBOOK_AUTH_URL = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.href = FACEBOOK_AUTH_URL;
  };

  return (
    <>
      <img
        src={images.facebook_login}
        alt="facebook login"
        onClick={handleLogin}
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          height: '4rem',
          cursor: 'pointer',
        }}
      />
    </>
  );
}
