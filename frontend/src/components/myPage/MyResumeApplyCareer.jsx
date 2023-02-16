import { useEffect } from 'react';

export default function MyResumeApplyCareer(props) {
  useEffect(() => {
    console.log(props);
  }, []);
  return <div>{props.career}</div>;
}
