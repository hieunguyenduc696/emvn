import { Router } from 'express';
import { createArtist, getArtist } from '../controllers';
const router = Router();

router.get('/', getArtist);
router.post('/', createArtist);

export { router as ArtistRouter };
