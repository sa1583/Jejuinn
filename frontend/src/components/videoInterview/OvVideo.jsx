import { useEffect, useRef } from 'react';

const MAIN_HEIGHT = '520';
const SUB_HEIGHT = '130';

export default function OvVideo(props) {
  const videoRef = useRef();

  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  });

  return (
    <video
      autoPlay
      ref={videoRef}
      height={props.main ? MAIN_HEIGHT : SUB_HEIGHT}
    />
  );
}
