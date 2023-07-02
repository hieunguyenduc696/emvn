import { validate } from 'class-validator';
import { NextFunction } from 'express';
import { TCreateResponse, TypedRequest, TypedResponse, removeUndefinedKey } from '../common';
import { ErrorException, ErrorCode } from '../errors';
import { AlbumService } from '../services';
import { CreateAlbumDTO, GetAlbumDTO } from '../dto';
import { IAlbum } from '../schemas';
import { Types } from 'mongoose';

export const getAlbum = async (
  req: TypedRequest<never, never, { name: string; artistId: Types.ObjectId }>,
  res: TypedResponse<IAlbum[]>,
  next: NextFunction,
) => {
  const getAlbumQuery = new GetAlbumDTO(req.query);

  // verify input parameters
  const errors = await validate(getAlbumQuery);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  try {
    const getArtistResponse = await AlbumService.get(removeUndefinedKey(getAlbumQuery));

    res.status(200).json(getArtistResponse);
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const createAlbum = async (
  req: TypedRequest<never, CreateAlbumDTO, never>,
  res: TypedResponse<TCreateResponse>,
  next: NextFunction,
) => {
  const newAlbum = new CreateAlbumDTO(req.body);

  // verify input parameters
  const errors = await validate(newAlbum);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  // create album data
  try {
    const createAlbumResponse = await AlbumService.create(newAlbum);

    res.status(201).json({ id: createAlbumResponse.id });
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};
