import React from 'react';
import { googleSignIn } from './firebase/auth';

export default function GoogleLogin() {
  return <div onClick={googleSignIn}>Login using Google</div>;
}
