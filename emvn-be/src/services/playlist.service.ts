import { IPlaylist, Playlist } from '../schemas';
import { CreatePlaylistDTO, GetPlaylistDTO } from '../dto';
import { TCreateResponse } from '../common';

const get = async (getPlaylistDto: GetPlaylistDTO): Promise<IPlaylist[]> => {
  return await Playlist.aggregate([
    {
      $lookup: {
        from: 'tracks',
        localField: 'trackIds',
        foreignField: '_id',
        as: 'trackIds',
      },
    },
    {
      $addFields: {
        isMatchPlaylist: {
          $regexMatch: {
            input: {
              $toUpper: '$name',
            },
            regex: {
              $toUpper: getPlaylistDto.name,
            },
          },
        },
      },
    },
    {
      $match: {
        isMatchPlaylist: true,
      },
    },
    {
      $project: {
        isMatchPlaylist: 0,
      },
    },
  ]);
};

const create = async (createPlaylistDto: CreatePlaylistDTO): Promise<TCreateResponse> => {
  const createdPlaylist = await Playlist.create(createPlaylistDto);

  return { id: createdPlaylist.id };
};

const update = async (playlistId: string, trackId: string, type: 'remove' | 'add'): Promise<void> => {
  if (type === 'add') {
    await Playlist.findByIdAndUpdate(playlistId, {
      $push: {
        trackIds: trackId,
      },
    });
  } else if (type === 'remove') {
    await Playlist.findByIdAndUpdate(playlistId, {
      $pull: {
        trackIds: trackId,
      },
    });
  }
};

export { get, create, update };
