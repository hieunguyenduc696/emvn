import { useMutation, useQuery } from "react-query";
import {
  TCreateAlbumBody,
  TGetAlbumParams,
  TResponseCreateUpdate,
} from "../../types";
import { REST_API_ALBUMS } from "../urls";
import { createAlbum, getAllAlbums } from "../http-service";

export function useGetAllAlbums(queryParams: TGetAlbumParams) {
  return useQuery(
    [...Object.values(REST_API_ALBUMS.GET_ALL), queryParams],
    () => getAllAlbums(queryParams),
    {
      enabled: !!queryParams.artistId,
    }
  );
}

export function useCreateAlbum() {
  return useMutation<TResponseCreateUpdate, never, TCreateAlbumBody>(
    (payload: TCreateAlbumBody) => createAlbum(payload)
  );
}
