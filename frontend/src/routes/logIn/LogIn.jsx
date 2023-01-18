import BoxLoginSignup from '../../components/boxLoginSignup/BoxLoginSignup';
import LoginForm from '../../components/loginForm/LoginForm';

export default function LogIn() {
  const content = <LoginForm />;
  return (
    <div
      style={{
        background: '#FF7600',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BoxLoginSignup content={content}></BoxLoginSignup>
    </div>
  );
}
