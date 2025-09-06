import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) => {
  const isActive =
    (activeSong?.id && song?.id && activeSong.id === song.id) ||
    (activeSong?.title &&
      song?.attributes?.name &&
      activeSong.title === song.attributes.name);

  return isPlaying && isActive ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );
};

export default PlayPause;
