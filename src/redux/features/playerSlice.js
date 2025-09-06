import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // payload can be { song, data, i }
    setActiveSong: (state, action) => {
      const { song, data, i } = action.payload || {};
      // Normalize list (Shazam returns an array; Apple Music often returns {data:[...]})
      const list = Array.isArray(data)
        ? data
        : data && Array.isArray(data.data)
        ? data.data
        : [];

      state.currentSongs = list;
      state.currentIndex = typeof i === "number" ? i : 0;
      state.activeSong = song || list[state.currentIndex] || {};
      state.isActive = !!state.activeSong;
    },

    nextSong: (state, action) => {
      // optional payload: index to jump to
      const nextIndex =
        typeof action.payload === "number"
          ? action.payload
          : state.currentIndex + 1;

      if (!state.currentSongs?.length) return;

      const boundedIndex =
        nextIndex >= state.currentSongs.length ? 0 : nextIndex;

      state.currentIndex = boundedIndex;
      state.activeSong = state.currentSongs[boundedIndex] || {};
      state.isActive = !!state.activeSong;
    },

    prevSong: (state, action) => {
      const prevIndex =
        typeof action.payload === "number"
          ? action.payload
          : state.currentIndex - 1;

      if (!state.currentSongs?.length) return;

      const boundedIndex =
        prevIndex < 0 ? state.currentSongs.length - 1 : prevIndex;

      state.currentIndex = boundedIndex;
      state.activeSong = state.currentSongs[boundedIndex] || {};
      state.isActive = !!state.activeSong;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
} = playerSlice.actions;

export default playerSlice.reducer;
