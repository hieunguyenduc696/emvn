import { generatePath } from "react-router-dom";
import {
  TGetTrackParams,
  ITrack,
  TCreateTrackBody,
  TResponseCreateUpdate,
} from "../../types";
import { REST_API_TRACKS } from "../urls";
import { HttpService } from "./http-service";
import qs from "query-string";

export const getAllTracks = async (
  queryParams: TGetTrackParams
): Promise<ITrack[]> => {
  const route = `${REST_API_TRACKS.GET_ALL.uri}?${qs.stringify(queryParams)}`;

  return await HttpService.get<ITrack[]>(route);
};

export const getOneTrack = async (id: string): Promise<ITrack> => {
  const route = generatePath(REST_API_TRACKS.GET_ONE.uri, {
    trackId: id,
  });

  return await HttpService.get<ITrack>(route);
};

export const createTrack = async (
  body: TCreateTrackBody
): Promise<TResponseCreateUpdate> => {
  return await HttpService.post<TCreateTrackBody, TResponseCreateUpdate>(
    REST_API_TRACKS.CREATE.uri,
    body
  );
};

export const deleteTrack = async (id: string): Promise<void> => {
  const route = generatePath(REST_API_TRACKS.DELETE.uri, {
    trackId: id,
  });

  return await HttpService.delete(route);
};

export const updateTrack = async (
  payload: TCreateTrackBody & { id: string }
): Promise<void> => {
  const route = generatePath(REST_API_TRACKS.UPDATE.uri, {
    trackId: payload.id,
  });

  return await HttpService.patch(route, payload);
};
