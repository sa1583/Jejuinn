import { useEffect, useRef } from 'react';

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
      width={props.width}
      height={props.height}
      style={{ borderRadius: '8px', border: 'solid 2px grey' }}
    />
  );
}
