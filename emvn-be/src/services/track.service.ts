import { ITrack, Track } from '../schemas';
import { UpdateTrackDTO, GetTrackDTO, CreateTrackDTO } from '../dto';
import { TCreateResponse } from '../common';

const get = async (getTrackDto: GetTrackDTO): Promise<ITrack[]> => {
  const tracks = await Track.aggregate([
    {
      $lookup: {
        from: 'artists',
        localField: 'artistId',
        foreignField: '_id',
        as: 'artistDetail',
      },
    },
    {
      $lookup: {
        from: 'albums',
        localField: 'albumId',
        foreignField: '_id',
        as: 'albumDetail',
      },
    },

    {
      $addFields: {
        artistDetail: {
          $arrayElemAt: ['$artistDetail', 0],
        },
        albumDetail: {
          $arrayElemAt: ['$albumDetail', 0],
        },
      },
    },
    {
      $addFields: {
        isMatchTitle: {
          $regexMatch: {
            input: {
              $toUpper: '$title',
            },
            regex: {
              $toUpper: getTrackDto.title,
            },
          },
        },
        isMatchArtist: {
          $regexMatch: {
            input: {
              $toUpper: '$artistDetail.name',
            },
            regex: {
              $toUpper: getTrackDto.artistName,
            },
          },
        },
        isMatchAlbum: {
          $regexMatch: {
            input: {
              $toUpper: '$albumDetail.name',
            },
            regex: {
              $toUpper: getTrackDto.albumName,
            },
          },
        },
      },
    },
    {
      $match: {
        isMatchTitle: true,
        isMatchArtist: true,
        isMatchAlbum: true,
        $expr: {
          $or: [
            !getTrackDto.genre,
            {
              $eq: ['$genre', getTrackDto.genre],
            },
          ],
        },
      },
    },
    {
      $project: {
        isMatchTitle: 0,
        isMatchArtist: 0,
        isMatchAlbum: 0,
      },
    },
  ]);

  return tracks;
};

const getOne = async (trackId: string): Promise<ITrack | null> => {
  const track = await Track.aggregate([
    {
      $lookup: {
        from: 'artists',
        localField: 'artistId',
        foreignField: '_id',
        as: 'artistDetail',
      },
    },
    {
      $lookup: {
        from: 'albums',
        localField: 'albumId',
        foreignField: '_id',
        as: 'albumDetail',
      },
    },

    {
      $addFields: {
        artistDetail: {
          $arrayElemAt: ['$artistDetail', 0],
        },
        albumDetail: {
          $arrayElemAt: ['$albumDetail', 0],
        },
      },
    },
    {
      $match: {
        $expr: {
          $eq: [
            {
              $toString: '$_id',
            },
            trackId.toString(),
          ],
        },
      },
    },
  ]);

  return track[0];
};

const create = async (createTrackDto: CreateTrackDTO): Promise<TCreateResponse> => {
  const createdTrack = await Track.create(createTrackDto);

  return { id: createdTrack.id };
};

const update = async (trackId: string, updateTrackDTO: UpdateTrackDTO): Promise<void> => {
  await Track.findByIdAndUpdate(trackId, updateTrackDTO);
};

const deleteOne = async (trackId: string): Promise<void> => {
  await Track.findByIdAndDelete(trackId);
};

export { get, create, update, deleteOne, getOne };
