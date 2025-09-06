import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
   setActiveSong: (state, action) => {
  const song = action.payload.song;

  // Normalize so all components work regardless of API source
  const normalizedSong = {
    ...song,
    title: song?.attributes?.name ?? song?.title,
    subtitle: song?.attributes?.artistName ?? song?.subtitle,
    previewUrl:
      song?.attributes?.previews?.[0]?.url ??
      song?.hub?.actions?.[1]?.uri ??
      null,
  };

  state.activeSong = normalizedSong;

  if (action.payload?.data?.tracks?.hits) {
    state.currentSongs = action.payload.data.tracks.hits;
  } else if (action.payload?.data?.properties) {
    state.currentSongs = action.payload?.data?.tracks;
  } else {
    state.currentSongs = action.payload.data;
  }

  state.currentIndex = action.payload.i;
  state.isActive = true;
},

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
