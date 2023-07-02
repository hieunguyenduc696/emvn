export interface IArtist {
  _id: string;
  name: string;
}

export type TGetArtistParams = {
  name?: string;
};

export type TCreateArtistBody = {
  name: string;
};
