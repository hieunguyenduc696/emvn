import { IsString, IsOptional } from 'class-validator';
import { IPlaylist } from '../schemas';

// Query for get track from database.
export type GetPlaylistParams = Pick<IPlaylist, 'name'>;

// Validation model which comes to the API.
export class GetPlaylistDTO implements GetPlaylistParams {
  @IsString()
  @IsOptional()
  name: string;

  public constructor(getPlaylistDto: GetPlaylistParams) {
    this.name = getPlaylistDto.name;
  }
}
