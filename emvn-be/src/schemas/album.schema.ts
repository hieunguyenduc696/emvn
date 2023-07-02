import { Schema, model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IAlbum {
  name: string;
  artistId: Types.ObjectId;
}

// 2. Create a Schema corresponding to the document interface.
const albumSchema = new Schema<IAlbum>({
  name: { type: String, required: true },
  artistId: { type: Schema.Types.ObjectId, required: true, ref: 'Artist' },
});

// 3. Create a Model.
export const Album = model<IAlbum>('Album', albumSchema);
