import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { IAlbum } from '../schemas';
import { Types } from 'mongoose';

// Query for get track from database.
export type GetAlbumParams = Pick<IAlbum, 'name' | 'artistId'>;

// Validation model which comes to the API.
export class GetAlbumDTO implements GetAlbumParams {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  artistId: Types.ObjectId;

  public constructor(getAlbumDto: GetAlbumParams) {
    this.name = getAlbumDto.name;
    this.artistId = getAlbumDto.artistId;
  }
}
