import React, { createContext, useContext, useState } from "react";
import { ITrack } from "../types";

type TTrackContextProps = {
  currentTrack: ITrack | null;
  handleChangeTrack: (track: ITrack) => void;
};

const TrackContext = createContext<TTrackContextProps>({
  currentTrack: null,
  handleChangeTrack: () => {},
});

type TProps = {
  children?: React.ReactNode;
};

export const TrackProvider: React.FC<TProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);

  const handleChangeCurrentTrack = (track: ITrack) => setCurrentTrack(track);

  return (
    <TrackContext.Provider
      value={{
        currentTrack,
        handleChangeTrack: handleChangeCurrentTrack,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => {
  return useContext(TrackContext);
};
