import SearchForm from '../../components/main/SearchForm';

export default function Main() {
  return (
    <div
      style={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src="images/main.png" style={{ height: '400px' }} />
      <SearchForm />
    </div>
  );
}
