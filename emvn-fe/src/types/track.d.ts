import { EGenre } from "../constant";
import { IAlbum } from "./album";
import { IArtist } from "./artist";

export interface ITrack {
  _id: string;
  title: string;
  coverImage: string;
  artistDetail: IArtist;
  albumDetail: IAlbum;
  genre: EGenre;
  releaseDate: string;
  duration: string;
  audio: string;
}

export type TGetTrackParams = {
  title?: string;
  genre?: EGenre;
  albumName?: string;
  artistName?: string;
};

export type TCreateTrackBody = {
  title: string;
  coverImage: string;
  albumId: string;
  genre: EGenre;
  releaseDate: string;
  duration: string;
  audio: string;
};
