import { Album, IAlbum } from '../schemas';
import { CreateAlbumDTO, GetAlbumDTO } from '../dto';
import { TCreateResponse } from '../common';

const get = async (getAlbumDto: GetAlbumDTO): Promise<IAlbum[]> => {
  return await Album.aggregate([
    {
      $addFields: {
        isMatchAlbum: {
          $regexMatch: {
            input: {
              $toUpper: '$name',
            },
            regex: {
              $toUpper: getAlbumDto.name,
            },
          },
        },
      },
    },
    {
      $match: {
        isMatchAlbum: true,
        $expr: {
          $eq: [
            {
              $toString: '$artistId',
            },
            getAlbumDto.artistId.toString(),
          ],
        },
      },
    },
    {
      $project: {
        isMatchAlbum: 0,
      },
    },
  ]);
};

const create = async (createAlbumDto: CreateAlbumDTO): Promise<TCreateResponse> => {
  const createdAlbum = await Album.create(createAlbumDto);

  return { id: createdAlbum.id };
};

export { get, create };
