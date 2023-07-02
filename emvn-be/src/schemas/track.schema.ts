import { Schema, Types, model } from 'mongoose';
import { EGenre } from '../constant';

// 1. Create an interface representing a document in MongoDB.
export interface ITrack {
  title: string;
  coverImage: string;
  artistId: Types.ObjectId;
  albumId: Types.ObjectId;
  genre: EGenre;
  releaseDate: Date;
  duration: string;
  audio: string;
}

// 2. Create a Schema corresponding to the document interface.
const trackSchema = new Schema<ITrack>({
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  artistId: { type: Schema.Types.ObjectId, required: true, ref: 'Artist' },
  albumId: { type: Schema.Types.ObjectId, required: true, ref: 'Album' },
  genre: { type: String, required: true, enum: EGenre },
  releaseDate: { type: Date, required: true },
  duration: { type: String, required: true },
  audio: { type: String, required: true },
});

// 3. Create a Model.
export const Track = model<ITrack>('Track', trackSchema);
