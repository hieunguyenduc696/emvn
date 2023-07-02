import { IsString, IsOptional } from 'class-validator';
import { IArtist } from '../schemas';

// Query for get track from database.
export type GetArtistParams = Pick<IArtist, 'name'>;

// Validation model which comes to the API.
export class GetArtistDTO implements GetArtistParams {
  @IsString()
  @IsOptional()
  name: string;

  public constructor(getArtistDto: GetArtistParams) {
    this.name = getArtistDto.name;
  }
}
