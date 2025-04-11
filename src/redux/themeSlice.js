import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    color: '#1976d2', // default MUI blue
  },
  reducers: {
    setThemeColor(state, action) {
      state.color = action.payload;
    }
  }
});

export const { setThemeColor } = themeSlice.actions;
export default themeSlice.reducer;
