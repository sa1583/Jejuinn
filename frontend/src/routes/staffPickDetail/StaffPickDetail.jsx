import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function StaffPickDetail() {
  // 여기서 useEffect로 url 끝 번호를 따서
  // 글 번호로 axios 요청보내서 글 디테일 정보 받아와야함
  const location = useLocation();
  const [id, setId] = useState('');
  useEffect(() => {
    setId(location.pathname.split('detail/')[1]);
  }, []);
  return <div>{id}</div>;
}
