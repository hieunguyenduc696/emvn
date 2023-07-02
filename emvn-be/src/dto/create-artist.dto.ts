import { IsString, MaxLength, MinLength } from 'class-validator';
import { IArtist } from '../schemas';

// Model for creating artist in database.
export type CreateArtist = Pick<IArtist, 'name'>;

// Validation model which comes to the API.
export class CreateArtistDTO implements CreateArtist {
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  name: string;

  public constructor(createArtistDto: CreateArtist) {
    this.name = createArtistDto.name;
  }
}
