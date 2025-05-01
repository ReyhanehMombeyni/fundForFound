'use client';

import { env } from '@/../lib/env';

const GoogleButton = () => {
    const handleGoogleLogin = (): void => {
          const redirectUri = `${env.NEXT_PUBLIC_FRONT_URL}/auth/google/callback`;
      
          const params = new URLSearchParams({
            response_type: 'code',
            client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            redirect_uri: redirectUri,
            scope: ['openid', 'profile', 'email'].join(' '),
            access_type: 'offline',
            prompt: 'select_account',
          });
      
          const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
          window.location.href = url;
      };
  return (
    <button className='btn' onClick={handleGoogleLogin}>Continue With google</button>
  )
}

export default GoogleButton