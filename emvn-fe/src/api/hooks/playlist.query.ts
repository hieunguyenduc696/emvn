import { useMutation, useQuery } from "react-query";
import {
  TCreatePlaylistBody,
  TGetPlaylistParams,
  TResponseCreateUpdate,
} from "../../types";
import { REST_API_PLAYLISTS } from "../urls";
import {
  createPlaylist,
  getAllPlaylists,
  updatePlaylist,
  getOnePlaylist,
} from "../http-service";

export function useGetAllPlaylists(queryParams: TGetPlaylistParams) {
  return useQuery(
    [...Object.values(REST_API_PLAYLISTS.GET_ALL), queryParams],
    () => getAllPlaylists(queryParams)
  );
}

export function useGetOnePlaylist(id: string) {
  return useQuery(
    [...Object.values(REST_API_PLAYLISTS.GET_ONE), id],
    () => getOnePlaylist(id),
    {
      enabled: !!id,
      cacheTime: 0,
      staleTime: 0,
    }
  );
}

export function useCreatePlaylist() {
  return useMutation<TResponseCreateUpdate, never, TCreatePlaylistBody>(
    (payload: TCreatePlaylistBody) => createPlaylist(payload)
  );
}

export function useUpdatePlaylist() {
  return useMutation<
    void,
    never,
    {
      playlistId: string;
      trackId: string;
      type: "add" | "remove";
    }
  >((payload) => updatePlaylist(payload));
}
