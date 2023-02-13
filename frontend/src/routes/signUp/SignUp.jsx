import BoxLoginSignup from '../../components/boxLoginSignup/BoxLoginSignup';

export default function signUp({ content }) {
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
      <BoxLoginSignup content={content} />
    </div>
  );
}
