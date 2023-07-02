import { Artist, IArtist } from '../schemas';
import { CreateArtistDTO, GetArtistDTO } from '../dto';
import { TCreateResponse } from '../common';

const get = async (getArtistDto: GetArtistDTO): Promise<IArtist[]> => {
  return await Artist.aggregate([
    {
      $addFields: {
        isMatchArtist: {
          $regexMatch: {
            input: {
              $toUpper: '$name',
            },
            regex: {
              $toUpper: getArtistDto.name,
            },
          },
        },
      },
    },
    {
      $match: {
        isMatchArtist: true,
      },
    },
    {
      $project: {
        isMatchArtist: 0,
      },
    },
  ]);
};

const create = async (createArtistDto: CreateArtistDTO): Promise<TCreateResponse> => {
  const createdArtist = await Artist.create(createArtistDto);

  return { id: createdArtist.id };
};

export { create, get };
