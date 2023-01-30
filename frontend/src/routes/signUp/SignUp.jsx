import BoxLoginSignup from '../../components/boxLoginSignup/BoxLoginSignup';

export default function signUp({ content }) {
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
      <BoxLoginSignup content={content} />
    </div>
  );
}
