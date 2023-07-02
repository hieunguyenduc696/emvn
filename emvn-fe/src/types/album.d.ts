export interface IAlbum {
  _id: string;
  name: string;
  artistId: string;
}

export type TGetAlbumParams = {
  name?: string;
  artistId: string;
};

export type TCreateAlbumBody = {
  name: string;
  artistId: string;
};
