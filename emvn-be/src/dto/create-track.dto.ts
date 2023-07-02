import { IsDate, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { ITrack } from '../schemas/track.schema';
import { Types } from 'mongoose';
import { EDateFormat, EGenre } from '../constant';
import moment from 'moment';

// Model for creating track in database.
export type CreateTrack = Pick<
  ITrack,
  'title' | 'coverImage' | 'artistId' | 'albumId' | 'genre' | 'releaseDate' | 'duration' | 'audio'
>;

// Validation model which comes to the API.
export class CreateTrackDTO implements CreateTrack {
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  title: string;

  @IsString()
  coverImage: string;

  @IsString()
  artistId: Types.ObjectId;

  @IsString()
  albumId: Types.ObjectId;

  @IsEnum(EGenre)
  genre: EGenre;

  @IsDate()
  releaseDate: Date;

  @IsString()
  duration: string;

  @IsString()
  audio: string;

  public constructor(createTrackDto: CreateTrack) {
    this.title = createTrackDto.title;
    this.coverImage = createTrackDto.coverImage;
    this.artistId = createTrackDto.artistId;
    this.albumId = createTrackDto.albumId;
    this.genre = createTrackDto.genre;
    this.duration = createTrackDto.duration;

    this.releaseDate = moment.utc(createTrackDto.releaseDate, EDateFormat.COMMON_DATE_FORMAT).toDate();
    this.audio = createTrackDto.audio;
  }
}
