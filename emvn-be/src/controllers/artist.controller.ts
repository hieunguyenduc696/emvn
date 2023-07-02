import { validate } from 'class-validator';
import { NextFunction } from 'express';
import { TCreateResponse, TypedRequest, TypedResponse, removeUndefinedKey } from '../common';
import { ErrorException, ErrorCode } from '../errors';
import { ArtistService } from '../services';
import { CreateArtistDTO, GetArtistDTO } from '../dto';
import { IArtist } from '../schemas';

export const getArtist = async (
  req: TypedRequest<never, never, { name: string }>,
  res: TypedResponse<IArtist[]>,
  next: NextFunction,
) => {
  const getArtistQuery = new GetArtistDTO(req.query);

  // verify input parameters
  const errors = await validate(getArtistQuery);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  try {
    const getArtistResponse = await ArtistService.get(removeUndefinedKey(getArtistQuery));

    res.status(200).json(getArtistResponse);
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const createArtist = async (
  req: TypedRequest<never, CreateArtistDTO, never>,
  res: TypedResponse<TCreateResponse>,
  next: NextFunction,
) => {
  const newArtist = new CreateArtistDTO(req.body);

  // verify input parameters
  const errors = await validate(newArtist);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  // create artist data
  try {
    const createArtistResponse = await ArtistService.create(newArtist);

    res.status(201).json({ id: createArtistResponse.id });
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};
