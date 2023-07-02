import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { configuration } from './config';
import { errorHandler } from './errors';
import { UploadRouter, TrackRouter, ArtistRouter, PlaylistRouter, AlbumRouter } from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'upload')));

app.use('/upload', UploadRouter);
app.use('/track', TrackRouter);
app.use('/artist', ArtistRouter);
app.use('/playlist', PlaylistRouter);
app.use('/album', AlbumRouter);

app.use(errorHandler);

const client = new MongoClient(configuration.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function boostrap() {
  try {
    mongoose.connect(configuration.MONGO_URI).then(() => console.log('DB Connected'));
    app.listen(configuration.PORT, (): void => {
      console.log(`Connected successfully on port ${configuration.PORT}`);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
boostrap();
