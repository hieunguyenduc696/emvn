import { generatePath } from "react-router-dom";
import {
  TGetPlaylistParams,
  IPlaylist,
  TResponseCreateUpdate,
  TCreatePlaylistBody,
} from "../../types";
import { REST_API_PLAYLISTS } from "../urls";
import { HttpService } from "./http-service";
import qs from "query-string";

export const getAllPlaylists = async (
  queryParams: TGetPlaylistParams
): Promise<IPlaylist[]> => {
  const route = `${REST_API_PLAYLISTS.GET_ALL.uri}?${qs.stringify(
    queryParams
  )}`;

  return await HttpService.get<IPlaylist[]>(route);
};

export const getOnePlaylist = async (id: string): Promise<IPlaylist> => {
  const route = generatePath(REST_API_PLAYLISTS.GET_ONE.uri, {
    playlistId: id,
  });

  return await HttpService.get<IPlaylist>(route);
};

export const createPlaylist = async (
  body: TCreatePlaylistBody
): Promise<TResponseCreateUpdate> => {
  return await HttpService.post<TCreatePlaylistBody, TResponseCreateUpdate>(
    REST_API_PLAYLISTS.CREATE.uri,
    body
  );
};

export const updatePlaylist = async (payload: {
  playlistId: string;
  trackId: string;
  type: "add" | "remove";
}): Promise<void> => {
  const route = generatePath(REST_API_PLAYLISTS.UPDATE.uri, {
    playlistId: payload.playlistId,
  });

  return await HttpService.patch(route, {
    trackId: payload.trackId,
    type: payload.type,
  });
};
