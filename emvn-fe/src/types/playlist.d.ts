import { ITrack } from "./track";

export interface IPlaylist {
  _id: string;
  name: string;
  trackIds: ITrack[];
}

export type TGetPlaylistParams = {
  name?: string;
};

export type TCreatePlaylistBody = {
  name: string;
};
