import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IArtist {
  name: string;
}

// 2. Create a Schema corresponding to the document interface.
const artistSchema = new Schema<IArtist>({
  name: { type: String, required: true },
});

// 3. Create a Model.
export const Artist = model<IArtist>('Artist', artistSchema);
