import BoxLoginSignup from '../../components/boxLoginSignup/BoxLoginSignup';
import LoginForm from '../../components/loginForm/LoginForm';

export default function LogIn() {
  const content = <LoginForm />;
  return (
    <div
      style={{
        background: 'rgba(255, 118, 0, 0.04)',
        width: '100%',
        height: '555px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10rem',
        paddingBottom: '10rem',
      }}
    >
      <BoxLoginSignup content={content}></BoxLoginSignup>
      {/* <LoginForm /> */}
    </div>
  );
}
