import {
  TResponseCreateUpdate,
  TGetAlbumParams,
  IAlbum,
  TCreateAlbumBody,
} from "../../types";
import { REST_API_ALBUMS } from "../urls";
import { HttpService } from "./http-service";
import qs from "query-string";

export const getAllAlbums = async (
  queryParams: TGetAlbumParams
): Promise<IAlbum[]> => {
  const route = `${REST_API_ALBUMS.GET_ALL.uri}?${qs.stringify(queryParams)}`;

  return await HttpService.get<IAlbum[]>(route);
};

export const createAlbum = async (
  body: TCreateAlbumBody
): Promise<TResponseCreateUpdate> => {
  return await HttpService.post<TCreateAlbumBody, TResponseCreateUpdate>(
    REST_API_ALBUMS.CREATE.uri,
    body
  );
};
