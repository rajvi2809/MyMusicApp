import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  nextSong,
  prevSong,
  playPause,
  setActiveSong,
} from "../../redux/features/playerSlice";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);

  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const handlePlayPause = () => {
    if (!isActive) return;
    dispatch(playPause(!isPlaying));
  };

  const handleNextSong = () => {
    if (!currentSongs?.length) return;

    if (shuffle) {
      const randIndex = Math.floor(Math.random() * currentSongs.length);
      dispatch(nextSong(randIndex));
      dispatch(
        setActiveSong({
          song: currentSongs[randIndex],
          data: currentSongs,
          i: randIndex,
        })
      );
    } else if (currentIndex === currentSongs.length - 1) {
      dispatch(nextSong(0));
      dispatch(
        setActiveSong({ song: currentSongs[0], data: currentSongs, i: 0 })
      );
    } else {
      dispatch(nextSong(currentIndex + 1));
      dispatch(
        setActiveSong({
          song: currentSongs[currentIndex + 1],
          data: currentSongs,
          i: currentIndex + 1,
        })
      );
    }
  };

  const handlePrevSong = () => {
    if (!currentSongs?.length) return;

    if (shuffle) {
      const randIndex = Math.floor(Math.random() * currentSongs.length);
      dispatch(prevSong(randIndex));
      dispatch(
        setActiveSong({
          song: currentSongs[randIndex],
          data: currentSongs,
          i: randIndex,
        })
      );
    } else if (currentIndex === 0) {
      const last = currentSongs.length - 1;
      dispatch(prevSong(last));
      dispatch(
        setActiveSong({ song: currentSongs[last], data: currentSongs, i: last })
      );
    } else {
      dispatch(prevSong(currentIndex - 1));
      dispatch(
        setActiveSong({
          song: currentSongs[currentIndex - 1],
          data: currentSongs,
          i: currentIndex - 1,
        })
      );
    }
  };

  useEffect(() => {
    if (activeSong && isActive && isPlaying) {
      // Optional: reset seek when song changes
      setSeekTime(0);
    }
  }, [activeSong?.id || activeSong?.key, isActive, isPlaying]);

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
      />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(e) => setSeekTime(e.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          isPlaying={isPlaying}
          volume={volume}
          seekTime={seekTime}
          repeat={repeat}
          onEnded={handleNextSong}
          onTimeUpdate={(e) => setAppTime(e.target.currentTime)}
          onLoadedData={(e) => setDuration(e.target.duration)}
        />
      </div>
      <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={(e) => setVolume(e.target.value)}
        setVolume={setVolume}
      />
    </div>
  );
};

export default MusicPlayer;
