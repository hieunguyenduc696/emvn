import { useMutation, useQuery } from "react-query";
import {
  TCreateArtistBody,
  TGetArtistParams,
  TResponseCreateUpdate,
} from "../../types";
import { REST_API_ARTISTS } from "../urls";
import { createArtist, getAllArtists } from "../http-service";

export function useGetAllArtists(queryParams: TGetArtistParams) {
  return useQuery(
    [...Object.values(REST_API_ARTISTS.GET_ALL), queryParams],
    () => getAllArtists(queryParams)
  );
}

export function useCreateArtist() {
  return useMutation<TResponseCreateUpdate, never, TCreateArtistBody>(
    (payload: TCreateArtistBody) => createArtist(payload)
  );
}
