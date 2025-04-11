import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    currentChannel: null,
  },
  reducers: {
    setChannel(state, action) {
      state.currentChannel = action.payload;
    }
  }
});

export const { setChannel } = channelSlice.actions;
export default channelSlice.reducer;
