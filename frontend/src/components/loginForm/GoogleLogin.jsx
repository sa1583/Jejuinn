import { useRef } from 'react';
import { useEffect } from 'react';

const useScript = (url, onload) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.onload = onload;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [url, onload]);
};

export default function GoogleLogin({ onGoogleSignIn = () => {} }) {
  const googleSignInButton = useRef(null);

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id:
        '1008073384484-a3je9dqdn459bdeeg3i5ehupsu31d4su.apps.googleusercontent.com',
      callback: onGoogleSignIn,
    });
    window.google.accounts.id.renderButton(googleSignInButton.current, {
      type: 'icon',
      shape: 'circle',
    });
  });

  return <div ref={googleSignInButton}></div>;
}
