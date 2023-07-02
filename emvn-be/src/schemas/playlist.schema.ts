import { Schema, Types, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IPlaylist {
  name: string;
  trackIds: Types.ObjectId[];
}

// 2. Create a Schema corresponding to the document interface.
const playlistSchema = new Schema<IPlaylist>({
  name: { type: String, required: true },
  trackIds: { type: [Schema.Types.ObjectId], required: true, default: [], ref: 'Track' },
});

// 3. Create a Model.
export const Playlist = model<IPlaylist>('Playlist', playlistSchema);
