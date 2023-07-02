import { useMutation, useQuery } from "react-query";
import {
  TCreateTrackBody,
  TGetTrackParams,
  TResponseCreateUpdate,
} from "../../types";
import { REST_API_TRACKS } from "../urls";
import {
  createTrack,
  deleteTrack,
  getAllTracks,
  getOneTrack,
  updateTrack,
} from "../http-service";

export function useGetAllTracks(queryParams: TGetTrackParams) {
  return useQuery(
    [...Object.values(REST_API_TRACKS.GET_ALL), queryParams],
    () => getAllTracks(queryParams)
  );
}

export function useGetOneTrack(id: string) {
  return useQuery(
    [...Object.values(REST_API_TRACKS.GET_ONE), id],
    () => getOneTrack(id),
    {
      enabled: !!id,
      cacheTime: 0,
      staleTime: 0,
    }
  );
}

export function useCreateTrack() {
  return useMutation<TResponseCreateUpdate, never, TCreateTrackBody>(
    (payload: TCreateTrackBody) => createTrack(payload)
  );
}

export function useDeleteTrack() {
  return useMutation<void, never, string>((payload) => deleteTrack(payload));
}

export function useUpdateTrack() {
  return useMutation<void, never, TCreateTrackBody & { id: string }>(
    (payload) => updateTrack(payload)
  );
}
