import { IsString, IsEnum, IsOptional } from 'class-validator';
import { EGenre } from '../constant';
import { ITrack } from '../schemas';

// Query for get track from database.
export type GetTrackParams = Pick<ITrack, 'title' | 'genre'> & {
  artistName: string;
  albumName: string;
};

// Validation model which comes to the API.
export class GetTrackDTO implements GetTrackParams {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  artistName: string;

  @IsString()
  @IsOptional()
  albumName: string;

  @IsEnum(EGenre)
  @IsOptional()
  genre: EGenre;

  public constructor(getTrackDto: GetTrackParams) {
    this.title = getTrackDto.title;
    this.artistName = getTrackDto.artistName;
    this.albumName = getTrackDto.albumName;
    this.genre = getTrackDto.genre;
  }
}
