import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function Root() {
  return (
    <div>
      <Header />
      <div style={{ height: '80px' }}></div>
      <Outlet />
    </div>
  );
}
