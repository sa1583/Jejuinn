import GoogleLogin from './GoogleLogin';
import GoogleRedirect from '../../routes/logIn/GoogleRedirect';

export default function Login() {
  const onGoogleSignIn = async (res) => {
    const { credential } = res;
    const result = await GoogleRedirect(credential);
    console.log(result);
  };

  return (
    <div>
      <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" />
    </div>
  );
}
