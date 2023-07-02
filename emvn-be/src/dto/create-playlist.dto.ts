import { IsString, MaxLength, MinLength } from 'class-validator';
import { IPlaylist } from '../schemas';

// Model for creating playlist in database.
export type CreatePlaylist = Pick<IPlaylist, 'name'>;

// Validation model which comes to the API.
export class CreatePlaylistDTO implements CreatePlaylist {
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  name: string;

  public constructor(createPlaylistDto: CreatePlaylist) {
    this.name = createPlaylistDto.name;
  }
}
