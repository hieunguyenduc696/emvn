import { IsDate, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ITrack } from '../schemas/track.schema';
import { Types } from 'mongoose';
import { EDateFormat, EGenre } from '../constant';
import moment from 'moment';
import { OptionalExceptFor } from '../common';

// Model for creating track in database.
export type UpdateTrack = OptionalExceptFor<
  ITrack,
  'title' | 'coverImage' | 'artistId' | 'albumId' | 'genre' | 'releaseDate' | 'duration' | 'audio'
>;

// Validation model which comes to the API.
export class UpdateTrackDTO implements UpdateTrack {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  title: string;

  @IsOptional()
  @IsString()
  coverImage: string;

  @IsOptional()
  @IsString()
  artistId: Types.ObjectId;

  @IsOptional()
  @IsString()
  albumId: Types.ObjectId;

  @IsOptional()
  @IsEnum(EGenre)
  genre: EGenre;

  @IsOptional()
  @IsDate()
  releaseDate: Date;

  @IsOptional()
  @IsString()
  duration: string;

  @IsOptional()
  @IsString()
  audio: string;

  public constructor(updateTrackDto: UpdateTrack) {
    this.title = updateTrackDto.title;
    this.coverImage = updateTrackDto.coverImage;
    this.artistId = updateTrackDto.artistId;
    this.albumId = updateTrackDto.albumId;
    this.genre = updateTrackDto.genre;
    this.duration = updateTrackDto.duration;

    const releaseDate = moment.utc(updateTrackDto.releaseDate, EDateFormat.COMMON_DATE_FORMAT);
    if (releaseDate.isValid()) this.releaseDate = releaseDate.toDate();

    this.audio = updateTrackDto.audio;
  }
}
