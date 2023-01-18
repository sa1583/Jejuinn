import BoxLoginSignup from '../../components/boxLoginSignup/BoxLoginSignup';

export default function signUp({ content }) {
  return (
    <div
      style={{
        background: '#FF973E',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BoxLoginSignup content={content} />
    </div>
  );
}
