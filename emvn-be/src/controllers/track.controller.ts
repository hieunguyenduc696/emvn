import { validate } from 'class-validator';
import { NextFunction } from 'express';
import { TCreateResponse, TypedRequest, TypedResponse, removeUndefinedKey } from '../common';
import { UpdateTrackDTO, GetTrackDTO, CreateTrackDTO } from '../dto';
import { ErrorException, ErrorCode } from '../errors';
import { TrackService } from '../services';
import { ITrack } from '../schemas';

export const getTracks = async (
  req: TypedRequest<never, never, GetTrackDTO>,
  res: TypedResponse<ITrack[]>,
  next: NextFunction,
) => {
  const getTrackQuery = new GetTrackDTO(req.query);

  // verify input parameters
  const errors = await validate(getTrackQuery);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  try {
    const getTrackResponse = await TrackService.get(removeUndefinedKey(getTrackQuery));

    res.status(200).json(getTrackResponse);
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const getOneTrack = async (
  req: TypedRequest<{ trackId: string }, never, never>,
  res: TypedResponse<ITrack | null>,
  next: NextFunction,
) => {
  // get one track by id
  try {
    const track = await TrackService.getOne(req.params.trackId);

    res.status(200).json(track);
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const createTrack = async (
  req: TypedRequest<never, CreateTrackDTO, never>,
  res: TypedResponse<TCreateResponse>,
  next: NextFunction,
) => {
  const newTrack = new CreateTrackDTO(req.body);

  // verify input parameters
  const errors = await validate(newTrack);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  // create track data
  try {
    const createTrackResponse = await TrackService.create(newTrack);

    res.status(201).json({ id: createTrackResponse.id });
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const updateTrack = async (
  req: TypedRequest<{ trackId: string }, UpdateTrackDTO, never>,
  res: TypedResponse<void>,
  next: NextFunction,
) => {
  const updateTrack = new UpdateTrackDTO(req.body);

  // verify input parameters
  const errors = await validate(updateTrack);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  // update track data
  try {
    await TrackService.update(req.params.trackId, updateTrack);

    res.status(200).json();
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const deleteTrack = async (
  req: TypedRequest<{ trackId: string }, never, never>,
  res: TypedResponse<void>,
  next: NextFunction,
) => {
  // update track data
  try {
    await TrackService.deleteOne(req.params.trackId);

    res.status(200).json();
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};
