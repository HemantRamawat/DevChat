import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { setUser, clearUser } from './redux/userSlice';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import ThemeSelector from './components/ThemeSelector';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const themeColor = useSelector((state) => state.theme.color);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      primary: {
        main: themeColor,
      },
    },
  });
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
      user ? (
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <ThemeSelector /> {/* ✅ Color picker visible for user */}
            <Chat />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </ThemeProvider>
  );
}

export default App;
