import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';
import { IAlbum } from '../schemas';
import { Types } from 'mongoose';

// Model for creating album in database.
export type CreateAlbum = Pick<IAlbum, 'name' | 'artistId'>;

// Validation model which comes to the API.
export class CreateAlbumDTO implements CreateAlbum {
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  name: string;

  @IsMongoId()
  artistId: Types.ObjectId;

  public constructor(createAlbumDto: CreateAlbum) {
    this.name = createAlbumDto.name;
    this.artistId = createAlbumDto.artistId;
  }
}
