import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useAxiosInterceptor } from '../hooks/useAxiosInterceptor';

export default function Root() {
  useAxiosInterceptor();
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
