import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      dispatch(setUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }));
    })
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h2>Welcome to DevChat</h2>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
