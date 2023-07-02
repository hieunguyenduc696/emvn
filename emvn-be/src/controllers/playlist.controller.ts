import { validate } from 'class-validator';
import { NextFunction } from 'express';
import { TCreateResponse, TypedRequest, TypedResponse, removeUndefinedKey } from '../common';
import { ErrorException, ErrorCode } from '../errors';
import { PlaylistService } from '../services';
import { IPlaylist, Playlist } from '../schemas';
import { GetPlaylistDTO, CreatePlaylistDTO } from '../dto';

export const getPlaylist = async (
  req: TypedRequest<never, never, { name: string }>,
  res: TypedResponse<IPlaylist[]>,
  next: NextFunction,
) => {
  const getPlaylistQuery = new GetPlaylistDTO(req.query);

  // verify input parameters
  const errors = await validate(getPlaylistQuery);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  try {
    const getPlaylistResponse = await PlaylistService.get(removeUndefinedKey(getPlaylistQuery));

    res.status(200).json(getPlaylistResponse);
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const getOnePlaylist = async (
  req: TypedRequest<{ playlistId: string }, never, never>,
  res: TypedResponse<IPlaylist>,
  next: NextFunction,
) => {
  try {
    const getPlaylistResponse = await Playlist.findById(req.params.playlistId).populate({
      path: 'trackIds',
      populate: {
        path: 'albumId artistId',
      },
    });

    if (getPlaylistResponse) res.status(200).json(getPlaylistResponse);
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const createPlaylist = async (
  req: TypedRequest<never, CreatePlaylistDTO, never>,
  res: TypedResponse<TCreateResponse>,
  next: NextFunction,
) => {
  const newPlaylist = new CreatePlaylistDTO(req.body);

  // verify input parameters
  const errors = await validate(newPlaylist);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  // create Playlist data
  try {
    const createPlaylistResponse = await PlaylistService.create(newPlaylist);

    res.status(201).json({ id: createPlaylistResponse.id });
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const addTrackToPlaylist = async (
  req: TypedRequest<{ playlistId: string }, { trackId: string; type: 'remove' | 'add' }, never>,
  res: TypedResponse<TCreateResponse>,
  next: NextFunction,
) => {
  // update playlist track list
  try {
    await PlaylistService.update(req.params.playlistId, req.body.trackId, req.body.type);

    res.status(200).json();
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};
