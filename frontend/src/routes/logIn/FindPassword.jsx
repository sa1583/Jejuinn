import BoxLoginSignup from '../../components/boxLoginSignup/BoxLoginSignup';
import FindPasswordForm from '../../components/findPassword/FindPasswordForm';

export default function FindPassword() {
  return (
    <div
      style={{
        background: '#FF7600',
        width: '100%',
        height: '92vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BoxLoginSignup content={<FindPasswordForm />} />
    </div>
  );
}
