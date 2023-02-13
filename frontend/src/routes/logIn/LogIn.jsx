import BoxLoginSignup from '../../components/boxLoginSignup/BoxLoginSignup';
import LoginForm from '../../components/loginForm/LoginForm';

export default function LogIn() {
  const content = <LoginForm />;
  return (
    <div
      style={{
        background: '#FF7600',
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10rem',
        paddingBottom: '10rem',
      }}
    >
      <BoxLoginSignup content={content}></BoxLoginSignup>
    </div>
  );
}
