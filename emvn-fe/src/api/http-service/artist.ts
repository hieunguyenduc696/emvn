import {
  TGetArtistParams,
  IArtist,
  TCreateArtistBody,
  TResponseCreateUpdate,
} from "../../types";
import { REST_API_ARTISTS } from "../urls";
import { HttpService } from "./http-service";
import qs from "query-string";

export const getAllArtists = async (
  queryParams: TGetArtistParams
): Promise<IArtist[]> => {
  const route = `${REST_API_ARTISTS.GET_ALL.uri}?${qs.stringify(queryParams)}`;

  return await HttpService.get<IArtist[]>(route);
};

export const createArtist = async (
  body: TCreateArtistBody
): Promise<TResponseCreateUpdate> => {
  return await HttpService.post<TCreateArtistBody, TResponseCreateUpdate>(
    REST_API_ARTISTS.CREATE.uri,
    body
  );
};
