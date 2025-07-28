import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AudioState {
  time: number;
  currentPlayingId: string | null;
}

const initialState: AudioState = {
  time: 0,
  currentPlayingId: null,
};

const audioSlice = createSlice({
  name: "currentTime",
  initialState,
  reducers: {
    currentTimeAction: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    setCurrentPlayingAudio: (state, action: PayloadAction<string | null>) => {
      state.currentPlayingId = action.payload;
    },
  },
});

export const { currentTimeAction, setCurrentPlayingAudio } = audioSlice.actions;
export default audioSlice.reducer;
