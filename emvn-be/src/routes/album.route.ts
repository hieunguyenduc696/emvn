import { Router } from 'express';
import { getAlbum, createAlbum } from '../controllers';
const router = Router();

router.get('/', getAlbum);
router.post('/', createAlbum);

export { router as AlbumRouter };
