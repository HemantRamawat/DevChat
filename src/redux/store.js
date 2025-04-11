import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import themeReducer from './themeSlice';
import channelReducer from './channelSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    channel: channelReducer,
  },
});
